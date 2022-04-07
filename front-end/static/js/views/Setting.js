import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
  constructor() {
    super();

    this.setTitle("Setting");
  }

  async getHtml() {
    return `
      <h1>Setting interface</h1>
      <p>Just a text</p>
    `;
  }
}