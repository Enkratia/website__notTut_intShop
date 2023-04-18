import * as v from "../vars";

// F(s)
function toggleTopNav() {
  const topNavList = this.nextElementSibling;
  topNavList.classList.toggle("top-nav__list--show");

  
  setTimeout(() => {
    document.documentElement.addEventListener("click", hideTopNavList);

    function hideTopNavList(e) {
      if (!e.target.closest(".top-nav__list")) {
        topNavList.classList.remove("top-nav__list--show");
        document.documentElement.removeEventListener("click", hideTopNavList);
      }
    }
  }, 0);
}

// L(s)
v.$topNavBtn.addEventListener("click", toggleTopNav);