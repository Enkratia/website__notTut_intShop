import * as v from "../vars";

if (v.$sidebarFilterTops[0]) {

  // F(s)
  function showHideFilters(e) {
    if (e.target.tagName !== "BUTTON") return;

    const filter = this.parentElement;
    const filterBottom = this.nextElementSibling;
    const filterBottomHeight = filterBottom.scrollHeight;

    filter.classList.toggle("filter--show");
    filterBottom.style.height = filterBottomHeight + "px";
    
    if (!filter.classList.contains("filter--show")) {
      filterBottom.style.height = "";
      return;
    }
    
  }

  function showHideFiltersInit() {
    const activeFilter = document.querySelector(".filter--show");
    const activeFilterBottom = activeFilter.querySelector(".filter__bottom");

    if (activeFilter) {
      const activeFilterBottomHeight = activeFilterBottom.scrollHeight;
      activeFilterBottom.style.height = activeFilterBottomHeight + "px";
    }
  }
  showHideFiltersInit();

  // L(s)
  v.$sidebarFilterTops.forEach(el => {
    el.addEventListener("click", showHideFilters);
  });
}
