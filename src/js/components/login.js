import * as v from "../vars";

// F(s)
function replaceLogin() {
  if (v.$mdq991.matches) {
    v.$headerMainContainer.appendChild(v.$login);
  }
}
replaceLogin();

function returnLogin() {
  if (v.$mdq992.matches) {
    v.$headerTopContainer.appendChild(v.$login);
  }
}

// L(s)
v.$mdq991.addEventListener("change", replaceLogin);
v.$mdq992.addEventListener("change", returnLogin);