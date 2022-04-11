import express, { Router, Response, Request } from "express"

import { collections } from "../services/db.service";
import { generateToken, decodeToken } from "../services/auth.service";
import { sendMail } from "../services/mail.service";
import User from "../models/user";
import { decrypt } from "../services/encrypt.service";
import { ObjectId } from "mongodb";
import { authWithJwt, jwtData } from "../services/auth.service";

export const authRouter: Router = express.Router();
authRouter.use(express.json());

// JWT account auth
authRouter.post("/login", async (req: Request, res: Response) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(200).send({});
    return ;
  }

  const user = await collections.users?.findOne({ username: String(username) }) as unknown as User;
  if (!user || decrypt(user.password) !== String(password)) {
    res.status(200).send({});
    return ;
  }

  const token = generateToken(jwtData(user));
  res.status(200).send({ token });
});

authRouter.post("/verify", authWithJwt, async (req: Request, res: Response) => {
  const token = req.headers.authorization?.split(" ")[1];
  const decode = decodeToken(String(token));
  const user = await collections.users?.findOne({ _id: new ObjectId(decode._id) }) as unknown as User;
  user._activated
    ? res.status(200).send({ "activated": true })
    : res.status(200).send({ "activated": false })
})

// JWT account active
authRouter.post("/active", authWithJwt, async (req: Request, res: Response) => {
  const token = req.headers.authorization?.split(" ")[1];
  const decode = decodeToken(String(token));
  const user = await collections.users?.findOne({ _id: new ObjectId(decode._id) }) as unknown as User;
  if (!user) res.status(400).send({});
  else {
    const activeToken = generateToken(jwtData(user));
    sendMail(user.email, `http://localhost:3000/api/auth/active/verify?token=${activeToken}`);
    res.status(200).send({ "token": true });
  }
})

authRouter.get("/active/verify", authWithJwt,async (req: Request, res: Response) => {
  const token = String(req.query.token);
  const decode = decodeToken(token);
  const user = await collections.users?.findOne({ _id: new ObjectId(decode._id) }) as unknown as User;
  user._activated = true;
  const result = await collections.users?.updateOne({ _id: new ObjectId(decode._id) }, { $set: user });
  result
    ? res.status(200).send({ "activated": true })
    : res.status(200).send({ "activated": false })
})