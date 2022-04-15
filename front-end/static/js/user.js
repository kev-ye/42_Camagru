import Login from "./views/modals/Login.js"

const login = async (e) => {
  const login = new Login(e.target.id, e);
  await login.accept(e);
}

const exit = async () => {
  localStorage.removeItem('__token__');
  location.reload();
}

document.addEventListener("DOMContentLoaded", () => {
  document.body.addEventListener("click", e => {
    if (e.target && e.target.id === 'sign-in') login(e);
    if (e.target && e.target.id === 'user-exit') exit();
  })
})