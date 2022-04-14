import Modal from "./AbstractModal.js"

export default class extends Modal {
  constructor() {
    super();

    this.init();
  }

  init() {
    const app = document.getElementById('app');
    const dialog = document.createElement('div');

    dialog.innerHTML = `
      <div id="myModal" class="modal">
        <div class="modal-content">
          <span class="close">&times;</span>
          <p>testing</p>
        </div>
      </div>
    `;

    app.appendChild(dialog);

    this.modal = document.getElementById('myModal');
    this.btn = document.getElementById('test');
    this.span = document.querySelector('.close');
  }

  open() {
    this.btn.onclick = () => {
      this.modal.style.display = "block";
    };
  }

  close() {
    this.span.onclick = () => {
      this.modal.style.display = "block";
    };

    window.onclick = (e) => {
      if (e.target === this.modal) {
        this.modal.style.display = "none";
      }
    }
  }
}