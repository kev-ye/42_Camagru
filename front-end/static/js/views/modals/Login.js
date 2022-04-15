import Modal from "./AbstractModal.js"
import HttpClient from "../../Common/HttpClient.js";

const http = new HttpClient();

export default class extends Modal {
  constructor(buttonId) {
    super();

    this.init(buttonId);
  }

  init(buttonId) {
    const app = document.getElementById('app');
    const dialog = document.createElement('div');

    dialog.innerHTML = `
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
    `;

    app.appendChild(dialog);

    this.modal = document.getElementById('loginModal');
    this.loginBtn = document.getElementById(buttonId);
    this.cancelBtn = document.querySelector('.login-cancelbtn');
    this.cancelSpan = document.querySelector('.close');
    
    this.loginForm = document.getElementById('login-form');
  }

  open() {
    this.loginBtn.onclick = () => {
      this.modal.style.display = "block";
    };
  }

  close() {
    this.cancelSpan.onclick = () => {
      this.modal.style.display = "none";
    };

    this.cancelBtn.onclick  = () => {
      this.modal.style.display = "none";
    };

    window.onclick = (e) => {
      if (e.target === this.modal) {
        this.modal.style.display = "none";
      }
    }
  }

  async accept(e) {
    this.loginForm.onsubmit = (e) => {
      e.preventDefault();

      const u = String(document.forms["login-form"]["login-username"].value);
      const p = String(document.forms["login-form"]["login-psw"].value);

      // if (this.validateForm(u, p)) {
        const res = http.post('/api/auth/login', {
          "username": u,
          "password": p
        });

        console.log(res);

        // location.reload();
      // }
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