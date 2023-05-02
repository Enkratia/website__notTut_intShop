import * as v from "../vars.js";

const hoverCount = 3; // (Количество элементов главного меню с ховером)

// F(s)
function showDropdown(e) {
  e.preventDefault();
  const openMegamenu = document.querySelector(".megamenu--show");
  const megamenu = this.nextElementSibling;

  if (megamenu === openMegamenu) {
    megamenu.classList.toggle("megamenu--show");
  } else {
    openMegamenu?.classList.remove("megamenu--show");
    megamenu.classList.add("megamenu--show");
  }

  const openLink = document.querySelector(".nav__link--open");

  if (this === openLink) {
    this.classList.toggle("nav__link--open");
    return;
  }

  openLink?.classList.remove("nav__link--open");
  this.classList.add("nav__link--open");
}

function addShowDropdown() {
  if (v.$mdq991.matches) {
    v.$navLinksAll.forEach((el, idx) => {
      if (idx > hoverCount) return;
      el.addEventListener("click", showDropdown);
    });
  }
}
addShowDropdown();

function removeShowDropdown() {
  if (v.$mdq992.matches) {
    v.$navLinksAll.forEach((el, idx) => {
      if (idx > hoverCount) return;
      el.removeEventListener("click", showDropdown);
    });

    document.querySelector(".megamenu--show")?.classList.remove("megamenu--show");
    document.querySelector(".nav__link--open")?.classList.remove("nav__link--open");
  }
}

function removeNavItemsHover() {
  if (v.$mdq991.matches) {
    v.$navItems.forEach((item, idx) => {
      if (idx > hoverCount) return;
      item.classList.remove("nav__item--hover");
    });
  }
}
removeNavItemsHover();

function addNavItemsHover() {
  if (v.$mdq992.matches) {
    v.$navItems.forEach((item, idx) => {
      if (idx > hoverCount) return;
      item.classList.add("nav__item--hover");
    });
  }
}
addNavItemsHover();

// L(s)
v.$mdq991.addEventListener("change", removeNavItemsHover);
v.$mdq992.addEventListener("change", addNavItemsHover);

v.$mdq991.addEventListener("change", addShowDropdown);
v.$mdq992.addEventListener("change", removeShowDropdown);


