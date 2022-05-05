import SignIn from "./views/modals/SignIn.js"
import SignUp from "./views/modals/SignUp.js";
import Forget from "./views/modals/Forget.js"

const signIn = async () => {
  const signInMod = document.getElementById('mod-signIn');
  if (!signInMod) {
    const $signIn = new SignIn();
    await $signIn.accept();
    await $signIn.forgetPassword();
  }
}

const signUp = async () => {
  const signUpMod = document.getElementById('mod-signUp');
  if (!signUpMod) {
    const $signUp = new SignUp();
    await $signUp.accept();
  }
}

const signInDefaultClose = (id) => {
  const toclose = document.getElementById(id);

  if (['mod-signIn', 'mod-signUp', 'mod-forget'].find(el => el === id)) {
    toclose.style.display = 'none';
  }
}

document.addEventListener("DOMContentLoaded", () => {
  document.body.addEventListener("click", async e => {
    if (e.target) {
      switch(e.target.id) {
        case 'mod-sign-in':
          await signIn();
          break ;
        case 'mod-sign-up':
          await signUp();
          break ;
        default:
          signInDefaultClose(e.target.id);
          break ;
      }
    }
  })
})