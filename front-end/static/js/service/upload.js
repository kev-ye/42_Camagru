import HttpClient from "../Common/HttpClient.js";

const http = new HttpClient();
const urlUser = '/api/upload';

export async function uploadImage(data) {
    const token = localStorage.getItem('__token__');
    if (!token)
        return undefined

    const res = await http.post(`${urlUser}`, { data: data }, {
        'authorization': `Bearer ${token}`
    }).then(data => data);

    return Object.entries(res).length === 0 ? undefined : res;
}
