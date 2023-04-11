import Swiper, {Navigation} from 'swiper';

// SALE SWIPER
const saleSwiper = new Swiper("#sale-slider", {
  modules: [Navigation],
  slidesPerView: 1,
  spaceBetween: 20,
  loop: true,
  navigation: {
    nextEl: '#sale-button-next',
    prevEl: '#sale-button-prev',
  },
   breakpoints: {
    900: {
      slidesPerView: 3,
      spaceBetween: 30,
    },
    768: {
      slidesPerView: 3,
      spaceBetween: 30,
    },
    480: {
      slidesPerView: 2,
      spaceBetween: 20,
    }
   }
});

// HOVER EFFECT FOR SHOWING PRODUCT__BOTTOM 
let products = document.querySelectorAll(".sale__product");
let saleSlider = document.querySelector(".sale__slider");

const marginForBoxShadow = 80; // window.getComputedStyle(products[0]).getPropertyValue("margin-bottom");

window.onresize = () => { 
  setTimeout(() => { // Чтобы swiper успел прогрузить свой js
    products = document.querySelectorAll(".sale__product");
    saleSlider = document.querySelector(".sale__slider");

    products.forEach(product => {
      product.removeEventListener("mouseenter", showProductBottom);
      product.removeEventListener("mouseleave", hideProductBottom);
    });

    products.forEach(product => {
      product.addEventListener("mouseenter", showProductBottom);
      product.addEventListener("mouseleave", hideProductBottom);
    });
  }, 50);
}

// Functions
function showProductBottom() {
  const productBottom = this.querySelector(".product__bottom");
  productBottom.classList.add("product__bottom--visible");
  const productBottomHeight = productBottom.getBoundingClientRect().height;

  const saleSliderMargin = window.getComputedStyle(saleSlider).getPropertyValue("margin-bottom");
  saleSlider.style.marginBottom = parseFloat(saleSliderMargin) - marginForBoxShadow - productBottomHeight + "px";
}

function hideProductBottom() {
  this.querySelector(".product__bottom").classList.remove("product__bottom--visible");
  saleSlider.style.marginBottom = "";
}

// Listeners
products.forEach(product => {
  product.addEventListener("mouseenter", showProductBottom);
  product.addEventListener("mouseleave", hideProductBottom);
});


