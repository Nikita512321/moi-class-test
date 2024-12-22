import { NextFunction, Response } from "express";
import apiError from "../exceptions/apiError.js";

const validateTeacherIdsMiddleware = (
  req: any,
  res: Response,
  next: NextFunction
) => {
  const { teacherIds } = req.query;
  const regExp = /^(?:[1-9]\d*)(?:,(?:[1-9]\d*))*$/;

  if (teacherIds) {
    if (!regExp.test(teacherIds)) {
      throw apiError.BadRequest("Invalid teacherIds format. Use 1 or 21,2,32");
    }
  }

  next();
};

export { validateTeacherIdsMiddleware };
