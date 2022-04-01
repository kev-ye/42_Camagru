import { ObjectId } from "mongodb";
import { IEncryption } from "../services/encrypt.service";

export interface IUser {
  username: string,
  password: string,
  email: string,
  id?: ObjectId
}

export default class User {
  constructor(
    public username: string,
    public password: IEncryption,
    public email: string,
    public id?: ObjectId
  ) {}
}