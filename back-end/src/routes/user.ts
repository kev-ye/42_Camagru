import express, { Request, Response, Router } from "express";

import { collections } from "../services/db.service";
import User, { IUser } from "../models/user";
import { encrypt, decrypt } from "../services/encrypt.service";
import { authWithJwt, generateToken, jwtData } from "../services/auth.service";
import { sendMail } from "../services/mail.service";

export const userRouter: Router = express.Router();
userRouter.use(express.json());

// dev: get all users
userRouter.get('/', async (req: Request, res: Response) => {
  try {
    const users = (await collections.users?.find({}).toArray()) as unknown as User[];

    res.send(users);
  } catch (error) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    res.send(error?.message);
  }
})

// dev: get user by id
userRouter.get("/:username", async (req: Request, res: Response) => {
  const username = req?.params?.username;

  try {
    const query = { username: String(username) };
    const user = (await collections.users?.findOne(query)) as unknown as User;

    user
      ? res.send({
          ...user,
          password: decrypt(user.password)
        })
      : res.send(`User with username: ${username} not found`);
  } catch (error) {
    res.send(`Unable to find matching document with username: ${req.params.username}`);
  }
});

// insert new user
userRouter.post('/create', async (req: Request, res: Response) => {
  try {
    const newUser = req.body as IUser;
    const user = await collections.users?.findOne({ username: String(newUser.username) }) as unknown as User;
    if (user) {
      res.send({ "create": false })
      return ;
    }
    const result = await collections.users?.insertOne({
      ...newUser,
      password: encrypt(newUser.password),
      _activated: false,
    });

    if (result) {
      const activeToken = generateToken(jwtData(newUser), 60 * 5);

      // sendMail(newUser.email, `http://localhost:3000/api/auth/active/verify?token=${activeToken}`);
      res.send({ "created": true });
    } else res.send({ "created": false });

  } catch (error) {
    console.error(error);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    res.send({ "created": false });
  }
})

// update user
userRouter.put('/update/:username', authWithJwt, async (req: Request, res: Response) => {
  const username = req?.params?.username;

  try {
    const user = req.body as IUser;
    const updateUser = {
      ...user,
      password: encrypt(user.password)
    }
    const query = { username: String(username) };
    const ifUser = await collections.users?.findOne(query) as unknown as User;

    if (ifUser) {
      await collections.users?.updateOne(query, { $set: updateUser });
      res.send({ "updated": true });
    } else res.send({ "updated": false });

  } catch (error) {
    console.error(error);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    res.send({ "updated": false });
  }
})
