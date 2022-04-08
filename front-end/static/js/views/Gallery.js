import AbstractView from "./AbstractView.js"

export default class extends AbstractView {
  constructor() {
    super();

    this.setTitle('Gallery');
  }

  async getHtml() {
    return `
      <h1>Welcome to Camagru gallery</h1>
      <p>this is a text</p>
      <button id="test">test</button>
    `;
  }
}