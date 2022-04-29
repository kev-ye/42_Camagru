import express, { Router, Request, Response } from "express";
import { promises} from "fs";

import { IFile } from "../models/file";

import { authWithJwt, decodeToken } from "../services/auth.service";
import { createFolder, getAllFileContent, uploadFile } from "../services/file.service";

export const uploadRouter: Router = express.Router();
uploadRouter.use(express.json({ limit: '50mb' }));

uploadRouter.get("/", async (req: Request, res: Response) => {
	try {
		const mainDir = await promises.readdir("upload");
		let data: IFile[] = [];

		for (const dir of mainDir) {
			await getAllFileContent(`upload/${dir}`, data);
		}

		res.send({ "files": data });
	}
	catch(e) {
		res.send({ "files": [] });
	}
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