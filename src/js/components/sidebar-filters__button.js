import * as v from "../vars.js";

let isFalse = true;

if (v.$sidebarFiltersButton) {

  // F(s)
  function toggleSidebarFilters() {
    const filters = this.nextElementSibling;
    let btnText = this.querySelector(".btn__text");

    filters.classList.toggle("sidebar-filters__wrapper--hide");
    this.classList.toggle("sidebar-filters__button--hide");
    v.$catalog.classList.toggle("catalog--hide");

    if (isFalse) {
      btnText.textContent = "Show filters";
      isFalse = false;

    } else {
      btnText.textContent = "Hide filters";
      isFalse = true;
    }
  }

  // L(s)
  v.$sidebarFiltersButton.addEventListener("click", toggleSidebarFilters);
}
