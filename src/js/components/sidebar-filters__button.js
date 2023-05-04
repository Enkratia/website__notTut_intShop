import * as v from "../vars.js";

let isFirst = true;
let isFalse = true;
let isSmallDisplay = false;

if (v.$sidebarFiltersButton) {

  // F(s)
  // **
  function reverseText() {
    if (isFirst) {
      if (v.$mdq1119.matches) {
        isFalse === true ? false : true;
        changeText();
      }

      isFirst = false;
      return;
    }

    if (v.$mdq1119.matches) {
      isFalse === true ? false : true;
      changeText();

    } else {
      isFalse === true ? false : true;
      changeText();
    }
  }
  reverseText();

  // **
  function changeText() {
    let btnText = v.$sidebarFiltersButton.querySelector(".btn__text");

    if (isFalse) {
      btnText.textContent = "Show filters";
      isFalse = false;

    } else {
      btnText.textContent = "Hide filters";
      isFalse = true;
    }
  }

  // **
  function toggleSidebarFilters() {
    const filters = this.nextElementSibling;

    filters.classList.toggle("sidebar-filters__wrapper--hide");
    this.classList.toggle("sidebar-filters__button--hide");
    v.$catalog.classList.toggle("catalog--hide");

    changeText();

    if (isSmallDisplay) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }

  // **
  function stallBody() {
    if (v.$mdq1119.matches) {
      isSmallDisplay = true;

    } else {
      isSmallDisplay = false;
      document.body.classList.remove("overflow-hidden");
    }
  }
  stallBody();

  // L(s)
  v.$sidebarFiltersButton.addEventListener("click", toggleSidebarFilters);
  v.$mdq1119.addEventListener("change", stallBody);
  v.$mdq1119.addEventListener("change", reverseText);
}