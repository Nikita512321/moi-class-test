exports.up = function(knex) {
    return knex.schema
      .raw('CREATE INDEX idx_lessons_date_status ON lessons (date, status)')
      .raw('CREATE INDEX idx_lesson_teachers_lesson_id_teacher_id ON lesson_teachers (lesson_id, teacher_id)')
      .raw('CREATE INDEX idx_lesson_students_lesson_id_student_id_visit ON lesson_students (lesson_id, student_id, visit)');
  };
  
  exports.down = function(knex) {
    return knex.schema
      .raw('DROP INDEX IF EXISTS idx_lessons_date_status')
      .raw('DROP INDEX IF EXISTS idx_lesson_teachers_lesson_id_teacher_id')
      .raw('DROP INDEX IF EXISTS idx_lesson_students_lesson_id_student_id_visit');
  };
  