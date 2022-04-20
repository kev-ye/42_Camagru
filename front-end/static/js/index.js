import Gallery from "./views/Gallery.js";
import User from "./views/User.js";
import Nav from "./views/Nav.js";
import Reset from "./views/Reset.js";
import Confirmation from "./views/Confirmation.js";

const navigateTo = url => {
  history.pushState(null, null, url);
  router().then();
}

const router = async () => {
  const routes = [
    { path: "/", view: Gallery },
    { path: "/user", view: User },
    { path: "/reset", view: Reset },
    { path: "/confirmation", view: Confirmation }
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

  const nav = new Nav();
  const view = new match.route.view();
  const noNavPath = ['/reset', '/confirmation'];

  if (!noNavPath.find(path => path === location.pathname)) {
    document.getElementById('nav').innerHTML = await nav.getHtml().then(res => res);
  }
  document.getElementById('app').innerHTML = await view.getHtml().then(res => {
    if (res) return res;
    else {
      if (location.pathname === '/reset') alert('You don\'t have access to this page!')
      else alert('You are not login');
      location = '/';
    }
  });

  if (location.pathname === '/reset')
    view.reset();

  if (location.pathname === '/confirmation')
    view.confirmation();
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