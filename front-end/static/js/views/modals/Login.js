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
        <form class="modal-content">
          <div class="close-container">
            <span class="close">&times;</span>
          </div>
          <div class="login-container">
            <label for="uname"><b>Username</b></label>
            <input type="text" placeholder="Enter Username" name="uname" class="login-input" required>

            <label for="psw"><b>Password</b></label>
            <input type="password" placeholder="Enter Password" name="psw" class="login-input" required>

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
    this.btn = document.getElementById(buttonId);
    this.span = document.querySelector('.close');
  }

  open() {
    this.btn.onclick = () => {
      this.modal.style.display = "block";
    };
  }

  close() {
    this.span.onclick = () => {
      this.modal.style.display = "none";
    };

    window.onclick = (e) => {
      if (e.target === this.modal) {
        this.modal.style.display = "none";
      }
    }
  }
}