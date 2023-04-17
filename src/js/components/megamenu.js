const navLinksAll = document.querySelectorAll(".nav__link");
const navItems = document.querySelectorAll(".nav__item");

const mediaquery991 = window.matchMedia("(max-width: 991px)");
const mediaquery992 = window.matchMedia("(min-width: 992px)");

const hoverCount = 3; // Количество элементов главного меню с ховером

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
  if (mediaquery991.matches) {
    navLinksAll.forEach((el, idx) => {
      if (idx > hoverCount) return;
      el.addEventListener("click", showDropdown);
    });
  }
}
addShowDropdown();

function removeShowDropdown() {
  if (mediaquery992.matches) {
    navLinksAll.forEach((el, idx) => {
      if (idx > hoverCount) return;
      el.removeEventListener("click", showDropdown);
    });

    document.querySelector(".megamenu--show")?.classList.remove("megamenu--show");
    document.querySelector(".nav__link--open")?.classList.remove("nav__link--open");
    document.querySelector("#menu-btn").click();
  }
}

function removeNavItemsHover() {
  if (mediaquery991.matches) {
    navItems.forEach((item, idx) => {
      if (idx > hoverCount) return;
      item.classList.remove("nav__item--hover");
    });
  }
}
removeNavItemsHover();

function addNavItemsHover() {
  if (mediaquery992.matches) {
    navItems.forEach((item, idx) => {
      if (idx > hoverCount) return;
      item.classList.add("nav__item--hover");
    });
  }
}
addNavItemsHover();

// L(s)
mediaquery991.addEventListener("change", removeNavItemsHover);
mediaquery992.addEventListener("change", addNavItemsHover);

mediaquery991.addEventListener("change", addShowDropdown);
mediaquery992.addEventListener("change", removeShowDropdown);


