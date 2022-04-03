import jwt from "jsonwebtoken"
import * as dotenv from "dotenv"

import { IJwtData } from "../models/data";

dotenv.config();

export function generateToken(data: IJwtData) {
  return jwt.sign(data, String(process.env.JWT_SECRET) || "", {expiresIn: "24h"});
}

export function verifyToken(token: string) {
  return jwt.verify(token, String(process.env.JWT_SECRET) || "");
}