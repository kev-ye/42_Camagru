import AbstractView from "./AbstractView.js";
import { isLogin } from "../service/auth.js";

export default class extends AbstractView {
  constructor() {
    super();

    this.setTitle("");
  };

  async getHtml() {
    return await isLogin().then((res) => {
      return res
        ? `
          <nav class="nav-container">
            <a href="/" data-link>Gallery</a>
            <a href="/user" data-link>User</a>
            <button id="user-exit">Exit</button>
          </nav>
          `
        : `
          <nav class="nav-container">
            <a href="/" data-link>Gallery</a>
            <button id="sign-in">Sign in</button>
            <button id="sign-up">Sign up</button>
          </nav>
          `
    });
  }
}