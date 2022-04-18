import express, { Router, Response, Request } from "express"

import { collections } from "../services/db.service";
import { generateToken, decodeToken, verifyToken } from "../services/auth.service";
import { sendMail } from "../services/mail.service";
import User from "../models/user";
import { decrypt } from "../services/encrypt.service";
import { ObjectId } from "mongodb";
import { authWithJwt, jwtData } from "../services/auth.service";
import { verify } from "crypto";
import { doesNotMatch } from "assert";

export const authRouter: Router = express.Router();
authRouter.use(express.json());

// JWT account auth
authRouter.post("/login", async (req: Request, res: Response) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.send({});
    return ;
  }

  const user = await collections.users?.findOne({ username: String(username) }) as unknown as User;
  if (!user || decrypt(user.password) !== String(password)) {
    res.send({});
    return ;
  }

  const token = generateToken(jwtData(user));
  res.send({ token });
});

authRouter.post("/verify", authWithJwt, async (req: Request, res: Response) => {
  const token = req.headers.authorization?.split(" ")[1];
  const decode = decodeToken(String(token));

  const user = await collections.users?.findOne({ _id: new ObjectId(decode._id) }) as unknown as User;
  user._activated
    ? res.send({ "activated": true })
    : res.send({ "activated": false })
})

// JWT account active
authRouter.post("/active", authWithJwt, async (req: Request, res: Response) => {
  const token = req.headers.authorization?.split(" ")[1];
  const decode = decodeToken(String(token));

  const user = await collections.users?.findOne({ username: String(decode.username) }) as unknown as User;
  if (!user) res.status(400).send({});
  else {
    const activeToken = generateToken(jwtData(user), 60 * 5);
  
    sendMail(user.email, `http://localhost:3000/api/auth/active/verify?token=${activeToken}`);
    res.send({ "token": true });
  }
})

authRouter.get("/active/verify", authWithJwt, async (req: Request, res: Response) => {
  const token = String(req.query.token);
  const decode = decodeToken(token);

  const user = await collections.users?.findOne({ username: String(decode.username) }) as unknown as User;
  user._activated = true;

  const result = await collections.users?.updateOne({ username: String(decode.username) }, { $set: user });
  result
    ? res.send({ "activated": true })
    : res.send({ "activated": false })
})