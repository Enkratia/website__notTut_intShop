import * as v from "../vars";

// F(s)
function showHideFilters(e) {
  if (e.target.tagName !== "BUTTON") return;

  const filter = this.parentElement;
  const filterBottom = this.nextElementSibling;
  filter.classList.toggle("filter--show");
  e.target.classList.toggle("filter__toggle--show");
  
  
  if (!filter.classList.contains("filter--show")) {
    filterBottom.style.height = "";
    filterBottom.classList.remove("filter__bottom--show-init");
    return;
  }
  
  const filterBottomHeight = filterBottom.scrollHeight;
  filterBottom.style.height = filterBottomHeight + "px";
}

// L(s)
v.$sidebarFilterTops.forEach(el => {
  el.addEventListener("click", showHideFilters);
});