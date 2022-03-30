// External Dependencies
import express, { Request, Response, Router } from "express";
import { ObjectId } from "mongodb";
import { collections } from "../services/db.service";
import User from "../models/user";

// Global Config
export const userRouter: Router = express.Router();
userRouter.use(express.json());

// GET
userRouter.get('/', async (req: Request, res: Response) => {
  try {
    const users = (await collections.users?.find({}).toArray()) as unknown as User[];

    res.status(200).send(users);
  } catch (error) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    res.status(500).send(error.message);
  }
})

userRouter.get("/:id", async (req: Request, res: Response) => {
  const id = req?.params?.id;

  try {
      const query = { _id: new ObjectId(id) };
      const user = (await collections.users?.findOne(query)) as unknown as User;

      if (user) {
          res.status(200).send(user);
      }
  } catch (error) {
      res.status(404).send(`Unable to find matching document with id: ${req.params.id}`);
  }
});

// POST
userRouter.post('/', async (req: Request, res: Response) => {
  try {
    const newUser = req.body as User;
    const result = await collections.users?.insertOne(newUser);

    result
      ? res.status(201).send(`Successfully created a new game with id ${result.insertedId}`)
      : res.status(500).send("Failed to add a new user.")

  } catch (error) {
    console.error(error);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    res.status(400).send(error.message);
  }
})

// PUT
userRouter.put('/:id', async (req: Request, res: Response) => {
  const id = req?.params?.id;

  try {
    const updateUser: User = req.body as User;
    const query = {_id: new ObjectId(id)};

    const result = await collections.users?.updateOne(query, { $set: updateUser });

    result
      ? res.status(200).send(`Successfully updated user with id ${id}`)
      : res.status(304).send(`User with id: ${id} not updated`);

  } catch (error) {
    console.error(error);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    res.status(400).send(error.message);
  }
})

// DELETE
userRouter.delete("/:id", async (req: Request, res: Response) => {
  const id = req?.params?.id;

  try {
    const query = { _id: new ObjectId(id) };
    const result = await collections.users?.deleteOne(query);

    if (result && result.deletedCount) {
        res.status(202).send(`Successfully removed user with id ${id}`);
    } else if (!result) {
        res.status(400).send(`Failed to remove user with id ${id}`);
    } else if (!result.deletedCount) {
        res.status(404).send(`User with id ${id} does not exist`);
    }
  } catch (error) {
    console.error(error);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    res.status(400).send(error.message);
  }
});