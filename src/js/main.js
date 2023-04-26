import * as v from "./vars";

// Components
import "./components/custom-select";
import "./components/special-offers";
import "./components/timer";
import "./components/custom-checkbox";
import "./components/subscribe__categories";
import "./components/menu-btn";
import "./components/megamenu";
import "./components/login";
import "./components/top-nav";
import "./components/product__bottom";
import "./components/microslider";
import "./components/filter";
import "./components/input-number";
import "./components/tool-pag";

// Components multiple in one
import "./components/$swipers";
import "./components/$overlayScrollbars";


// Filter price slider
import noUiSlider from "nouislider";

if (v.$filterSliderRange) {
  const filterPriceSlider = noUiSlider.create(v.$filterSliderRange, {
    start: [480, 800],
    connect: true,
    range: {
      'min': 0,
      'max': 1000
    },
    step: 1,
    tooltips: {
      to: function (value) {
        return "$" + parseInt(value);
      },
      from: function (value) {
        return "$" + parseInt(value);
      }
    }
  });

  // F(s)
  // **
  function changeInputsValues() {
    const rangeValues = filterPriceSlider.get();

    v.$filterSliderInputs.forEach((el, idx) => {
      el.value = parseInt(rangeValues[idx]);
    });
  }
  changeInputsValues();

  // **
  function changeRangeValues(idx) {
    const currentInputValue = ~~v.$filterSliderInputs[idx].value;
    filterPriceSlider.setHandle(idx, currentInputValue);
  }

  // L(s)
  // **
  filterPriceSlider.on("slide", changeInputsValues);

  // **
  v.$filterSliderInputs.forEach((el, idx) => {
    el.addEventListener("keyup", () => changeRangeValues(idx));
  });
}


// Scroll-top
const scrollTop = document.querySelector(".scroll-top");

// F(s)
function showScrollTop() {
  scrollTop.classList.toggle("scroll-top--active", window.pageYOffset > 250);
}

function scrollToTop() {
  window.scrollTo(0, 0);
}

// L(s)
window.addEventListener("scroll", showScrollTop);
scrollTop.addEventListener("click", scrollToTop);