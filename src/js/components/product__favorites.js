import * as v from "../vars.js";
export { markFavoriteProductsInit as $markFavoriteProductsInit, addToFavorite as $addToFavorite }

const favoriteArray = JSON.parse(localStorage.getItem("favoriteArray")) ?? [];
let favoriteCount;
let productFavoriteBtns;

// F(s)
// **
function toggleActiveClass(elem) {
  const productFavoriteBtn = elem.querySelector(".product__favorite");
  productFavoriteBtn.classList.toggle("product__favorite--active");
}

// **
function markFavoriteProduct(elem, elemVendorCode) {
  const swiperWrapper = elem.closest(".swiper-wrapper");

  if (swiperWrapper) { // Check for swiper parent
    const products = swiperWrapper.querySelectorAll("[data-vendor]");

    products.forEach(el => {
      const productsVendorCode = el.getAttribute("data-vendor");

      if (elemVendorCode === productsVendorCode) {
        toggleActiveClass(el)
      }
    });

  } else {
    const sameProducts = document.querySelectorAll(`[data-vendor="${elemVendorCode}"]`);

    sameProducts.forEach(el => {
      toggleActiveClass(el)
    });
  }
}

// ***
function markFavoriteProductsInit(cartLiElements = undefined) {
  const favoriteProducts = cartLiElements ?? document.querySelectorAll("[data-vendor]");

  favoriteProducts.forEach(el => {
    const vendorCode = el.getAttribute("data-vendor");

    if (favoriteArray.includes(vendorCode)) {
      toggleActiveClass(el)
    }
  });
}
markFavoriteProductsInit();

// **
function writeTheCount() {
  favoriteCount = favoriteArray.length;
  v.$headerFavoriteCount.innerText = favoriteArray.length;
  v.$headerFavoriteCount.classList.toggle("favorite__count--show", favoriteCount > 0);
}
writeTheCount();

// **
function setToStorage() {
  localStorage.setItem("favoriteArray", JSON.stringify(favoriteArray));
}

// ***
function addToFavorite() {
  const vendorElement = this.closest("[data-vendor]");
  const thisVendorCode = vendorElement.getAttribute("data-vendor");

  markFavoriteProduct(this, thisVendorCode)

  if (favoriteArray.includes(thisVendorCode)) {
    const vendorCodeIdx = favoriteArray.indexOf(thisVendorCode);
    favoriteArray.splice(vendorCodeIdx, 1);

    setToStorage();
    writeTheCount();

    return;
  };

  favoriteArray.push(thisVendorCode);
  v.$headerFavoriteCount.innerText = favoriteArray.length;

  setToStorage();
  writeTheCount();
}

// L(s)
setTimeout(() => { // Wait swiper js
  productFavoriteBtns = document.querySelectorAll(".product__favorite");

  productFavoriteBtns.forEach(el => {
    el.addEventListener("click", addToFavorite);
  });
}, 50);

window.addEventListener("resize", () => {
  setTimeout(() => { // Wait swiper js
    productFavoriteBtns = document.querySelectorAll(".swiper-wrapper .product__favorite");

    productFavoriteBtns.forEach(el => {
      el.addEventListener("click", addToFavorite);
    });
  }, 50);
});