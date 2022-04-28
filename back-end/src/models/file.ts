import { ObjectId } from "mongodb";

export interface IFile {
	data: string,
	date: Date,
	id: string
}

export class File {
	constructor (
		public path: string,
		public user: string,
		public _date?: Date,
		public _id?: ObjectId 
	) {}
}