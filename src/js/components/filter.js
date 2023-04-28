import * as v from "../vars";
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
  const filterMap = new Map();
  let ul;
  let prevPrice;
  let isUlExist = false;
  let isTwo = 0;

  const filterWrapper = document.querySelector(".sidebar-filters__wrapper"); // add to vars
  const sidebarFiltersShowBtn = filterWrapper.querySelector(".sidebar-filters__show"); // add to vars
  const breadcrumbsContainer = document.querySelector(".breadcrumbs__container"); // add to vars

  // F(s)
  // **
  function confirmChoice() {

  }

  // **
  function activateShowButton() {
    filterWrapper.classList.toggle("sidebar-filters__wrapper--confirm", filterMap.size);
  }

  // **
  function addFilterInArray(text, name = text) {
    text = text.trim();
    name = name.trim();

    if (filterMap.has(text)) {
      filterMap.delete(text);
      console.log(filterMap);
      return;
    }

    filterMap.set(name, text);
    console.log(filterMap);
  }

  // **
  function makeColorActive() {
    elem.classList.toggle("colors__button--active");
  }

  // **
  function addInBreadcrumbs() {
    if (!isUlExist) {
      ul = document.createElement("ul");
      ul.className = "breadcrumbs__active-filters active-filters";
      breadcrumbsContainer.appendChild(ul);
      isUlExist = true;
    }

    let liTags = "";
    let clearAllTag = `
    <li class="active-filters__item">
        <label class="active-filters__label active-filters__label--active">
          <button class="active-filters__btn" aria-label="Delete all filters.">
            <svg xmlns='http://www.w3.org/2000/svg' aria-hidden="true">
              <use href='./img/sprite.svg#cross' aria-hidden="true"></use>
            </svg>
          </button>
  
          <span class="active-filters__name">
            Clear all
          </span>
        </label>
      </li>
    `;

    filterMap.forEach(el => {
      liTags += `
        <li class="active-filters__item">
          <label class="active-filters__label">
            <button class="active-filters__btn" aria-label="Delete this filter.">
              <svg xmlns='http://www.w3.org/2000/svg' aria-hidden="true">
               <use href='./img/sprite.svg#cross' aria-hidden="true"></use>
              </svg>
            </button>

            <span class="active-filters__name">
             ${el}
            </span>
          </label>
        </li>`;
    });

    liTags += clearAllTag;
    ul.innerHTML = liTags;
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
    const currentPrice = "Price" + ` ${~~currentPriceArray[0]} - ${~~currentPriceArray[1]}`;

    if (prevPrice !== currentPrice) {
      addFilterInArray(currentPrice, "price");

    } else {
      filterMap.delete("price");
    }

    activateShowButton();
  }

  // ***
  function getCategories(e) {
    if (e.target.classList.contains("filter__color-btn")) {
      makeColorActive(e.target);
      addFilterInArray(e.target.dataset.color);

    } else if (e.target.closest(".filter__label") && e.target.tagName !== "INPUT") {
      const filterLabel = e.target.closest(".filter__label");
      const filterName = filterLabel.querySelector(".filter__name").textContent;
      addFilterInArray(filterName);
    }

    activateShowButton();
  }

  // L(s)
  //**
  v.$sidebarFiltersFilters.forEach(el => {
    el.addEventListener("click", getCategories);
  });

  // **
  sidebarFiltersShowBtn.addEventListener("click", addInBreadcrumbs);

  filterPriceSlider.on("update", () => {
    isTwo++; // (2 inits from start)
    if (isTwo <= 2) return;
    getPrice();
  });

  // ==== SHOW-HIDE FILTERS (ACCORDION) ==== //
  // F(s)
  // **
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

  // **
  function showHideFiltersInit() {
    const activeFilter = document.querySelector(".filter--show");
    const activeFilterBottom = activeFilter.querySelector(".filter__bottom");

    if (activeFilter) {
      const activeFilterBottomHeight = activeFilterBottom.scrollHeight;
      activeFilterBottom.style.height = activeFilterBottomHeight + "px";
    }
  }
  showHideFiltersInit(this);

  // L(s)
  // **
  v.$sidebarFilterTops.forEach(el => {
    el.addEventListener("click", showHideFilters);
  });
}

