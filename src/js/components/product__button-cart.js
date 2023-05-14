import * as v from "../vars.js";

const cartArray = JSON.parse(localStorage.getItem("cartArray")) ?? [];
let cartProductsArray = [];
let cartProductsArrayTmp = [];

// F(s)
function setActiveClass(elem, elemVendorCode) {
  const swiperWrapper = elem.closest(".swiper-wrapper");

  if (swiperWrapper) { // Check for swiper parent
    const products = swiperWrapper.querySelectorAll("[data-vendor]");

    products.forEach(el => {
      const productsVendorCode = el.getAttribute("data-vendor");

      if (elemVendorCode === productsVendorCode) {
        const productFavoriteBtn = el.querySelector(".product__button-cart");
        productFavoriteBtn.classList.toggle("product__button-cart--active");
      }
    });

    return;
  }

  if (elem.classList.contains("product-card__btn-cart")) {
    elem.classList.add("product-card__btn-cart--active");
  } else {
    elem.classList.add("product__button-cart--active");
  }
}

// **
function writeTheCount() {
  v.$headerCartCount.innerText = cartArray.length;
  v.$headerCartCount.classList.toggle("cart__count--show", cartArray.length);
}
writeTheCount();

// ***
function addToCart() {
  const vendorElement = this.closest("[data-vendor]");
  const vendorCode = vendorElement.getAttribute("data-vendor");

  const dataObj = {
    imageSrc: vendorElement.querySelector(".pcs__image").getAttribute("src"),
    title: vendorElement.querySelector(".product-card__title").innerText,
    color: vendorElement.querySelector(".product-card__colors-item--name")?.innerText,
    size: vendorElement.querySelector(".product-card__sort-selected")?.innerText,
    count: vendorElement.querySelector(".input-number__input").value,
    price: vendorElement.querySelector(".product__price").innerText,
    oldPrice: vendorElement.querySelector(".product__old-price")?.innerText,
  }

  for (let elem in dataObj) {
    cartProductsArrayTmp.push(dataObj[elem]);
  }

  if (cartProductsArray.includes(cartProductsArrayTmp.toString())) return;

  cartProductsArray.push(cartProductsArrayTmp);

    console.log(cartProductsArray)
  



  // if (!cartArray.includes(vendorCode)) {
    cartArray.push(vendorCode);
    localStorage.setItem("cartArray", JSON.stringify(cartArray));
  
    setActiveClass(this, vendorCode);
    writeTheCount();
  // }
}

// L(s)
const productCartBtns = document.querySelectorAll(".product__button-cart"); // не убирать в vars
productCartBtns.forEach(el => {
  el.addEventListener("click", addToCart, {once: true});
});




  // const image = vendorElement.querySelector(".pcs__image");
  // const imageSrc = image.getAttribute("src");
  // const title = vendorElement.querySelector(".product-card__title").innerText;
  // const color = vendorElement.querySelector(".product-card__colors-item--name")?.innerText;
  // const size = vendorElement.querySelector(".product-card__sort-selected")?.innerText;
  // const count = vendorElement.querySelector(".input-number__input").value;
  // const price = vendorElement.querySelector(".product__price").innerText;
  // const oldPrice = vendorElement.querySelector(".product__old-price")?.innerText;