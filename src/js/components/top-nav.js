import * as v from "../vars.js";

// F(s)
// **
function toggleTopNav() {
  const topNavList = this.nextElementSibling;
  topNavList.classList.toggle("top-nav__list--show");

  if (topNavList.classList.contains("top-nav__list--show")) {
    setTimeout(() => {
      document.documentElement.addEventListener("click", hideTopNavList);
    }, 0);
  }

  function hideTopNavList(e) {
    if (!e.target.closest(".top-nav__list")) {
      topNavList.classList.remove("top-nav__list--show");
      document.documentElement.removeEventListener("click", hideTopNavList);
    }
  }
}

// L(s)
// **
v.$topNavBtn.addEventListener("click", toggleTopNav);