import express, { Router, Request, Response } from "express";
import { promises} from "fs";
import { ObjectId } from "mongodb";

import { IFile, File, Comment } from "../models/file";

import { authWithJwt, decodeToken } from "../services/auth.service";
import { collections } from "../services/db.service";
import { createFolder, getAllFileContent, unlinkFile, uploadFile } from "../services/file.service";

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

uploadRouter.get("/:id", authWithJwt, async (req: Request, res: Response) => {
	const id = req.params.id;
	const token = req.headers.authorization?.split(" ")[1];
	if (!token || !id) {
		res.send({});
		return ;
	}
	const decode = decodeToken(token);

	try {
		const fileInfo = await collections.files?.findOne({ _id: new ObjectId(String(id)) }) as unknown as File;
		if (fileInfo.user === String(decode.username)) {
			const sendInfo = {
				"user": fileInfo.user,
				"id": fileInfo._id
			}
			res.send(sendInfo);
		}
		else res.send({});
	}
	catch(e) {
		res.send({});
	}
})

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

uploadRouter.put("/:id", authWithJwt, async (req: Request, res: Response) => {
	const id = req.params.id;
	const body = req.body;
	const token = req.headers.authorization?.split(" ")[1];
	if (!token || !id) {
		res.send({});
		return ;
	}
	const decode = decodeToken(token);

	console.log(id);

	try {
		let fileInfo = await collections.files?.findOne({ _id: new ObjectId(String(id)) }) as unknown as File;

		console.log('file:', fileInfo);

		if (String(Object.keys(body)[0]) === 'like') {
			fileInfo._social?.like.push(decode.username);
		}
		else if (String(Object.keys(body)[0]) === 'comment') {
			const comment: Comment = {
				user: decode.username || '',
				comment: String(Object.values(body)[0])
			};
			fileInfo._social?.comment.push(comment);
		}

		const newFIleInfo = { ...fileInfo };
		await collections.files?.updateOne({ _id: new ObjectId(String(id)) }, { $set: newFIleInfo });
		res.send({ "social": true });
	}
	catch(e) {
		console.log('error:', e);
		res.send({});
	}
});

uploadRouter.delete("/:id", authWithJwt, async (req: Request, res: Response) => {
	const id = req.params.id;
	const token = req.headers.authorization?.split(" ")[1];
	if (!token || !id) {
		res.send({});
		return ;
	}
	const decode = decodeToken(token);

	try {
		const fileInfo = await collections.files?.findOne({ _id: new ObjectId(String(id)) }) as unknown as File;
		
		if (String(fileInfo.user) === String(decode.username)) {
			await collections.files?.deleteOne({ _id: new ObjectId(String(id)) });
			await unlinkFile(`${fileInfo.path}/${fileInfo._id}`);
			res.send({ "delete": true });
		}
		else
			res.send({});
	}
	catch(e) {
		res.send({});
	}
});