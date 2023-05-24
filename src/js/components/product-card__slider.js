import * as v from "../vars.js";
import * as sw from "./$swipers.js";

if (v.$pcmSwiper) {

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
      sw.$productCardSwiper.slideToLoop(slideIdx);

      rearrangeActiveClass(slide);
    }
  }

  // L(s)
  v.$pcmSwiper.addEventListener("click", transferImage);
}
