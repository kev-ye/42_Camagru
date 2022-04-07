import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
  constructor() {
    super();

    this.setTitle("User");
  }

  async getHtml() {
    return `
      <h1>User interface</h1>
      <p>Just a text</p>
    `;
  }
}