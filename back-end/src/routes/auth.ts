import express, { Router, Response, Request } from "express"

import { collections } from "../services/db.service";
import { generateToken, verifyToken, decodeToken } from "../services/auth.service";
import { IJwtData } from "../models/data";
import { sendMail } from "../services/mail.service";
import User from "../models/user";
import {decrypt} from "../services/encrypt.service";
import {ObjectId} from "mongodb";

export const authRouter: Router = express.Router();
authRouter.use(express.json());

// JWT account auth
authRouter.post("/login", async (req: Request, res: Response) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(400).send({});
    return ;
  }

  const user = await collections.users?.findOne({ username }) as unknown as User;
  if (!user || decrypt(user.password) !== String(password)) {
    res.status(400).send({});
    return ;
  }

  const data: IJwtData = {
    username: user.username,
    _id: user._id,
    _activated: user._activated
  }
  const token = generateToken(data);
  res.status(200).send({ token });
});

authRouter.post("/verify", async (req: Request, res: Response) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    res.status(400).send({ "token": false });
    return ;
  }

  try {
    const verify = verifyToken(String(token));
    if (typeof verify === 'string') {
      res.status(400).send({ "token": false });
      return ;
    }
  } catch (e) {
    console.error(e);
    res.status(400).send({ "token": false });
    return ;
  }

  const decode = decodeToken(String(token));
  decode._activated
    ? res.status(200).send({ "activated": true })
    : res.status(400).send({ "activated": false })
})

// JWT account active
authRouter.post("/active", async (req: Request, res: Response) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    res.status(400).send({ "token": false });
    return ;
  }

  try {
    const verify = verifyToken(String(token));
    if (typeof verify === 'string') {
      res.status(400).send({ "token": false });
      return ;
    }
  } catch (e) {
    console.error(e);
    res.status(400).send({ "token": false });
    return ;
  }

  const decode = decodeToken(String(token));

  console.log('decode', decode);
  const user = await collections.users?.findOne({ _id: new ObjectId(decode._id) }) as unknown as User;
  if (!user) res.status(400).send({});
  else {
    const data: IJwtData = {
      username: user.username,
      _id: user._id,
      _activated: user._activated
    }
    const activeToken = generateToken(data);
    sendMail(user.email, `http://localhost:3000/api/auth/active/verify?token=${activeToken}`);
    res.status(200).send({ "token": true });
  }
})

authRouter.get("/active/verify", async (req: Request, res: Response) => {
  const token = req.query.token;
  try {
    const verify = verifyToken(String(token));
    if (typeof verify === 'string') {
      res.status(400).send({ "token": false });
      return ;
    }
  } catch (e) {
    console.error(e);
    res.status(400).send({ "token": false });
    return ;
  }

  const decode = decodeToken(String(token));
  const user = await collections.users?.findOne({ _id: new ObjectId(decode._id) }) as unknown as User;
  user._activated = true;
  const result = await collections.users?.updateOne({ _id: new ObjectId(decode._id) }, { $set: user });
  result
    ? res.status(200).send({ "active": true })
    : res.status(400).send({ "active": false })
})