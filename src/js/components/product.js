// HOVER EFFECT FOR SHOWING PRODUCT__BOTTOM 
const products = document.querySelectorAll(".sale__product");

const marginForBoxShadow = 80; // window.getComputedStyle(products[0]).getPropertyValue("margin-bottom");

// Functions
function showProductBottom(product) {
  const productBottom = product.querySelector(".product__bottom");
  productBottom.classList.add("product__bottom--visible");

  const productBottomHeight = product.querySelector(".product__bottom").offsetHeight;
  const saleSlider = document.querySelector(".sale__slider");
  const saleSliderMargin = window.getComputedStyle(saleSlider).getPropertyValue("margin-bottom");
  
  saleSlider.style.marginBottom = parseInt(saleSliderMargin) - marginForBoxShadow - productBottomHeight + "px";

  product.addEventListener("mouseleave", () => hideProductBottom(product, productBottom, saleSlider, saleSliderMargin));
}

function hideProductBottom (product, productBottom, saleSlider, saleSliderMargin) {
  productBottom.classList.remove("product__bottom--visible");
  saleSlider.style.marginBottom = saleSliderMargin;

  product.removeEventListener("mouseleave", () => hideProductBottom(product, productBottom, saleSlider, saleSliderMargin));
}

// Listeners
products.forEach(product => {
  product.addEventListener("mouseenter", () => showProductBottom(product));
});

// MICROSLIDER
const looks = document.querySelectorAll(".sale .product__look");
let currentIdx = 0;

// Functions
function chooseImage(e) {
  const image = this.querySelector("#microslider-image");
  const srcs = this.querySelectorAll(".microslider__src");

  if (e.target.closest(".microslider__button--left")) {
    if (currentIdx < 1) {
      currentIdx = srcs.length - 1;
      image.src = srcs[currentIdx].dataset.src;
      return;
    }
    
    currentIdx -= 1;
    image.src = srcs[currentIdx].dataset.src;
    
  } else if (e.target.closest(".microslider__button--right")) {
    if (currentIdx >= srcs.length - 1) {
      currentIdx = 0;
      image.src = srcs[currentIdx].dataset.src;
      return;
    }

    currentIdx += 1;
    image.src = srcs[currentIdx].dataset.src;
  }
}

// Listeners
looks.forEach(look => {
  look.addEventListener("click", chooseImage);
});
