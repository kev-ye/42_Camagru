import HttpClient from "../Common/HttpClient.js";

const http = new HttpClient();
const urlUser = '/api/users'

/* Views */

export async function userInfo() {
  const token = localStorage.getItem('__token__');
  if (!token)
    return {};

  const userInfo = await http.get(`${urlUser}/user`, {
    'authorization': `Bearer ${token}`
  }).then(data => data);

  return userInfo ? userInfo : {};
}

/* Modals */

export async function createNewUser(u, p, m) {
  const res = await http.post(`${urlUser}/create`, {
    "username": u,
    "password": p,
    "email": m
  }).then(data => data);

  return res ? res.created : '';
}