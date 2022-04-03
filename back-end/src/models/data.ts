import { ObjectId } from "mongodb";

export interface IJwtData {
  username: string,
  id: ObjectId
}