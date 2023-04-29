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
  const prevFilterMap = new Map();
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
  function resetSlider() {
    filterPriceSlider.reset();
    changeInputsValues();
  }

  // **
  function deleteBtn() {
    const categoryText = this.innerText;
    const checkedCheckboxes = filterWrapper.querySelectorAll(".custom-checkbox--checked");

    if (categoryText.startsWith("Price")) {
      resetSlider();
      filterMap.delete("price");
    }

    for (let i = 0; i < checkedCheckboxes.length; i++) {
      if (checkedCheckboxes[i].nextElementSibling.innerText === categoryText) {
        checkedCheckboxes[i].click();
        break;
      }
    }

    filterMap.delete(categoryText);




    this.remove();
    if (ul.children.length <= 1) {
      ul.classList.add("active-filters--invisible");
    }





    prevFilterMap.clear();
    for (let filter of filterMap) {
      prevFilterMap.set(filter[0], filter[1]);
    }




    toggleShowButton();
  }

  // **
  function toggleShowButton() {
    filterWrapper.classList.toggle("sidebar-filters__wrapper--confirm", prevFilterMap.size || filterMap.size);
  }

  // **
  function addFilterInArray(text, name = text) {
    text = text.trim();
    name = name.trim();

    if (filterMap.has(text)) {
      filterMap.delete(text);
      return;
    }

    filterMap.set(name, text);
  }

  // **
  function makeColorActive(elem) {
    elem.classList.toggle("colors__button--active");
  }

  function makeColorInactive(elem) {
    elem.classList.remove("colors__button--active");
  }

  // **
  function addInBreadcrumbs() {
    if (!isUlExist) {
      ul = document.createElement("ul");
      ul.className = "breadcrumbs__active-filters active-filters";
      breadcrumbsContainer.appendChild(ul);
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
          <li class="active-filters__item active-filters__btn--regular">
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
    ul.classList.remove("active-filters--invisible");

    const regularBtns = ul.querySelectorAll(".active-filters__btn--regular");
    regularBtns.forEach(el => {
      el.addEventListener("click", deleteBtn, { once: true });
    });


    prevFilterMap.clear();
    for (let filter of filterMap) {
      prevFilterMap.set(filter[0], filter[1]);
    }

    toggleShowButton();
  }

  // ***
  function initPrice() {
    const prevPriceArray = filterPriceSlider.get();
    prevPrice = `Price: ${~~prevPriceArray[0]} - ${~~prevPriceArray[1]}`;
  }
  initPrice();

  // ***
  function getPrice() {
    console.log('h2')

    const currentPriceArray = filterPriceSlider.get();
    const currentPrice = "Price" + ` ${~~currentPriceArray[0]} - ${~~currentPriceArray[1]}`;

    if (prevPrice !== currentPrice) {
      addFilterInArray(currentPrice, "price");

    } else {
      filterMap.delete("price");
    }

    toggleShowButton();
  }

  // ***
  function getCategories(e) {
    if (e.target.classList.contains("filter__color-btn")) {
      makeColorActive(e.target);
      addFilterInArray(e.target.dataset.color);

    } else if (e.target.classList.contains("filter__checkbox")) {
      const filterCheckbox = e.target;
      const filterName = filterCheckbox.nextElementSibling.textContent;
      addFilterInArray(filterName);
    }

    toggleShowButton();
  }

  // L(s)
  //**
  v.$sidebarFiltersFilters.forEach(el => {
    el.addEventListener("click", getCategories);
  });

  // **
  sidebarFiltersShowBtn.addEventListener("click", addInBreadcrumbs);

  filterPriceSlider.on("update", () => {
    console.log(isTwo)
    isTwo++; // (2 inits from the start)
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

