import Login from "./views/modals/Login.js"

const login = async (e) => {
  const login = new Login('login');

  login.open();
  login.close();
  await login.accept(e);
} 

document.addEventListener("click", e => {
  if (e.target && e.target.id === 'login') {
    login();
  }
})