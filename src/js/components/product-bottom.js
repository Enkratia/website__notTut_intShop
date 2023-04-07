/* Hover effect on sale__product */
const products = document.querySelectorAll(".sale__product");

// Functions
function showProductBottom(product) {
  const productBottom = product.querySelector(".product__bottom");
  productBottom.classList.add("product__bottom--visible");

  const productBottomHeight = product.querySelector(".product__bottom").offsetHeight;
  const saleSlider = document.querySelector(".sale__slider");
  const saleSliderMargin = window.getComputedStyle(saleSlider).getPropertyValue("margin-bottom");
  
  saleSlider.style.marginBottom = parseInt(saleSliderMargin) - productBottomHeight + "px";

  product.addEventListener("mouseleave", () => hideProductBottom(product, productBottom, saleSlider, saleSliderMargin));
}

function hideProductBottom (product, productBottom, saleSlider, saleSliderMargin) {
  productBottom.classList.remove("product__bottom--visible");
  saleSlider.style.marginBottom = saleSliderMargin;

  product.removeEventListener("mouseleave", () => hideProductBottom(product, productBottom, saleSlider, saleSliderMargin));
}

// Listener
products.forEach(product => {
  product.addEventListener("mouseenter", () => showProductBottom(product));
});
