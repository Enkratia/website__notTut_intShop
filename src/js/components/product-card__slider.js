import * as v from "../vars.js";
import Swiper, { Navigation } from 'swiper';

if (v.$pcmSwiper) {

  // ==== PRODUCT CARD SLIDER SWIPER ==== //
  const productCardSwiper = new Swiper("#product-card-swiper", {
    modules: [Navigation],
    loop: true,
    slidesPerView: 1,
    spaceBetween: 30,
    navigation: {
      nextEl: '#pcs-button-next',
      prevEl: '#pcs-button-prev',
    }
  });

  // ==== PRODUCT CARD MINISLIDER SWIPER ==== //
  const productCardMiniSwiper = new Swiper("#pcm-swiper", {
    slidesPerView: 5,
    spaceBetween: 20,
  });

  // ==== PRODUCT CARD TRANSFER IMAGE ==== //
  // F(s)
  // **
  function rearrangeActiveClass(elem) {
    v.$pcmSwiper.querySelector(".pcm__slide--active").classList.remove("pcm__slide--active");
    elem.classList.add("pcm__slide--active");
  }

  // **
  function transferImage(e) {
    const slide = e.target.closest(".pcm__slide");

    if (slide) {
      const slideIdx = slide.getAttribute("data-slide-idx");
      productCardSwiper.slideToLoop(slideIdx);

      rearrangeActiveClass(slide);
    }
  }

  // L(s)
  v.$pcmSwiper.addEventListener("click", transferImage);
}