import express, { Router, Request, Response } from "express";
import { IFile } from "../models/file";

import { authWithJwt, decodeToken } from "../services/auth.service";
import { createFolder, uploadFile } from "../services/upload.service";

export const uploadRouter: Router = express.Router();
uploadRouter.use(express.json({ limit: '50mb' }));

uploadRouter.post("/", authWithJwt, async (req: Request, res: Response) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
        res.send({});
        return ;
    }

    const decode = decodeToken(String(token));

    await createFolder(decode.username).then();
    await uploadFile(req.body.data as IFile[], `upload/${decode.username}`);

    res.send({ "uploaded": true });
});