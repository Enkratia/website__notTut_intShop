
// Common //
export const $toolPags = document.querySelectorAll(".tool-pag");
export const $customRadios = document.querySelectorAll(".custom-radio");
export const $customSelects = document.querySelectorAll(".custom-select");

// Header
export const $header = document.querySelector("#header");
export const $headerTopContainer = $header.querySelector("#header-top-container");
export const $topNavBtn = $headerTopContainer.querySelector("#top-nav-button");
export const $login = $headerTopContainer.querySelector("#login");
export const $loginBtnIn = $headerTopContainer.querySelector("#login-btn-in");
export const $loginBtnRegister = $headerTopContainer.querySelector("#login-btn-register");
export const $logInModal = $header.querySelector("#log-in");
export const $logRegisterModal = $header.querySelector("#log-register");
export const $logClose = $header.querySelectorAll(".log__close");
export const $showPasswordBtns = $header.querySelectorAll(".log__show");


// **
export const $headerMainContainer = document.querySelector("#header-main-container");
export const $navList = $headerMainContainer.querySelector("#nav-list");
export const $navLinksAll = document.querySelectorAll(".nav__link");
export const $navItems = document.querySelectorAll(".nav__item");
export const $searchForm = $headerMainContainer.querySelector("#search-form");
export const $menuBtn = document.querySelector("#menu-btn");
export const $headerFavoriteCount = $headerMainContainer.querySelector(".favorite__count");

// **
export const $headerCartCount = $headerMainContainer.querySelector(".cart__count");
export const $cartBtn = $headerMainContainer.querySelector(".cart__btn");
export const $cartClose = $headerMainContainer.querySelector(".cart-choice__close");
export const $cartChoiceList = $headerMainContainer.querySelector(".cart-choice__list");
export const $cartChoiceTitleCount = $headerMainContainer.querySelector(".cart-choice__title-count");
export const $cartChoiceBottom = $headerMainContainer.querySelector(".cart-choice__bottom");
export const $cartChoiceSubtotalSum = $headerMainContainer.querySelector(".cart-choice__subtotal-sum");
export const $cartCheckoutBtn = $headerMainContainer.querySelector(".cart-choice__checkout");


// Special-offers
export const $marketingSlider = document.querySelector("#marketing-slider");
export const $marketingSliderItems = $marketingSlider?.querySelectorAll(".marketing-slider__slide");

// Sale + Product
export let $saleSlider = document.querySelector(".sale__slider");
export let $saleProducts = document.querySelectorAll(".sale__product");
export let $looks = document.querySelectorAll(".product__look");
export const $productColorsBtns = document.querySelectorAll(".product .colors__button");
export const $productFavoriteBtns = document.querySelectorAll(".product__favorite");

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

// Product-card
export const $productCard = document.querySelector(".product-card");
export const $productCardSwiper = document.querySelector("#product-card-swiper");
export const $pcmSwiper = document.querySelector("#pcm-swiper");
export const $productCardSizeBtn = document.querySelector(".product-card__size-btn");
export const $productCardChart = document.querySelector(".product-card__chart");
export const $chartClose = $productCardChart?.querySelector(".chart__close");
export const $productCardTabs = $productCard?.querySelectorAll(".tab");
export const $imageModal = $productCard?.querySelector(".product-card__image-modal");
export const $imageModalClose = $imageModal?.querySelector(".image-modal__close");
export const $imageModalCountCurrent = $imageModal?.querySelector(".image-modal__count-current");
export const $imageModalCountTotal = $imageModal?.querySelector(".image-modal__count-total");
export const $imageModalFullscreen = $imageModal?.querySelector(".image-modal__fullscreen");

// **
export const $reviewAssessBtns = $productCard?.querySelectorAll(".review__message-btn");
export const $replyBtns = $productCard?.querySelectorAll(".review__message-reply");

// **
export const $leaveReview = $productCard?.querySelector(".leave-review");
export const $leaveReviewBtn = $productCard?.querySelector(".tool-bar__btn");
export const $leaveReviewClose = $leaveReview?.querySelector(".leave-review__close");
export const $leaveReviewSubmit = $leaveReview?.querySelector(".leave-review__submit");
export const $downloadArea = $leaveReview?.querySelector(".download__area");
export const $downloadAreaDescr = $leaveReview?.querySelector(".download__area-descr");
export const $downloadBtn = $leaveReview?.querySelector(".download__area-btn");
export const $fileInput = $leaveReview?.querySelector(".download__area-btn-native");
export const $downloadingFiles = $leaveReview?.querySelector(".download__files");

// Checkout
export const $checkoutProducts = document.querySelector(".checkout__products");
export const $checkoutProductsList = $checkoutProducts?.querySelector(".checkout__products-list");
export const $checkoutProductsCount = $checkoutProducts?.querySelector(".checkout__products-subtotal-count");

// Account menu
export const $accountMenu = document.querySelector(".account-menu");
export const $accountMenuBtn = $accountMenu?.querySelector(".account-menu__btn");
export const $accountMenuLinks = $accountMenu?.querySelector(".account-menu__links");


// **
export const $checkoutSignIn = document.querySelector(".checkout .head__bottom-btn");
export const $checkoutMethod = document.querySelector(".checkout__method");
export const $checkoutTotals = document.querySelector(".checkout__totals");

// **
export const $checkoutOrderTotalSum = document.querySelector(".checkout__totals-total-sum");
export const $checkoutOrderSubtotal = document.querySelector("[data-totals='subtotal']");
export const $checkoutOrderDiscount = document.querySelector("[data-totals='discount']");
export const $checkoutCompleteBtn = document.querySelector(".checkout__complete");


// Media
export const $mdq767 = window.matchMedia("(max-width: 767px)");
export const $mdq768 = window.matchMedia("(min-width: 768px)");
export const $mdq875 = window.matchMedia("(max-width: 875px)");
export const $mdq991 = window.matchMedia("(max-width:991px)");
export const $mdq992 = window.matchMedia("(min-width:992px)");
export const $mdq1024 = window.matchMedia("(min-width: 1024px)");
export const $mdq1119 = window.matchMedia("(max-width: 1120px)");


