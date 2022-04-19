import AbstractModal from "./AbstractModal.js";
import HttpClient from "../../Common/HttpClient.js";

export default class extends AbstractModal {
  constructor() {
    super();

    this.init({
      modal: 'forgetModal',
      openBtn: 'forget-password',
      cancelBtn: 'forget-cancelbtn',
      close: 'forget-close',
      template: `
        <div id="forgetModal" class="modal">
          <form name="forget-form" id="forget-form" class="modal-content" method="post">

            <div class="close-container">
              <span id="forget-close" class="common-close">&times;</span>
            </div>

            <div class="modal-title-container">
              <h1>Forget</h1>
            </div>

            <hr class="modal-separator">

            <div class="common-modal-main-container">
              <label for="forget-username"><b>Username</b></label>
              <input id="forget-username" type="text" placeholder="Enter Username" name="forget-username" class="common-input" required>

              <div class="forget-button-container">
                <button type="submit" class="forget-acceptbtn">Send</button>
                <button type="button" id="forget-cancelbtn" class="forget-cancelbtn">Cancel</button>
              </div>
            </div>

          </form>
        </div>
      `
    });
    this.open();
    this.close();
  }

  async sendReset() {
    this.modalForm = document.getElementById('forget-form');
    this.modalForm.onsubmit = async (e) => {
      e.preventDefault();
      
      const u = document.forms["forget-form"]["forget-username"];

      if (this.validateForm(u)) {
        const http = new HttpClient();

        await http.post('/api/auth/reset/send', { "username": String(u) })
          .then(data => {
            if (data && data.send) {
              alert('Send! Check your email');
              u.value = "";
              this.hide();
            }
            else alert('Something wrong');
          })
      }
      else alert('Username wrong');
    }
  }

  validateForm(u) {
    const pRegex = /^[a-zA-Z0-9]{6,16}$/;

    return !(!u || !pRegex.test(u));
  }
}