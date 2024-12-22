import { NextFunction, Response } from "express";

export default (fn: any) => (req: any, res: Response, next: NextFunction) =>
  fn(req, res, next).catch((e: any) => {

    // console.log("e.message.split('at')[0]", e.message.split("at")[0]);
    console.error(e);

    const status = e.status || 500;
    const message = e.message || "Internal Server Error";

    res.status(status).json({ message });
  });
