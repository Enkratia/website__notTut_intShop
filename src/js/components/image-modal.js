import * as v from "../vars.js";
import * as sw from "./$swipers.js";

// F(s)
// **
function hideImageModal() {
  v.$imageModal.classList.remove("image-modal--show");
}

// **
function showImageModal(e) {
  const slide = e.target.closest(".pcs__slide");

  if (slide) {
    // const idx = slide.getAttribute("data-swiper-slide-index");
    // $imageModalSwiper.slideToLoop(+idx);

    // setTimeout(() => {
      v.$imageModal.classList.add("image-modal--show");
    // }, 250);
  }
}

// L(s)
// **
v.$productCardSwiper.addEventListener("click", showImageModal);

// **
v.$imageModalClose.addEventListener("click", hideImageModal);

function changeIMCurrentSlide() {
  const activeSlide = v.$productCardSwiper.querySelector(".swiper-slide-active");
  console.log(activeSlide)
  const currentIdx = activeSlide.getAttribute("data-swiper-slide-index");

  sw.$imageModalSwiper.slideToLoop(+currentIdx);
}

sw.$productCardSwiper.on("slideChange", changeIMCurrentSlide);