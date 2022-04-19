import AbstractView from "./AbstractView.js";
import { isLogin } from "../service/auth.js";
import { userInfo } from "../service/user.js";

export default class extends AbstractView {
  constructor() {
    super();

    this.setTitle("User");
  }

  async getHtml() {
    return await isLogin().then(res => {
      if (res) {
        return `
          <h1>User</h1>
          <p>Just a text</p>
        `;
      } else return '';
    })
  }

  async getUserInfo() {
    return await userInfo().then(res => {
      if (res) return res;
      else return {};
    })
  }
}