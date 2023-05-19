let slider;
let products;
const marginForBoxShadow = 80; // (Тоже самое, что: window.getComputedStyle(products[0]).getPropertyValue("margin-bottom"))

if (document.querySelector(".swiper-slider")) {

  // F(s)
  // **
  function showProductBottom() {
    slider = this.closest(".swiper-slider");
    const productBottom = this.querySelector(".product__bottom");
    productBottom.classList.add("product__bottom--visible");
    const productBottomHeight = productBottom.getBoundingClientRect().height;

    const sliderMargin = window.getComputedStyle(slider).getPropertyValue("margin-bottom");
    console.log(sliderMargin)
    console.log(parseFloat(sliderMargin), marginForBoxShadow, productBottomHeight)
    slider.style.marginBottom = parseFloat(sliderMargin) - marginForBoxShadow - productBottomHeight + "px";
  }

  // **
  function hideProductBottom() {
    this.querySelector(".product__bottom").classList.remove("product__bottom--visible");
    slider.style.marginBottom = "";
  }

  // L(s)
  // **
  function addListeners() {
    products = document.querySelectorAll(".swiper-wrapper .product");

    products.forEach(product => {
      product.addEventListener("mouseenter", showProductBottom);
      product.addEventListener("mouseleave", hideProductBottom);
    });
  }

  setTimeout(() => { // (Чтобы swiper успел прогрузить свой js)
    addListeners();
  }, 50);

  // **
  window.addEventListener("resize", () => {
    setTimeout(() => { // (Чтобы swiper успел прогрузить свой js)
      products = document.querySelectorAll(".swiper-wrapper .product");

      products.forEach(product => {
        product.removeEventListener("mouseenter", showProductBottom);
        product.removeEventListener("mouseleave", hideProductBottom);
      });

      products.forEach(product => {
        product.addEventListener("mouseenter", showProductBottom);
        product.addEventListener("mouseleave", hideProductBottom);
      });
    }, 50);
  });
}