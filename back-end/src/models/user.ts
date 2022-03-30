import { ObjectId } from "mongodb";

export default class User {
  constructor(
    public username: string,
    public password: string,
    public email: string,
    public id?: ObjectId
  ) {}
}