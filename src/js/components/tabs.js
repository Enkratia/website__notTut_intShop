import * as v from "../vars.js";

// F(s)
function showTabContent() {
  if (!this || !this.classList.contains("tab")) return;

  const tabs = this.closest(".product-card__tabs");

  const prevTab = tabs.querySelector(".tab--active");
  prevTab.classList.remove("tab--active");
  prevTab.setAttribute("aria-selected", "false");

  this.classList.add("tab--active");
  this.setAttribute("aria-selected", "true");
}

// L(s)
v.$productCardTabs?.forEach(el => {
  el.addEventListener("click", showTabContent);
});