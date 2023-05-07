// Header
export const $headerTopContainer = document.querySelector("#header-top-container");
export const $topNavBtn = document.querySelector("#top-nav-button");
export const $customSelects = document.querySelectorAll(".custom-select");
export const $login = document.querySelector("#login");

// **
export const $headerMainContainer = document.querySelector("#header-main-container");
export const $navList = $headerMainContainer.querySelector("#nav-list");
export const $navLinksAll = document.querySelectorAll(".nav__link");
export const $navItems = document.querySelectorAll(".nav__item");
export const $searchForm = $headerMainContainer.querySelector("#search-form");
export const $menuBtn = document.querySelector("#menu-btn");

// Special-offers
export const $marketingSlider = document.querySelector("#marketing-slider");
export const $marketingSliderItems = $marketingSlider?.querySelectorAll(".marketing-slider__slide");

// Sale + Product
export let $saleSlider = document.querySelector(".sale__slider");
export let $products = document.querySelectorAll(".sale__product");
export let $looks = document.querySelectorAll(".product__look");
export const $productColorsBtns = document.querySelectorAll(".product .colors__button");

// Timer
export const $timer = document.querySelector("#timer");
export const $counters = $timer?.querySelectorAll(".timer__count");

// Subscribe
export const $subscribeCategories = document.querySelector(".subscribe__categories");
export const $nativeCheckBoxes = $subscribeCategories?.querySelectorAll(".categories__btn-checkbox");
export const $customCheckboxes = document.querySelectorAll(".custom-checkbox");

// Breadcrumbs + Catalog
export const $breadcrumbsContainer = document.querySelector(".breadcrumbs__container");
export const $catalog = document.querySelector("#catalog");

// Toolbar
export const $toolPags = document.querySelectorAll(".tool-pag");
export const $toolPagsMini = document.querySelectorAll(".tool-pag-mini");
export const $toolbarSortSelects = document.querySelectorAll(".toolbar__sort-select");

// Input-number
export const $inputNumberInputs = document.querySelectorAll(".input-number__input");
export const $toolbarInputNumberInputs = document.querySelectorAll(".toolbar__input-number-input");
export const $inputNumberBtns = document.querySelectorAll(".input-number__btn");

// Sidebar
export const $sidebarFiltersButton = document.querySelector("#sidebar-filters__button");
export const $sidebarFiltersFilters = document.querySelectorAll(".sidebar-filters__filter");
export const $sidebarFilterTops = document.querySelectorAll(".sidebar-filters .filter__top");
export const $sidebarFilterLists = document.querySelectorAll(".sidebar-filters .filter__list");
export const $filterWrapper = document.querySelector(".sidebar-filters__wrapper");
export const $filterWrapperInner = document.querySelector(".sidebar-filters__wrapper-inner");
export const $filterSliderRange = document.querySelector("#filter-slider-range");
export const $filterSliderInputs = document.querySelectorAll(".filter__slider-input");
export const $sidebarFiltersShowBtn = $filterWrapper?.querySelector(".sidebar-filters__show");
export const $sidebarFiltersApplyBtn = $filterWrapper?.querySelector(".sidebar-filters__apply");
export const $sidebarFiltersWrapperClose = $filterWrapper?.querySelector(".sidebar-filters__wrapper-close");

// Media
export const $mdq767 = window.matchMedia("(max-width: 767px)");
export const $mdq768 = window.matchMedia("(min-width: 768px)");
export const $mdq875 = window.matchMedia("(max-width: 875px)");
export const $mdq991 = window.matchMedia("(max-width:991px)");
export const $mdq992 = window.matchMedia("(min-width:992px)");
export const $mdq1024 = window.matchMedia("(min-width: 1024px)");
export const $mdq1119 = window.matchMedia("(max-width: 1120px)");


