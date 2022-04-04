import express, { Request, Response, Router } from "express";

import { collections } from "../services/db.service";
import User, { IUser } from "../models/user";
import { encrypt, decrypt } from "../services/encrypt.service";
import {authWithJwt, generateToken} from "../services/auth.service";
import { IJwtData } from "../models/data";
import { sendMail } from "../services/mail.service";

export const userRouter: Router = express.Router();
userRouter.use(express.json());

// dev: get all users
userRouter.get('/', async (req: Request, res: Response) => {
  try {
    const users = (await collections.users?.find({}).toArray()) as unknown as User[];

    res.status(200).send(users);
  } catch (error) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    res.status(500).send(error?.message);
  }
})

// dev: get user by id
userRouter.get("/:username", async (req: Request, res: Response) => {
  const username = req?.params?.username;

  try {
    const query = { username: String(username) };
    const user = (await collections.users?.findOne(query)) as unknown as User;

    user
      ? res.status(200).send({
          ...user,
          password: decrypt(user.password)
        })
      : res.status(404).send(`User with username: ${username} not found`);
  } catch (error) {
    res.status(404).send(`Unable to find matching document with username: ${req.params.username}`);
  }
});

// insert new user
userRouter.post('/create', async (req: Request, res: Response) => {
  try {
    const newUser = req.body as IUser;
    const result = await collections.users?.insertOne({
      ...newUser,
      password: encrypt(newUser.password),
      _activated: false,
    });

    if (result) {
      const data: IJwtData = {
        username: newUser.username,
        _id: newUser._id,
        _activated: newUser._activated
      }
      const activeToken = generateToken(data);

      sendMail(newUser.email, `http://localhost:3000/api/auth/active/verify?token=${activeToken}`);
      res.status(201).send(`Successfully created a new user: ${newUser.username}`);
    } else res.status(500).send("Failed to create a new user.");

  } catch (error) {
    console.error(error);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    res.status(400).send(error.message);
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
    const result = await collections.users?.updateOne(query, { $set: updateUser });

    result
      ? res.status(200).send(`Successfully updated user with username ${username}`)
      : res.status(304).send(`User with username: ${username} not updated`);

  } catch (error) {
    console.error(error);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    res.status(400).send(error.message);
  }
})
