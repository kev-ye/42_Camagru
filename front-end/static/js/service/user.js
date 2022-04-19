import HttpClient from "../Common/HttpClient.js";

const http = new HttpClient();
const urlUser = '/api/users'

export async function userInfo() {
  const token = localStorage.getItem('__token__');
  if (!token)
    return {};

  const userInfo = await http.get(`${urlUser}/user`, {
    'authorization': `Bearer ${token}`
  });

  return userInfo ? userInfo : {};
}