import * as v from "../vars.js";
import noUiSlider from "nouislider";

if (v.$sidebarFilterTops[0]) {

  // ==== FILTER PRICE SLIDER ==== //
  const filterPriceSlider = noUiSlider.create(v.$filterSliderRange, {
    start: [480, 800],
    connect: true,
    range: {
      'min': 0,
      'max': 1000
    },
    step: 1,
    tooltips: {
      to: function (value) {
        return "$" + parseInt(value);
      },
      from: function (value) {
        return "$" + parseInt(value);
      }
    }
  });

  // F(s)
  // **
  function changeInputsValues() {
    const rangeValues = filterPriceSlider.get();

    v.$filterSliderInputs.forEach((el, idx) => {
      el.value = parseInt(rangeValues[idx]);
    });
  }
  changeInputsValues();

  // **
  function changeRangeValues(idx) {
    const currentInputValue = ~~v.$filterSliderInputs[idx].value;
    filterPriceSlider.setHandle(idx, currentInputValue);
  }

  // L(s)
  // **
  filterPriceSlider.on("slide", changeInputsValues);

  // **
  v.$filterSliderInputs.forEach((el, idx) => {
    el.addEventListener("keyup", () => changeRangeValues(idx));
  });


  // ==== ADD FILTER CATEGORIES TO BREADCRUMBS ==== //
  const prevFilterMap = new Map();
  const filterMap = new Map();
  let ul;
  let prevPrice;
  let currentPrice;
  let isUlExist = false;
  let isTwo = 0;

  // F(s)
  // **
  function deleteAllBtn() {
    const allActiveFilters = ul.querySelectorAll(".active-filters__btn--regular");

    allActiveFilters.forEach(el => {
      deleteBtn.call(el);
    });
  }

  // **
  function toggleCategoriesVisibility() {
    ul.classList.toggle("active-filters--invisible", ul.children.length <= 1);
  }

  // **
  function isMapsEqual() {
    if (filterMap.size !== prevFilterMap.size) {
      return true;
    }

    const prevFilterMapValues = Array.from(prevFilterMap.values());
    for (let [a, b] of filterMap) {
      if (!prevFilterMapValues.includes(b)) {
        return true;
      }
    }

    return false;
  }

  // **
  function rewriteMap() {
    prevFilterMap.clear();
    for (let filter of filterMap) {
      prevFilterMap.set(filter[0], filter[1]);
    }
  }

  // **
  function resetSlider() {
    filterPriceSlider.reset();
    changeInputsValues();
  }

  // **
  function deleteBtn() {
    const categoryText = this.innerText;

    if (categoryText.startsWith("Price")) {
      resetSlider();
      filterMap.delete("price");

    } else if (this.dataset.tag.startsWith("color")) {
      const activeColorBtns = v.$filterWrapper.querySelectorAll(".colors__button--active");

      for (let i = 0; i < activeColorBtns.length; i++) {
        if (activeColorBtns[i].dataset.color === categoryText) {
          toggleActiveColor(activeColorBtns[i]);
          filterMap.delete(this.dataset.tag);
          break;
        }
      }

    } else {
      const checkedCheckboxes = v.$filterWrapper.querySelectorAll(".custom-checkbox--checked");

      for (let i = 0; i < checkedCheckboxes.length; i++) {
        if (checkedCheckboxes[i].nextElementSibling.innerText === categoryText) {
          checkedCheckboxes[i].click();
          filterMap.delete(categoryText);
          break;
        }
      }
    }

    this.remove();

    toggleCategoriesVisibility();
    rewriteMap();
    toggleShowButton();
  }

  // **
  function toggleShowButton(elem) {
    v.$filterWrapper.classList.toggle("sidebar-filters__wrapper--confirm", isMapsEqual());

    if (elem) {
      const wrapperTop = v.$filterWrapper.getBoundingClientRect().top;
      const top = elem.getBoundingClientRect().top;
      v.$sidebarFiltersShowBtn.style.top = top - wrapperTop + "px";
    }
  }

  // **
  function addFilterInArray(text, name = text) {
    text = text.trim();
    name = name.trim();


    if (name === "price") {
      filterMap.set(name, text);
      return;
    }

    if (filterMap.has(name)) {
      filterMap.delete(name);
      return;
    }

    filterMap.set(name, text);
  }

  // **
  function toggleActiveColor(elem) {
    elem.classList.toggle("colors__button--active");
  }

  // **
  function addInBreadcrumbs() {
    if (!isUlExist) {
      ul = document.createElement("ul");
      ul.className = "breadcrumbs__active-filters active-filters";
      v.$breadcrumbsContainer.appendChild(ul);
      isUlExist = true;

      let clearAllTag = `
        <li class="active-filters__item active-filters__item--active">
          <button class="active-filters__btn active-filters__btn--clearall" aria-label="Delete all filters.">
            <svg xmlns='http://www.w3.org/2000/svg' aria-hidden="true">
             <use href='./img/sprite.svg#cross' aria-hidden="true"></use>
            </svg>
          </button>
  
          <span class="active-filters__name">
            Clear all
          </span>
        </li>
      `;

      ul.insertAdjacentHTML("afterbegin", clearAllTag);
      ul.querySelector(".active-filters__item").addEventListener("click", deleteAllBtn);
    }

    let liTags = "";

    const prevFilterMapValues = Array.from(prevFilterMap.values());
    const filterMapValues = Array.from(filterMap.values());

    for (let filter of prevFilterMap) {
      if (!filterMapValues.includes(filter[1])) {
        const filterNames = ul.querySelectorAll(".active-filters__name");

        filterNames.forEach(el => {
          if (el.innerText === filter[1]) {
            el.parentElement.remove();
          }
        });
      }
    }

    for (let filter of filterMap) {
      if (prevFilterMapValues.includes(filter[1])) {
        continue;
      }

      liTags += `
          <li class="active-filters__item active-filters__btn--regular" data-tag="${filter[0]}">
            <button class="active-filters__btn" aria-label="Delete this filter.">
               <svg xmlns='http://www.w3.org/2000/svg' aria-hidden="true">
                <use href='./img/sprite.svg#cross' aria-hidden="true"></use>
              </svg>
            </button>
  
            <span class="active-filters__name">
             ${filter[1]}
            </span>
          </li>`;
    }

    ul.insertAdjacentHTML("afterbegin", liTags);

    toggleCategoriesVisibility();

    const regularBtns = ul.querySelectorAll(".active-filters__btn--regular");
    regularBtns.forEach(el => {
      el.addEventListener("click", deleteBtn, { once: true });
    });


    rewriteMap();
    toggleShowButton();

    if (v.$mdq1119.matches) {
      v.$sidebarFiltersButton.click();
      document.body.classList.remove("overflow-hidden");
    }
  }

  // ***
  function initPrice() {
    const prevPriceArray = filterPriceSlider.get();
    prevPrice = `Price: ${~~prevPriceArray[0]} - ${~~prevPriceArray[1]}`;
  }
  initPrice();

  // ***
  function getPrice() {
    const currentPriceArray = filterPriceSlider.get();
    currentPrice = "Price: " + `${~~currentPriceArray[0]} - ${~~currentPriceArray[1]}`;

    if (prevPrice !== currentPrice) {
      addFilterInArray(currentPrice, "price");

    } else {
      filterMap.delete("price");
    }

    toggleShowButton(v.$filterSliderRange);
  }

  // ***
  function getCategories(e) {
    if (e.target.classList.contains("filter__color-btn")) {
      toggleActiveColor(e.target);
      addFilterInArray(e.target.dataset.color, `color${e.target.dataset.color}`);
      toggleShowButton(e.target);

    } else if (e.target.classList.contains("filter__checkbox")) {
      const filterCheckbox = e.target;
      const filterName = filterCheckbox.nextElementSibling.textContent;
      addFilterInArray(filterName);
      toggleShowButton(e.target);
    }
  }

  // L(s)
  //**
  v.$sidebarFiltersFilters.forEach(el => {
    el.addEventListener("click", getCategories);
  });

  // **
  v.$sidebarFiltersShowBtn.addEventListener("click", addInBreadcrumbs);
  v.$sidebarFiltersApplyBtn.addEventListener("click", () => v.$sidebarFiltersShowBtn.click());

  // **
  filterPriceSlider.on("update", () => {
    isTwo++; // (2 inits from the start)
    if (isTwo <= 2) return;
    getPrice();
  });

  // ===== Same (add filter categories to breadcrumbs), but for keyboard ===== //
  const keySet = new Set();

  // F(s)
  // **
  function showCategoriesWithKeyboard(e) {
    keySet.add(e.key);

    if (keySet.has("+") && keySet.has("-")) {
      v.$sidebarFiltersShowBtn.click();
    }
  }

  // **
  function clearKeySet() {
    keySet.clear();
  }

  // L(s)
  v.$filterWrapper.addEventListener("keydown", showCategoriesWithKeyboard);
  v.$filterWrapper.addEventListener("keyup", clearKeySet);

  // ==== SHOW-HIDE FILTERS (ACCORDION) ==== //
  let isElementCreated = false;
  let osBagElement;

  // F(s)
  // **
  function fixOSBag(bottom) { // overlay scrollbars не умеет реагировать на изменение height из js (так сделано для bottom)
    if (!isElementCreated) {
      osBagElement = document.createElement("span");
      isElementCreated = true;
    }

    setTimeout(() => { // чтобы overlay scrollbars observer успел за кликом
      bottom.appendChild(osBagElement);
      osBagElement.addEventListener("click", function() {this.classList.toggle("active")}, { once: true });
      osBagElement.click();
    }, 100);
  }

  // **
  function showHideFilters() {
    const filter = this.parentElement;
    const filterBottom = this.nextElementSibling;
    const filterBottomHeight = filterBottom.scrollHeight;

    filter.classList.toggle("filter--show");
    filterBottom.style.height = filterBottomHeight + "px";

    if (!filter.classList.contains("filter--show")) {
      filterBottom.style.height = "";
    }

    fixOSBag(filterBottom);
  }

  // **
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
  // **
  v.$sidebarFilterTops.forEach(el => {
    el.addEventListener("click", showHideFilters);
  });


  // ==== CLOSE FILTER SIDEBAR (ON SMALL DISPLAYS) ==== //
  // F(S)
  function closeFilterSidebar() {
    v.$sidebarFiltersButton.click();
    document.body.classList.remove("overflow-hidden");
  }

  // L(s) 
  v.$sidebarFiltersWrapperClose.addEventListener("click", closeFilterSidebar);
}