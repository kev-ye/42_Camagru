import express, { Router } from "express"

export const authRouter: Router = express.Router();
authRouter.use(express.json());

