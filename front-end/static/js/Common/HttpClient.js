export default class {
  constructor() {};

  async get (url) {
    console.log('here');
    return await fetch(url, {
      method: 'get'
    })
    .then(res => res.json())
    .then(data => data);
  }

  async post (url, body, header) {
    const newH = {
      ...header,
      "Content-Type": "application/json",
    };

    return await fetch(url, {
      method: 'post',
      body: JSON.stringify(body),
      headers: newH
    })
    .then(res => res.json())
    .then(data => data);
  }
}