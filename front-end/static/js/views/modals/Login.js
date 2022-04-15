import Modal from "./AbstractModal.js"
import HttpClient from "../../Common/HttpClient.js";

export default class extends Modal {
   constructor(buttonId, e) {
    super();

    this.init({
      modal: 'loginModal',
      openBtn: buttonId,
      cancelBtn: '.login-cancelbtn',
      cancelSpan: '.close',
      template: `
        <div id="loginModal" class="modal">
          <form name="login-form" id="login-form" class="modal-content" method="post">
            <div class="close-container">
              <span class="close">&times;</span>
            </div>
            <div class="login-container">
              <label for="uname"><b>Username</b></label>
              <input id="loginUsername" type="text" placeholder="Enter Username" name="login-username" class="login-input" required>

              <label for="psw"><b>Password</b></label>
              <input id="loginPassword" type="password" placeholder="Enter Password" name="login-psw" class="login-input" required>

              <button type="submit" class="login-acceptbtn">Sign in</button>
            </div>

            <div class="login-container">
              <button type="button" class="login-cancelbtn">Cancel</button>
              <span class="psw">Forgot <a href="#">password?</a></span>
            </div>
          </form>
        </div>
      `
    });
    this.open();
    this.close();
  }

  async accept(e) {
    this.modalForm = document.getElementById('login-form');
    this.modalForm.onsubmit = async (e) => {
      e.preventDefault();

      const u = String(document.forms["login-form"]["login-username"].value);
      const p = String(document.forms["login-form"]["login-psw"].value);

      // if (this.validateForm(u, p)) {
        const http = new HttpClient();
        const res = await http.post('/api/auth/login', {
          "username": u,
          "password": p
        });

        if (res && res.token) {
          localStorage.setItem('__token__', res.token);
          location.reload();
        }
        else
          alert('Username or password wrong');
    //   }
    //   else
    //     alert('Username or password wrong');
    }
  }

  validateForm(u, p) {
    const uRegex = /^[a-zA-Z0-9]{6,16}$/;
    const pRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,16}$/;

    if (!u || !uRegex.test(u)) {
      // alert("Username must contain letters or numbers, length between 6-16");
      return false;
    }

    if (!p || !pRegex.test(p)) {
      // alert("Password must contain a combination of uppercase and lowercase letters and numbers, no special characters, length between 8-16");
      return false;
    }

    return true;
  }
}