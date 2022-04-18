import SignIn from "./views/modals/SignIn.js"
import SignUp from "./views/modals/SignUp.js";

const signIn = async (e) => {
  const $signIn = new SignIn();
  await $signIn.accept(e);
}

const signUp = async (e) => {
  const $signUp = new SignUp();
  await $signUp.accept(e);
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
          signIn(e);
          break ;
        case 'sign-up':
          signUp(e);
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