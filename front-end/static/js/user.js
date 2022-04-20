import SignIn from "./views/modals/SignIn.js"
import SignUp from "./views/modals/SignUp.js";

const signIn = async () => {
  const $signIn = new SignIn();
  await $signIn.accept();
  await $signIn.forgetPassword();
}

const signUp = async () => {
  const $signUp = new SignUp();
  await $signUp.accept();
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
        default:
          break ;
      }
    }
  })
})