import SignIn from "./views/modals/SignIn.js"
import SignUp from "./views/modals/SignUp.js";

const signIn = async () => {
  const $signIn = new SignIn();
  await $signIn.accept();
}

const signUp = async () => {
  const $signUp = new SignUp();
  await $signUp.accept();
}

const exit = async () => {
  localStorage.removeItem('__token__');
  location.reload();
}

document.addEventListener("DOMContentLoaded", () => {
  document.body.addEventListener("click", e => {
    if (e.target) {
      switch(e.target.id) {
        case 'sign-in':
          signIn();
          break ;
        case 'sign-up':
          signUp();
          break ;
        case 'user-exit':
          exit();
          break ;
        default:
          break ;
      }
    }
  })
})