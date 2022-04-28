import { ObjectId } from "mongodb";

export interface IFile {
	path: string,
	_date?: Date,
	_id?: ObjectId
}
  

export class File {
	constructor (
		public path: string,
		public _date?: Date,
		public _id?: ObjectId 
	) {}
}