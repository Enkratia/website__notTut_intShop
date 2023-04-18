import * as v from "../vars";

let count = 0;

function removeVisibleClass() {
  document.querySelector(".marketing-slider__slide--visible").classList.remove("marketing-slider__slide--visible");
}

function addVisibleClass(elem) {
  return elem.classList.add("marketing-slider__slide--visible");
}

function changeSlide(e) {
  const itemsAmount = v.$marketingSliderItems.length;

  if (e.target.tagName === "BUTTON") {
    if (e.target.classList.contains("marketing-slider__btn--left")) {
      if (count <= 0) {
        removeVisibleClass();
        addVisibleClass(v.$marketingSliderItems[itemsAmount - 1]);
        count = itemsAmount - 1;
        return;
      }

      count -= 1;
      
      removeVisibleClass();
      addVisibleClass(v.$marketingSliderItems[count]);

    } else {
      if (count >= itemsAmount - 1) {
        removeVisibleClass();
        addVisibleClass(v.$marketingSliderItems[0]);
        count = 0;
        return;
      }

      count += 1;

      removeVisibleClass();
      addVisibleClass(v.$marketingSliderItems[count]);
    }
  }
}

v.$marketingSlider.addEventListener("click", changeSlide);