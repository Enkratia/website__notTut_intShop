import Swiper, {Navigation} from 'swiper';

// SALE SWIPER
const saleSwiper = new Swiper("#sale-slider", {
  modules: [Navigation],
  slidesPerView: 1,
  spaceBetween: 20,
  loop: true,
  on: {
    init: addListeners,
  },
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

// Functions
function chooseImage() {
  let currentIdx = 0;

  return function(e) {
    const image = this.querySelector("#microslider-image");
    const srcs = this.querySelectorAll(".microslider__src");
  
    if (e.target.closest(".microslider__button--left")) {
      currentIdx -= 1;
      
      if (currentIdx < 0) {
        currentIdx = srcs.length -1;
        image.src = srcs[currentIdx].dataset.src;
        return;
      }
      
      image.src = srcs[currentIdx].dataset.src;
      
    } else if (e.target.closest(".microslider__button--right")) {
      currentIdx += 1;
      
      if (currentIdx > srcs.length - 1) {
        currentIdx = 0;
        image.src = srcs[currentIdx].dataset.src;
        return;
      }
      
      image.src = srcs[currentIdx].dataset.src;
    }
  }
}

// Listeners
function addListeners() {
  const looks = document.querySelectorAll(".sale .product__look");

  looks.forEach(look => {
    console.log(look)
    look.addEventListener("click", chooseImage());
  });
}


// HOVER EFFECT FOR SHOWING PRODUCT__BOTTOM 
let saleSlider = document.querySelector(".sale__slider"); // Не добавлять в vars
let products = saleSlider.querySelectorAll(".sale__product"); // Не добавлять в vars

const marginForBoxShadow = 80; // window.getComputedStyle(products[0]).getPropertyValue("margin-bottom");

window.onresize = () => { 
  setTimeout(() => { // Чтобы swiper успел прогрузить свой js
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

