import AbstractView from "./AbstractView.js";
import { haveAccess } from "../service/auth.js";
import { userInfo, updateUser } from "../service/user.js";

export default class extends AbstractView {
  constructor() {
    super();

    this.setTitle("User");
  }

  async getHtml() {
    return await haveAccess().then(async res => {
      if (res) {
        return await userInfo().then(res => {
          if (res) {
            return `
              <h1>User</h1>

              <hr>
    
              <ul id="edit-control">
                <li id="username-edit">
                  ${this.originalTemplate({
                    info: "Username",
                    content: res.username,
                    id: "username-edit-btn"
                  })}
                </li>
                <li id="email-edit">
                  ${this.originalTemplate({
                    info: "Email",
                    content: res.email,
                    id: "email-edit-btn"
                  })}
                </li>
                <li id="password-edit">
                  <button id="password-edit-btn">Change password</button>
                </li>
              </ul>

              <label class="user-notify-switch">
                <input type="checkbox" id="user-notify-input" class="user-notify-input">
                <span class="user-notify-slider user-notify-round"></span>
              </label>
            `;
          }
          else return '';
        });
      } else return '';
    });
  }

/* notify */
  async notify() {
    const userNotify = document.getElementById('user-notify-input');
    const user = await userInfo().then(data => data);

    userNotify.checked = user && user.notify === true ? 'checked' : '';

    userNotify.onclick = async () => {
      const user = await userInfo().then(data => data);
      await updateUser(
        undefined,
        undefined,
        undefined,
        undefined,
        user.notify === true ? false : true
      ).then(res => {
        if (res) alert(`Notify ${user.notify === true ? 'close' : 'open'}!`);
        else alert('Something wrong');
      });
    }
  }

/* click event control */

  async globalUserInfoEditControl() {
    const editControl = document.getElementById('edit-control');

    editControl.addEventListener("click", async e => {
      if (e.target) {
        switch (e.target.id) {
          case 'username-accept-btn':
            await this.accept('username').then();
            break ;
          case 'email-accept-btn':
            await this.accept('email').then();
            break ;
          case 'password-accept-btn':
            await this.accept('password').then();
            break ;
          case 'username-cancel-btn':
            await this.cancel('username').then();
            break ;
          case 'email-cancel-btn':
            await this.cancel('email').then();
            break ;
          case 'password-cancel-btn':
            await this.cancel('password').then();
            break ;
          default:
            break ;
        }
      }
    })
  }

  async userInfoEdit() {
    const uEdit = document.getElementById('username-edit');
    const uEditBtn = document.getElementById('username-edit-btn');

    if (uEditBtn) {
      uEditBtn.onclick = async () => {
        uEdit.innerHTML = this.editTemplate({
          info: "Username",
          inputId: "username-input",
          value: await userInfo().then(res => res.username),
          acceptBtnId: "username-accept-btn",
          cancelBtnId: "username-cancel-btn"
        })
      }
    }

    const mEdit = document.getElementById('email-edit');
    const mEditBtn = document.getElementById('email-edit-btn');

    if (mEditBtn) {
      mEditBtn.onclick = async () => {
        mEdit.innerHTML = this.editTemplate({
          info: "Email",
          inputId: "email-input",
          value: await userInfo().then(res => res.email),
          acceptBtnId: "email-accept-btn",
          cancelBtnId: "email-cancel-btn"
        })
      }
    }

    const pEdit = document.getElementById('password-edit');
    const pEditBtn = document.getElementById('password-edit-btn');
    if (pEditBtn) {
      pEditBtn.onclick = () => {
        pEdit.innerHTML = this.pswEditTemplate();
      }
    }
  }

/* accept & cancel request */

  async accept(info = '') {
    if (['username', 'email'].find(el => el === info)) {
      const value = document.getElementById(`${info}-input`).value;

      await updateUser(
        info === 'username'? value : undefined,
        undefined,
        undefined,
        info === 'username'? undefined : value,
        undefined).then(async res => {
          if (!res) alert('Username already exist!');
          else {
            alert(`${info} updated!`);
            localStorage.setItem('__token__', res.token);
            await this.cancel(info);
          }
        });
    }
    else {
      const oldValue = document.getElementById('old-password-input').value;
      const newValue = document.getElementById('new-password-input').value;

      await updateUser(
        undefined,
        newValue,
        oldValue,
        undefined,
        undefined).then(async res => {
          if (!res) alert('Old password wrong!');
          else {
            alert(`${info} updated!`);
            await this.cancel(info);
          }
        });
    }
  }

  async cancel(info = '') {
    if (['username', 'email'].find(el => el === info)) {
      const infoEdit = document.getElementById(`${info}-edit`);
      infoEdit.innerHTML = this.originalTemplate({
        info: info === 'username' ? "Username" : "Email",
        content: await userInfo().then(u => info === 'username' ? u.username : u.email),
        id: `${info}-edit-btn`
      });
    }
    else {
      const infoEdit = document.getElementById('password-edit');
      infoEdit.innerHTML = this.pswOriginalTemplate();
    }
    await this.userInfoEdit();
  }

/* utils template */

  originalTemplate (info = {}) {
    return `<b>${info.info}: </b>${info.content}<span id="${info.id}" class="material-icons">edit</span>`;
  }

  editTemplate (edit = {}) {
    return `<b>${edit.info}: </b><input id="${edit.inputId}" type="text" value="${edit.value}"><button id="${edit.acceptBtnId}">Update</button><button id="${edit.cancelBtnId}">Cancel</button>`;
  }

  pswOriginalTemplate () {
    return '<button id="password-edit-btn">Change password</button>';
  }

  pswEditTemplate () {
    return `  
      <div>
        <b>Old password: </b><input id="old-password-input" type="password" placeholder="Enter your old password">
      </div>
      <div>
        <b>New password: </b><input id="new-password-input" type="password" placeholder="Enter your new password">
      </div>
      <div>
        <button id="password-accept-btn">Update</button>
        <button id="password-cancel-btn">Cancel</button>
      </div>
    `;
  }
}