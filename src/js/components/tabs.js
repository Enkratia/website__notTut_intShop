import * as v from "../vars.js";

// F(s)
function showTabContent() {
  const tabs = this.closest(".product-card__tabs");
  tabs.querySelector(".tab--active").classList.remove("tab--active");
  this.classList.add("tab--active");
}

// L(s)
v.$productCardTabs?.forEach(el => {
  el.addEventListener("click", showTabContent);
});