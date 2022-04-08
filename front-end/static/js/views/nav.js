import AbstractView from "./AbstractView";

export default class extends AbstractView {
  constructor() {
    super();

    this.setTitle("");
  };

  async getHtml() {
    return `
      <nav>
      </nav>
    `;
  }

}