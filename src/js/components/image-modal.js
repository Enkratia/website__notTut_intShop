import * as v from "../vars.js";
import * as sw from "./$swipers.js";

let isInit = true;

// ==== SHOW MODAL-IMAGE / SLIDE MODAL-IMAGE ==== //
// F(s)
// **
function writeSlideCount(current = undefined) {
  v.$imageModalCountCurrent.innerText = current ?? "1";

  if (isInit) {
    const totalSlides = v.$imageModal.querySelectorAll(".swiper-slide:not(.swiper-slide-duplicate)").length;
    v.$imageModalCountTotal.innerText = totalSlides;
    isInit = false;
  }
}
writeSlideCount();

// **
function changeCurrentSlide() {
  const currentIdx = this.realIndex;
  sw.$imageModalSwiper.slideToLoop(currentIdx);

  writeSlideCount(currentIdx + 1);
}

// **
function hideImageModal() {
  v.$imageModal.classList.remove("image-modal--show");
}

// **
function showImageModal(e) {
  const slide = e.target.closest(".pcs__slide");

  if (slide) {
    v.$imageModal.classList.add("image-modal--show");
  }
}

// L(s)
// **
v.$productCardSwiper.addEventListener("click", showImageModal);

// **
v.$imageModalClose.addEventListener("click", hideImageModal);

// **
sw.$productCardSwiper.on("slideChange", changeCurrentSlide);
sw.$imageModalSwiper.on("slideChange", changeCurrentSlide);


// ===== ZOOM IN ===== //
const scale = 2;

// F(s)
function zoomInImage(e) {
  const image = e.target.closest(".image-modal__image");

  if (image) {
    const wrapper = image.parentElement;
    const top = wrapper.getBoundingClientRect().top;
    const width = wrapper.getBoundingClientRect().width;
    const height = wrapper.getBoundingClientRect().height;
    const left = wrapper.getBoundingClientRect().left;

    // const coeff = width * scale / ((width * scale - width) / 2);

    let offsetX;
    let offsetY;

    const centerX = left + width / 2;
    const centerY = top + height / 2;

    image.addEventListener("mousemove", moveImage);
    image.addEventListener("mouseleave", resetImagePosition);

    // **
    function resetImagePosition() {
      image.removeEventListener("mousemove", moveImage, { once: true });
      image.style.transform = "scale(1)";
    }

    // **
    function moveImage(e) {

      if (e.pageX > centerX) {
        offsetX = (centerX - e.clientX) / (width / 2) * 100;
      } else {
        offsetX = 100 - ((e.clientX - left) / (width / 2) * 100);
      }

      if (e.pageY > centerY) {
        offsetY = (centerY - e.clientY) / (height / 2) * 100;
      } else {
        offsetY = 100 - ((e.clientY - top) / (height / 2) * 100);
      }
      
      image.style.transform = `scale(${scale}) translate(${offsetX / 4}%, ${offsetY / 4}%)`;
    }
  }
}

// L(s)
v.$imageModal.addEventListener("mouseover", zoomInImage);