import * as v from "../vars.js";

const favoriteArray = JSON.parse(localStorage.getItem("favoriteArray")) ?? [];
let favoriteCount;

// F(s)
// **
function markFavoriteProduct(elem, elemVendorCode) {
  if (v.$saleSlider) { // Check for existing whole main page
    const swiperWrapper = elem.closest(".swiper-wrapper");
    const products = swiperWrapper.querySelectorAll("[data-vendor]");

    products.forEach(el => {
      const productsVendorCode = el.getAttribute("data-vendor");

      if (elemVendorCode === productsVendorCode) {
        const productFavoriteBtn = el.querySelector(".product__favorite");
        productFavoriteBtn.classList.toggle("product__favorite--active");
      }
    });

  } else {
    elem.classList.toggle("product__favorite--active");
  }
}

// **
function markFavoriteProductsInit() {
  const favoriteProducts = document.querySelectorAll("[data-vendor");

  favoriteProducts.forEach(el => {
    const vendorCode = el.getAttribute("data-vendor");

    if (favoriteArray.includes(vendorCode)) {
      const productFavoriteBtn = el.querySelector(".product__favorite");
      productFavoriteBtn.classList.add("product__favorite--active");
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
const productFavoriteBtns = document.querySelectorAll(".product__favorite")
productFavoriteBtns.forEach(el => {
  el.addEventListener("click", addToFavorite);
});
