import { NextFunction, Response } from "express";
import apiError from "../exceptions/apiError.js";

const validateStudentsCountMiddleware = (
  req: any,
  res: Response,
  next: NextFunction
) => {
  const { studentsCount } = req.query;
  const regExp = /^\d+(,\d+)?$/;

  if (studentsCount) {
    if (!regExp.test(studentsCount)) {
      throw apiError.BadRequest("Invalid studentsCount format. Use 0 or 1,2");
    }
  }

  next();
};

export { validateStudentsCountMiddleware };
