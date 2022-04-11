import jwt from "jsonwebtoken"
import * as dotenv from "dotenv"

import { IJwtData } from "../models/data";
import User, { IUser } from "../models/user";
import { NextFunction, Request, Response } from "express";

dotenv.config();

// Jwt
export function generateToken(data: IJwtData) {
  return jwt.sign(data, String(process.env.JWT_SECRET) || "", {expiresIn: "24h"});
}

export function verifyToken(token: string) {
  return jwt.verify(token, String(process.env.JWT_SECRET) || "");
}

export function decodeToken(token: string) {
  return jwt.decode(token) as IJwtData;
}

export function jwtData(user: User | IUser) {
  return {
    username: user.username,
    _id: user._id,
    _activated: user._activated
  }
}

// Middle ware
export async function authWithJwt(req: Request, res: Response, next: NextFunction) {
  const token = String(req.headers.authorization).split(" ")[1] || String(req.query.token);
  try {
    verifyToken(token);
  } catch (e) {
    res.status(200).send({ "token": false })
    return ;
  }
  next();
}