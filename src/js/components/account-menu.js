import * as v from "../vars.js";

// F(s)
function showAccountMenu() {
  this.classList.toggle("account-menu__btn--show");

  if (this.classList.contains("account-menu__btn--show")) {
    const accountMenuLinksHeight = v.$accountMenuLinks.scrollHeight;
    v.$accountMenuLinks.style.height = accountMenuLinksHeight + "px";

    return;
  }

  v.$accountMenuLinks.style.height = "";
}

// L(s)
v.$accountMenuBtn?.addEventListener("click", showAccountMenu);