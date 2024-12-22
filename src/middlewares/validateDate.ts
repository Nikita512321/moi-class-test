import { NextFunction, Response } from "express";
import apiError from "../exceptions/apiError.js";

const validateDateMiddleware = (
  req: any,
  res: Response,
  next: NextFunction
) => {
  const { date } = req.query;

  if (date) {
    const dateRange = typeof date === "string" ? date.split(",") : [];
    const dateRegex =
      /((20)[0-9]{2}[-](0[13578]|1[02])[-](0[1-9]|[12][0-9]|3[01]))|((20)[0-9]{2}[-](0[469]|11)[-](0[1-9]|[12][0-9]|30))|((20)[0-9]{2}[-](02)[-](0[1-9]|1[0-9]|2[0-8]))|((((20)(04|08|[2468][048]|[13579][26]))|2000)[-](02)[-]29)/;

    const isValid =
      (dateRange.length === 1 && dateRegex.test(dateRange[0])) ||
      (dateRange.length === 2 &&
        dateRegex.test(dateRange[0]) &&
        dateRegex.test(dateRange[1]));

    if (isValid) {
      return next();
    } else {
      throw apiError.BadRequest(
        "Invalid date format. Use 'YYYY-MM-DD' or 'YYYY-MM-DD,YYYY-MM-DD'. Or check leap years"
      );
    }
  }

  next();
};

export { validateDateMiddleware };
