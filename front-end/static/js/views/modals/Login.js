import Modal from "./AbstractModal.js"

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
        <form id="login-form" class="modal-content" method="post">
          <div class="close-container">
            <span class="close">&times;</span>
          </div>
          <div class="login-container">
            <label for="uname"><b>Username</b></label>
            <input id="loginUsername" type="text" placeholder="Enter Username" name="uname" class="login-input" required>

            <label for="psw"><b>Password</b></label>
            <input id="loginPassword" type="password" placeholder="Enter Password" name="psw" class="login-input" required>

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

      const username = document.getElementById('loginUsername');
      const password = document.getElementById('loginPassword');

      console.log('username:', username.value);
      console.log('password:', password.value);
      // last time here
    }
  }
}