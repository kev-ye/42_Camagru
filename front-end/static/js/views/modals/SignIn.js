import AbstractModal from "./AbstractModal.js"
import Forget from "./Forget.js"
import HttpClient from "../../Common/HttpClient.js";

export default class extends AbstractModal {
   constructor() {
    super();

    this.init({
      modal: 'signInModal',
      openBtn: 'sign-in',
      cancelBtn: 'signIn-cancelbtn',
      close: 'signIn-close',
      template: `
        <div id="signInModal" class="modal">
          <form name="signIn-form" id="signIn-form" class="modal-content" method="post">

            <div class="close-container">
              <span id="signIn-close" class="common-close">&times;</span>
            </div>

            <div class="modal-title-container">
              <h1>Sign In</h1>
            </div>

            <hr class="modal-separator">

            <div class="common-modal-main-container">
              <label for="signIn-username"><b>Username</b></label>
              <input type="text" placeholder="Enter Username" name="signIn-username" class="common-input" required>

              <label for="signIn-psw"><b>Password</b></label>
              <input type="password" placeholder="Enter Password" name="signIn-psw" class="common-input" required>

              <button type="submit" class="signIn-acceptbtn">Sign in</button>
            </div>

            <div class="common-main-container">
              <button type="button" id="signIn-cancelbtn" class="signIn-cancelbtn">Cancel</button>
              <span class="psw">Forgot <a id="forget-password" href="">password?</a></span>
            </div>
          </form>
        </div>
      `
    });
    this.open();
    this.close();
  }

  async accept() {
    this.modalForm = document.getElementById('signIn-form');
    this.modalForm.onsubmit = async (e) => {
      e.preventDefault();

      const u = String(document.forms["signIn-form"]["signIn-username"].value);
      const p = String(document.forms["signIn-form"]["signIn-psw"].value);

      // if (this.validateForm(u, p)) {
        const http = new HttpClient();
      
        await http.post('/api/auth/login', {
          "username": u,
          "password": p
        }).then(data => {
          if (data && data.token) {
            localStorage.setItem('__token__', data.token);
            location.reload();
          }
          else
            alert('Username or password wrong');
        })
    //   }
    //   else
    //     alert('Username or password wrong');
    }
  }

  async forgetPassword() {
    this.forget = document.getElementById('forget-password');
    this.forget.onclick = (e) => {
      e.preventDefault();
      this.modal.style.display = "none";

      const $forget = new Forget();
      $forget.sendReset();
    }
  }

  validateForm(u, p) {
    const uRegex = /^[a-zA-Z0-9]{6,16}$/;
    const pRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,16}$/;

    if (!u || !uRegex.test(u)) return false;
    if (!p || !pRegex.test(p)) return false;

    return true;
  }
}