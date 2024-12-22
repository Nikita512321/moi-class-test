import { NextFunction, Response } from "express";
import apiError from "../exceptions/apiError.js";

const validatePageMiddleware = (
  req: any,
  res: Response,
  next: NextFunction
) => {
  const { page } = req.query;

  if (page) {
    const regExp = /^[1-9]\d*$/;
    if (!regExp.test(page)) {
      throw apiError.BadRequest("Invalid page format. Use 1 or 2 etc.");
    }
  }

  next();
};

export { validatePageMiddleware };
