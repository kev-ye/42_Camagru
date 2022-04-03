import express, { Router, Response, Request } from "express"

import { collections } from "../services/db.service";
import { generateToken, verifyToken } from "../services/auth.service";
import { IJwtData } from "../models/data";

export const authRouter: Router = express.Router();
authRouter.use(express.json());

// JWT account auth
authRouter.post("/auth/login", async (req: Request, res: Response) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(400).send({});
    return ;
  }

  const user = await collections.users?.findOne({ username });
  if (!user || user.password !== password) {
    res.status(400).send({});
    return ;
  }
  if (!user.verified) {
    res.status(400).send({ "activated": false });
    return ;
  }

  const data: IJwtData = {
    username: user.username,
    id: user._id
  }
  const token = generateToken(data);
  res.status(200).send({ token });
});

authRouter.post("/auth/verify", async (req: Request, res: Response) => {
  const { token } = req.body;
  if (!token) {
    res.status(400).send({ "token": false });
    return ;
  }

  const verify = verifyToken(String(token));
  verify
    ? res.status(200).send({ "token": true })
    : res.status(400).send({ "token": false });
})

// JWT account active

