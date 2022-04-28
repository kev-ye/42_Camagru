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

      <ul id="gallery-collect"><ul>
    `;
  }

  async getAllCollect() {
    const res = await getAllImage().then(res => res);

    console.log(res);
  }
}