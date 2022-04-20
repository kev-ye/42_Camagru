import AbstractView from "./AbstractView.js";
import { isLogin } from "../service/auth.js";
import { userInfo } from "../service/user.js";

export default class extends AbstractView {
  constructor() {
    super();

    this.setTitle("User");
    this.user = {};
  }

  async getHtml() {
    return await isLogin().then(async res => {
      if (res) {
        this.user = await this.getUserInfo();
        return `
          <h1>User</h1>

          <hr>

          <ul id="edit-control">
            <li id="username-edit">
              ${this.infoTemplate({
                info: "Username",
                content: this.user.username,
                id: "username-edit-btn"
              })}
            </li>
            <li id="email-edit">
              ${this.infoTemplate({
                info: "Email",
                content: this.user.email,
                id: "username-edit-btn"
              })}
            </li>
          </ul>

          <button id="password-edit">new password</button>
        `;
      } else return '';
    });
  }

  async globalEdit() {
    const editControl = document.getElementById('edit-control');

    editControl.addEventListener("click", e => {
      if (e.target) {
        switch (e.target.id) {
          // case 'username-edit-accepted':
          //   break ;
          default:
            break ;
        }
      }
    })
  }

  async usernameEdit() {
    const uEdit = document.getElementById('username-edit');
    const uEditBtn = document.getElementById('username-edit-btn');

    uEditBtn.onclick = () => {
      uEdit.innerHTML = this.editTemplate({
        info: "username",
        value: this.user.username,
        acceptBtnId: "username-accept-btn",
        cancelBtnId: "username-cancel-btn"
      })
    }
  }

  infoTemplate (info = {}) {
    return `<b>${info.info}: </b>${info.content}<span id="${info.id}" class="material-icons">edit</span>`;
  }

  editTemplate (edit = {}) {
    return `<b>${edit.info}: </b><input type="text" value="${edit.value}"><button id="${edit.acceptBtnId}">Valid</button id="${edit.cancelBtnId}"><button>Cancel</button>`;
  }

  async getUserInfo() {
    return await userInfo().then(res => {
      if (res) return res;
      else return {};
    });
  }
}