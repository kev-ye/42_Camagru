import { getAllImage } from "../service/file.js";
import AbstractView from "./AbstractView.js"

export default class extends AbstractView {
  constructor() {
    super();

    this.setTitle('Gallery');
  }

  async getHtml() {
    return `
      <h1>Gallery</h1>

      <hr>

      <ul id="gallery-collect">
    `;
  }

  async getAllCollect() {
    const res = await getAllImage().then(res => res);
    const fileArray = Array.from(res.files).sort((file1, file2) => {
      return file1.date < file2.data ? file1 : file2;
    });

    for (const file of fileArray) {
      this.createImage(file);
    }
  }

  createImage(file) {
    const collect = document.getElementById('gallery-collect');
    
    const newList = document.createElement('li');
    const newImage = document.createElement('img');

    newImage.id = file.id;
    newImage.src = file.data;

    collect.appendChild(newList);
    newList.appendChild(newImage);
  }
}