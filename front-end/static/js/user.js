import HttpClient from "./Common/HttpClient.js";

const http = new HttpClient();

document.addEventListener("click", e => {
  if (e.target && e.target.id === 'test') {
    const el = document.getElementById('app');
    const dialog = document.createElement('div');
    dialog.innerHTML = '<p>a new dialog</p>';
    dialog.id = 'dialog';
    el.appendChild(dialog);
    console.log('test:', el.innerHTML);
  }

  if (e.target && e.target.id === 'close') {
    const el = document.getElementById('app');
    el.removeChild(dialog);
  }
})