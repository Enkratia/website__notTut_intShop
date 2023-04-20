let saleSlider = document.querySelector(".sale__slider"); // (Не убирать в vars)

if (saleSlider) {
  let products = saleSlider.querySelectorAll(".sale__product"); // (Не убирать в vars)
  const marginForBoxShadow = 80; // (Тоже самое: window.getComputedStyle(products[0]).getPropertyValue("margin-bottom"))

  // F(s)
  // **
  function showProductBottom() {
    const productBottom = this.querySelector(".product__bottom");
    productBottom.classList.add("product__bottom--visible");
    const productBottomHeight = productBottom.getBoundingClientRect().height;

    const saleSliderMargin = window.getComputedStyle(saleSlider).getPropertyValue("margin-bottom");
    saleSlider.style.marginBottom = parseFloat(saleSliderMargin) - marginForBoxShadow - productBottomHeight + "px";
  }

  // **
  function hideProductBottom() {
    this.querySelector(".product__bottom").classList.remove("product__bottom--visible");
    saleSlider.style.marginBottom = "";
  }

  // L(s)
  // **
  products.forEach(product => {
    product.addEventListener("mouseenter", showProductBottom);
    product.addEventListener("mouseleave", hideProductBottom);
  });

  // **
  window.addEventListener("resize", () => {
    setTimeout(() => { // (Чтобы swiper успел прогрузить свой js)
      saleSlider = document.querySelector(".sale__slider");
      products = saleSlider.querySelectorAll(".sale__product");

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