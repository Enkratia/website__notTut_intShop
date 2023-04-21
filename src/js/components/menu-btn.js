import * as v from "../vars";

const childCount = 5; 
let isFalse = false;

// F(s)
function showHideCategories() {
  if (isFalse) return;

  const listsAll = v.$headerMainContainer.querySelectorAll(".megamenu__list");
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

  v.$headerMainContainer.classList.toggle("header-main__container--show");
  v.$searchForm.classList.toggle("header-main__search-form--show");
  v.$navList.classList.toggle("nav__list--show");
  v.$login.classList.toggle("login--show");
  document.body.classList.toggle("overflow-hidden");
}

// L(s)
v.$menuBtn.addEventListener("click", showMenu);
v.$menuBtn.addEventListener("click", showHideCategories);

v.$mdq992.addEventListener("change", () => {
  if (v.$mdq992.matches) {
    if (v.$menuBtn.classList.contains("menu-btn--show")) {
      v.$menuBtn.click();
    }

    v.$navList.querySelectorAll(".megamenu__list").forEach(el =>  {
      el.classList.remove("megamenu__list--active");
      el.style.height = "auto";
    });

    v.$navList.querySelectorAll(".megamenu__more").forEach(el => el.remove());

    v.$menuBtn.removeEventListener("click", showHideCategories);
  }
});

v.$mdq991.addEventListener("change", () => {
  if (v.$mdq991.matches) {
    isFalse = false;
    v.$menuBtn.addEventListener("click", showHideCategories);
  }
});