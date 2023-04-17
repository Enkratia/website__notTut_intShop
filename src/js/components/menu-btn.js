const menuBtn = document.querySelector("#menu-btn");
const headerMainContainer = document.querySelector("#header-main-container");
const searchForm = headerMainContainer.querySelector("#search-form");
const navList = headerMainContainer.querySelector("#nav-list");

const mq991 = window.matchMedia("(max-width: 991px)");
const mq992 = window.matchMedia("(min-width: 992px)");

const childCount = 5;
let isFalse = false;

// F(s)
function showHideCategories() {
  if (isFalse) return;

  const listsAll = headerMainContainer.querySelectorAll(".megamenu__list");
  const li = listsAll[0].firstElementChild;
  const liHeight = li.offsetHeight;
  const liMargin = window.getComputedStyle(li).getPropertyValue("margin-bottom");
  
  listsAll.forEach(el => {
    const listChildren = el.children;
    
    if (listChildren.length > childCount) {
      const listHeight = (liHeight + parseFloat(liMargin)) * childCount + "px";

      el.style.height = listHeight;
      el.classList.add("megamenu__list--active");
      el.insertAdjacentHTML("afterend", `
        <button class="megamenu__more" aria-label="Show more categories.">
          ...
        </button>
      `);

      el.nextElementSibling.addEventListener("click", function() {
        if (el.classList.contains("megamenu__list--active")) {
          this.textContent = "..";
          el.style.height = "auto";
          el.classList.remove("megamenu__list--active");
          return;
        }

        this.textContent = "...";
        el.style.height = listHeight;
        el.classList.add("megamenu__list--active");
      });
    }
  });

  isFalse = true;
}

function showMenu() {
  this.classList.toggle("menu-btn--show");

  headerMainContainer.classList.toggle("header-main__container--show");
  searchForm.classList.toggle("search-form--show");
  navList.classList.toggle("nav__list--show");
}

// L(s)
menuBtn.addEventListener("click", showMenu);
menuBtn.addEventListener("click", showHideCategories);

mq992.addEventListener("change", () => {
  if (mq992.matches) {
    navList.querySelectorAll(".megamenu__list").forEach(el =>  {
      el.classList.remove("megamenu__list--active");
      el.style.height = "auto";
    });

    navList.querySelectorAll(".megamenu__more").forEach(el => el.remove());

    menuBtn.removeEventListener("click", showHideCategories);
  }
});

mq991.addEventListener("change", () => {
  if (mq991.matches) {
    isFalse = false;
    menuBtn.addEventListener("click", showHideCategories);
  }
});