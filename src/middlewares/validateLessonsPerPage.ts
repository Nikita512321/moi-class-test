import { NextFunction, Response } from "express";
import apiError from "../exceptions/apiError.js";

const validateLessonsPerPageMiddleware = (
  req: any,
  res: Response,
  next: NextFunction
) => {
  const { lessonsPerPage } = req.query;

  if (lessonsPerPage) {
    const regExp = /^[1-9]\d*$/;
    if (!regExp.test(lessonsPerPage)) {
      throw apiError.BadRequest(
        "Invalid lessonsPerPage format. Use 1 or 2 etc."
      );
    }
  }

  next();
};

export { validateLessonsPerPageMiddleware };
