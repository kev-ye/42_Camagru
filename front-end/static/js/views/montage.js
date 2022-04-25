import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
  constructor() {
    super();

    this.setTitle('Montage');
  }

  async getHtml() {
    return `
      hello
    `;
  }

}