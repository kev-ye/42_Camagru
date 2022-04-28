import express, { Router, Request, Response } from "express";
import { promises } from "fs";

import { authWithJwt, decodeToken } from "../services/auth.service";
import { createFolder, uploadFile } from "../services/file.service";

export const uploadRouter: Router = express.Router();
uploadRouter.use(express.json({ limit: '50mb' }));

uploadRouter.get("/", async (req: Request, res: Response) => {
	const mainDir = await promises.readdir("upload");

	console.log(mainDir);
	res.send({ "send": true });
});

uploadRouter.post("/upload", authWithJwt, async (req: Request, res: Response) => {
	const token = req.headers.authorization?.split(" ")[1];
	if (!token) {
		res.send({});
		return ;
	}

	const decode = decodeToken(String(token));

	await createFolder(decode.username).then();
	await uploadFile(req.body.data as string[], `upload/${decode.username}`, decode.username);

	res.send({ "uploaded": true });
});

uploadRouter.post("/:id", async (req: Request, res: Response) => {
    
})