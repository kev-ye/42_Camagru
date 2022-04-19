import HttpClient from "../Common/HttpClient.js";

const http = new HttpClient();
const urlAuth = '/api/auth';

/* Views */

export async function isLogin() {
  const token = localStorage.getItem('__token__');
  if (!token)
    return false;
  
  const checkLogin = await http.post(`${urlAuth}/verify`, {}, {
    'authorization': `Bearer ${token}`
  }).then(data => data);

  return checkLogin ? Object.values(checkLogin)[0] : false;
}

export async function resetPassword(token, p) {
  const res = await http.put(`${urlAuth}/reset/change?token=${token}`, {
    "password": p
  }).then(data => data);

  return res ? Object.values(res)[0] : false;
}

/* Modals */

export async function sendResetPassword(u) {
  const res = await http.post(`${urlAuth}/reset/send`, { "username": u })
    .then(data => data);

  return res ? Object.values(res)[0] : false;
}

export async function userSignIn(u, p) {
  const res = await http.post(`${urlAuth}/login`, {
    "username": u,
    "password": p
  }).then(data => data);

  return res ? res.token : '';
}