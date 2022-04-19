import AbstractView from "./AbstractView.js";
import { isLogin } from "../service/auth.js";
import { userInfo } from "../service/user.js";

export default class extends AbstractView {
  constructor() {
    super();

    this.setTitle("User");
  }

  async getHtml() {
    return await isLogin().then(async res => {
      if (res) {
        const user = await this.getUserInfo().then();
        return `
          <h1>User</h1>

          <hr>

          <ul>
            <li><b>Username: </b>${user.username}</li>
            <li><b>Email: </b>${user.email}</li>
          </ul>
        `;
      } else return '';
    });
  }

  async getUserInfo() {
    return await userInfo().then(res => {
      if (res) return res;
      else return {};
    });
  }
}