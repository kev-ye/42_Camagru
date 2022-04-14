import HttpClient from "./Common/HttpClient.js";
import Login from "./views/modals/Login.js"

const http = new HttpClient();

// const test = () => {
//   const el = document.getElementById('app');
//   const dialog = document.createElement('div');
//   dialog.innerHTML = `
//     <div id="myModal" class="modal">
//       <div class="modal-content">
//         <span class="close">&times;</span>
//         <p>testing</p>
//       </div>
//     </div>
//   `;
//   el.appendChild(dialog);

//   const modal = document.getElementById('myModal');
//   const btn = document.getElementById('test');
//   const span = document.querySelector('.close');

//   console.log(btn);

//   btn.onclick = function() {
//     modal.style.display = "block";
//   }

//   span.onclick = function() {
//     modal.style.display = "none";
//   }

//   window.onclick = function(event) {
//     if (event.target === modal) {
//       modal.style.display = "none";
//     }
//   }
// }

document.addEventListener("click", e => {
  if (e.target && e.target.id === 'test') {
    const login = new Login();

    login.open();
    login.close();
  }
})