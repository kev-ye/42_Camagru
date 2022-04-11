import HttpClient from "../Common/HttpClient.js";

const http = new HttpClient();
const urlVerify = '/api/auth/verify'

export async function isLogin() {
  const token = localStorage.getItem('__token__');
  if (!token)
    return false;

  const checkLogin = await http.post(urlVerify, {}, {
    'authorization': `Bearer ${token}`
  });

  return checkLogin ? Object.values(checkLogin)[0] : false;
}