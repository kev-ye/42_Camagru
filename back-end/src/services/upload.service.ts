import { promises } from "fs";

import { IFile } from "../models/file";
import { collections } from "./db.service";

export async function createFolder(dirpath: string) {
  await promises.mkdir("upload", { recursive: true }).then();
  await promises.mkdir(`upload/${dirpath}`, { recursive: true }).then();
}
export async function uploadFile(files: IFile[], path: string) {
  // files.forEach(async file => {
  //   // const addFile = await collections.files?.insertOne({
  //   //   path: path,
  //   //   _date: new Date()
  //   // });

  //   console.log('test');
  //   // await promises.writeFile(`${addFile?.path}/${addFile?._id}`, '');
  // });
  // [1, 2 ,3].forEach(number => console.log(number));
  // console.log('test:', files.length);
}