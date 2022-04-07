import Gallery from "./views/Gallery.js";
import User from "./views/User.js";
import Setting from "./views/Setting.js"

const navigateTo = url => {
  history.pushState(null, null, url);
  router().then();
}

const router = async () => {
  const routes = [
    { path: "/", view: Gallery },
    { path: "/user", view: User },
    { path: "/setting", view: Setting }
  ];

  const potentialMatches = routes.map(route => {
    return {
      route: route,
      isMatch: location.pathname === route.path
    };
  });

  let match = potentialMatches.find(potentialMatch => potentialMatch.isMatch);

  if (!match) {
    match = {
      route: routes[0],
      isMatch: true
    };
  }

  const view = new match.route.view();

  // document.querySelector('#app').innerHTML = await view.getHtml();
  document.getElementById('app').innerHTML = await view.getHtml();
}

window.addEventListener("popstate", router);

document.addEventListener("DOMContentLoaded", () => {
  document.body.addEventListener("click", e => {
    if (e.target.matches("[data-link]")) {
      e.preventDefault();
      navigateTo(e.target.href);
    }
  });
  router().then();
});