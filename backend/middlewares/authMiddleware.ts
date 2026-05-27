import type { NextFunction, Request, Response } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const str = req.headers.authorization;
  if (!str || !str.startsWith("Bearer")) {
    res.status(403).json({ msg: "Incorrect header" });
  } else {
    const token = str.split(" ")[1];
    if (!token) {
      res.status(401).json({ msg: "No auth token in header" });
    } else {
      try {
        const secret = process.env.JWT_SECRET || "ok";
        const payload = jwt.verify(token, secret) as string
        if (payload) {
            req.authId=payload;
            next()
        }else{
          console.log(payload)
        }
      } catch (error) {
        res.status(401).json({ msg: "Incorrect auth token" });
      }
    }
  }
}
