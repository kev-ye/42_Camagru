import HttpClient from "../Common/HttpClient.js";
import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
  constructor() {
    super();

    this.setTitle("Reset");
  }

  async getHtml() {
    return `
      <h1>Reset password</h1>
      <form name="new-password-form" id="new-password-form" method="post">
        <label for="new-password">New password</label>
        <input type="password" placeholder="Enter new password" name="new-password" class="newpassword-input" required>

        <button type="submit" class="newpasswprd">Reset</button>
      </form>
    `;
  }

  async reset() {
    const query = location.search;
    const param = new URLSearchParams(query);
    const token = param.get('token');

    this.newPswForm = document.getElementById('new-password-form');
    this.newPswForm.onsubmit = async (e) => {
      e.preventDefault();

      const p = String(document.forms["new-password-form"]["new-password"].value);
      
      if (!token) {
        alert('Something wrong!');
        return ;
      }
      // if (this.validateForm(p)) {
        const http = new HttpClient();
        await http.put(`/api/auth/reset/change?token=${token}`, {
          "password": p
        }).then(data => {
          if (data && data.reset) {
            alert(`Password has been changed`);
            location = '/';
          }
          else {
            alert(`Something wrong!`);
          }
        })
      // }
    }
  }

  validateForm(p) {
    const pRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,16}$/;

    if (!p || !pRegex.test(p)) {
      alert("Password must contain a combination of uppercase and lowercase letters and numbers, no special characters, length between 8-16");
      return false;
    }
    return true;
  }
}