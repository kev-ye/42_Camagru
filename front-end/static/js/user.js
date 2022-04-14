import Login from "./views/modals/Login.js"

document.addEventListener("click", e => {
  if (e.target && e.target.id === 'login') {
    const login = new Login('login');

    login.open();
    login.close();
  }
})