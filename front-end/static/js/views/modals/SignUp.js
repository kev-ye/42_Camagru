import AbstractModal from "./AbstractModal.js";
import HttpClient from "../../Common/HttpClient.js";
import { createNewUser } from "../../service/user.js";

export default class extends AbstractModal {
  constructor() {
    super();

    this.init({
      modal: 'signUpModal',
      openBtn: 'sign-up',
      cancelBtn: 'signUp-cancelbtn',
      close: 'signUp-close',
      template: `
      <div id="signUpModal" class="modal">
        <form name="signUp-form" id="signUp-form" class="modal-content" method="post">

          <div class="close-container">
            <span id="signUp-close" class="common-close">&times;</span>
          </div>

          <div class="modal-title-container">
            <h1>Sign Up</h1>
          </div>

          <hr class="modal-separator">

          <div class="common-modal-main-container">
            <label for="signUp-username"><b>Username</b></label>
            <input id="signUpUsername" type="text" placeholder="Enter Username" name="signUp-username" class="common-input" required>

            <label for="signUp-psw"><b>Password</b></label>
            <input id="signUpPassword" type="password" placeholder="Enter Password" name="signUp-psw" class="common-input" required>

            <label for="signUp-email"><b>Email</b></label>
            <input id="signUpemail" type="text" placeholder="Enter email" name="signUp-email" class="common-input" required>

            <div class="signUp-button-container">
              <button type="submit" class="signUp-acceptbtn">Sign up</button>
              <button type="button" id="signUp-cancelbtn" class="signUp-cancelbtn">Cancel</button>
            </div>
          </div>
        </form> 
      </div>
      `
    });
    this.open();
    this.close();
  }

  async accept() {
    this.modalForm = document.getElementById('signUp-form');
    this.modalForm.onsubmit = async (e) => {
      e.preventDefault();

      const u = document.forms["signUp-form"]["signUp-username"];
      const p = document.forms["signUp-form"]["signUp-psw"];
      const m = document.forms["signUp-form"]["signUp-email"];

      // if (this.validateForm(u, p, m)) {
        await createNewUser(
          String(u.value),
          String(p.value),
          String(m.value)
        ).then(created => {
          if (created) {
            alert(`User ${String(u.value)} created.\nA confirmation send to ${String(m.value)}`);
            this.cleanInput(u, p, m);
            this.hide();
          }
          else alert(`User ${String(u.value)} already exist!`);
        });
      // }
    }
  }

  validateForm(u, p, m) {
    const uRegex = /^[a-zA-Z0-9]{6,16}$/;
    const pRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,16}$/;
    const mRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    if (!u || !uRegex.test(u)) {
      alert("Username must contain letters or numbers, length between 6-16");
      return false;
    }

    if (!p || !pRegex.test(p)) {
      alert("Password must contain a combination of uppercase and lowercase letters and numbers, no special characters, length between 8-16");
      return false;
    }

    if (!p || !mRegex.test(m)) {
      alert("Email format isn't correct");
      return false;
    }

    return true;
  }

  cleanInput(u, p, m) {
    u.value = "";
    p.value = "";
    m.value = "";
  }
}