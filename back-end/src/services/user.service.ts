import { collections } from "./db.service";

// Requirements
export async function requireUniqueUserName(userName: string): Promise<boolean> {
  return await uniqueUserName(userName) && requireUserName(userName);
}

export async function uniqueUserName(userName: string): Promise<boolean> {
  const query = { username: userName };
  const user = await collections.users?.findOne(query);

  return !user;
}

export function requireUserName(userName: string): boolean {
  const require = /[A-E]/gi;
  const match = userName.match(require)?.join("");

  console.log(`${userName} === ${match} ?`);
  return userName === match;
}
