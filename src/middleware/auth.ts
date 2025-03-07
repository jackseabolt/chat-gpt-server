import { Request, Response, NextFunction } from "express";
import SessionModel from "../models/session";

export async function isAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    console.log("START", req.cookies);

    const cookie = req.cookies["session-token"];

    console.log("COOKIE", cookie);

    const session = await SessionModel.findOne({
      _id: cookie,
      isActive: true,
    });

    if (!session) {
      return res.status(401).json({ message: "Unauthenticated" });
    }

    return next();
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
