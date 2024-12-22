import { NextFunction, Response } from "express";
import catchAsync from "../utils/catchAsync.js";
import lessonsDbServices from "../services/db/lessonsDbServices.js";

export class ArchiveController {
  getLessonsByTeacnerIds = catchAsync(
    async (req: any, res: Response, next: NextFunction) => {
      const filters: any = req.query;

      if (req.query.teacherIds && typeof req.query.teacherIds === "string") {
        filters.teacherIds = req.query.teacherIds.split(",");
      } else {
        filters.teacherIds = [];
      }

      console.log(filters);

      const result = await lessonsDbServices.getLessonsByTeacherIds(req.query);

      res.status(200).json(result);
    }
  );
}

export default new ArchiveController();
