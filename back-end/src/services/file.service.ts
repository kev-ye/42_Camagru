import { promises } from "fs";

import { collections } from "./db.service";

export async function createFolder(dirpath: string) {
  await promises.mkdir("upload", { recursive: true }).then();
  await promises.mkdir(`upload/${dirpath}`, { recursive: true }).then();
}
export async function uploadFile(files: string[], path: string, user: string) {
  files.forEach(async file => {
    const addFile = await collections.files?.insertOne({
      path: path,
      user: user,
      _date: new Date()
    });

    await promises.writeFile(`${path}/${addFile?.insertedId.toJSON()}`, file);
  });
}