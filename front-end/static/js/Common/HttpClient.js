export default class {
  constructor() {};

  async get (url) {
    const httpRequest = new XMLHttpRequest();

    console.log('GET url:', url);
    
    httpRequest.open('GET', url, true);
    httpRequest.send();

    httpRequest.onreadystatechange = () => {
      if (httpRequest.readyState === 4 && httpRequest.status === 200) {
        const json = httpRequest.responseText;
        console.log('result:', JSON.parse(json)[0]);
        return JSON.parse(json)[0];
      }
      return null;
    }
  };
}