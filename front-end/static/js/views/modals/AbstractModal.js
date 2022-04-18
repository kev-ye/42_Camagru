export default class {
  constructor() {}

  // initialize dialog html template
  init(setting = {}) {
    const app = document.getElementById('app');
    const dialog = document.createElement('div');

    dialog.innerHTML = setting.template || '';

    app.appendChild(dialog);

    this.modal = document.getElementById(setting.modal || '');
    this.openBtn = document.getElementById(setting.openBtn || '');
    this.cancelBtn = document.querySelector(setting.cancelBtn || '');

    this.cancelSpan = document.querySelector(setting.close || '');
  }

  // open dialog
  open() {
    this.openBtn.onclick = () => {
      this.modal.style.display = "block";
    };

    this.openBtn.onclick();
  }

  // close dialog
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

  // action about accept button (if exist)
  async accept() {}

  // action about cancel button (if exist)
  async cancel() {}
}