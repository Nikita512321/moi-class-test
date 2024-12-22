import { NextFunction, Response } from "express";
import apiError from "../exceptions/apiError.js";

const validateStatusMiddleware = (
  req: any,
  res: Response,
  next: NextFunction
) => {
  const { status } = req.query;

  if (status) {
    if (status !== "0" && status !== "1") {
      throw apiError.BadRequest("Invalid status format. Use 0 or 1");
    }
  }

  next();
};

export { validateStatusMiddleware };
