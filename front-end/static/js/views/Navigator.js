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
          <nav>
            <a href="/" class="nav__link" data-link>Gallery</a>
            <a href="/user" class="nav__link" data-link>User</a>
          </nav>
          `
        : `
          <nav>
            <a href="/" class="nav__link" data-link>Gallery</a>
            <a href="/sign_in" class="nav__link" data-link>Sign up</a>
            <a href="/sign_up" class="nav__link" data-link>Sign up</a>
          </nav>
          `
    });
  }
}