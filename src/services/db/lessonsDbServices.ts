import { DbServiceBase } from "./dbServiceBase/dbServiceBase.js";

interface LessonFilters {
  date?: string;
  status?: string;
  teacherIds?: number[];
  studentsCount?: string;
  page?: number;
  lessonsPerPage?: number;
}

export class LessonsDbService extends DbServiceBase {
  constructor() {
    super();
  }

  async getLessonsByTeacherIds(filters: LessonFilters) {
    const {
      date,
      status,
      teacherIds,
      studentsCount,
      page = 1,
      lessonsPerPage = 5,
    } = filters;

    const query = this.Knex("lessons as l")
      .select(
        "l.id as id",
        this.Knex.raw("to_char(l.date, 'YYYY-MM-DD') as date"),
        "l.title",
        "l.status",
        this.Knex.raw(
          "CAST(COUNT(DISTINCT CASE WHEN ls.visit = true THEN ls.student_id END) AS INTEGER) AS visitCount"
        ),
        this.Knex.raw(
          "jsonb_agg(distinct jsonb_build_object('id', t.id, 'name', t.name)) FILTER (WHERE t.id IS NOT NULL) as teachers"
        ),
        this.Knex.raw(
          "json_agg(distinct jsonb_build_object('student_id', ls.student_id, 'visit', ls.visit, 'student_name', s.name)) FILTER (WHERE ls.student_id IS NOT NULL) AS students"
        )
      )
      .leftJoin("lesson_teachers as lt", "lt.lesson_id", "l.id")
      .leftJoin("lesson_students as ls", "l.id", "ls.lesson_id")
      .leftJoin("teachers as t", "lt.teacher_id", "t.id")
      .leftJoin("students as s", "ls.student_id", "s.id");

    if (teacherIds && teacherIds.length > 0) {
      query.whereIn("l.id", function () {
        this.select("lt.lesson_id")
          .from("lesson_teachers as lt")
          .whereIn("lt.teacher_id", teacherIds);
      });
    }

    // Apply date filter if provided
    if (date) {
      const [startDate, endDate] = date.split(",");
      if (endDate) {
        query.whereBetween("l.date", [startDate, endDate]);
      } else {
        query.where("l.date", startDate);
      }
    }

    // Apply status filter if provided
    if (status !== undefined) {
      query.where("l.status", status);
    }

    // Apply studentsCount filter if provided
    if (studentsCount) {
      if (studentsCount.includes(",")) {
        // Handle range
        const [minCount, maxCount] = studentsCount.split(",").map(Number);
        query.havingRaw("COUNT(DISTINCT ls.student_id) BETWEEN ? AND ?", [
          minCount,
          maxCount,
        ]);
      } else {
        // Handle exact count
        query.havingRaw("COUNT(DISTINCT ls.student_id) = ?", [
          Number(studentsCount),
        ]);
      }
    }

    query.groupBy("l.id", "l.date", "l.title", "l.status");

    // Pagination
    const offset = (page - 1) * lessonsPerPage;
    query.limit(lessonsPerPage).offset(offset);

    // Execute the query
    const lessonsWithDetails = await query;

    return lessonsWithDetails;
  }
}

export default new LessonsDbService();
