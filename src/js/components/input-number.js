import * as v from "../vars.js";
import * as cb from "./colors__button.js";
export {changeInputValueWithBtn as $changeInputValueWithBtn, changeInputValue as $changeInputValue}

let newValue;

// F(s)
// **
function changeCartInputsValue(elem, newValue, isZeroNeeded) {
  const cartItem = elem.closest("[data-cartIdx]");
  const cartIdx = cartItem.getAttribute("data-cartIdx");

  const cartArray = JSON.parse(localStorage.getItem("cartArray"));
  cartArray[cartIdx].count = newValue || 0;
  localStorage.setItem("cartArray", JSON.stringify(cartArray));

  const sameInputs = document.querySelectorAll(`[data-cartIdx="${cartIdx}"] .input-number__input`);
  sameInputs.forEach(el => {
    if (isZeroNeeded) {
      el.value = newValue || 0;
    } else {
      el.value = newValue;
    }
  });
}

// **
function changeInputValue(e) {
  cb.$rechargeProductButton(this);

  if (e.key === "PageUp" || e.key === "ArrowUp") {
    if (this.value > 998) return;

    newValue = parseInt(this.value) + 1;

    if (this.classList.contains("choice-product__input-number-input")) {
      changeCartInputsValue(this, newValue, true);

    } else {
      v.$inputNumberInputs.forEach(el => {
        el.value = newValue || 0;
      });
    }

    return;
  }

  if ((e.key === "PageDown" || e.key === "ArrowDown")) {

    if (this.value < 1 && this.value) return;

    newValue = parseInt(this.value) - 1;

    if (this.classList.contains("choice-product__input-number-input")) {
      changeCartInputsValue(this, newValue, true);

    } else {
      v.$inputNumberInputs.forEach(el => {
        el.value = newValue || 0;
      });
    }

    return;
  }

  if (!this.value.match(/^\d*$/)) {
    newValue = this.value.replace(/\D/g, "");

    if (this.classList.contains("choice-product__input-number-input")) {
      changeCartInputsValue(this, newValue, false);

    } else {
      v.$inputNumberInputs.forEach(el => {
        el.value = newValue;
      });
    }

  } else {
    newValue = this.value;

    if (this.classList.contains("choice-product__input-number-input")) {
      changeCartInputsValue(this, newValue, false);

    } else {
      v.$inputNumberInputs.forEach(el => {
        el.value = newValue;
      });
    }
  }
}

// **
function changeInputValueWithBtn() {
  cb.$rechargeProductButton(this);
  const input = this.parentElement.previousElementSibling;

  if (this.classList.contains("input-number__btn--upper")) {
    if (input.value > 998) return;
    newValue = parseInt(input.value) + 1;

    if (this.parentElement.classList.contains("choice-product__btns")) {
      changeCartInputsValue(this, newValue, true);


    } else {
      v.$inputNumberInputs.forEach(el => {
        el.value = newValue || 0;
      });
    }

  } else {
    if (input.value < 1 && input.value) return;
    newValue = parseInt(input.value) - 1;

    if (this.parentElement.classList.contains("choice-product__btns")) {
      changeCartInputsValue(this, newValue, true);


    } else {
      v.$inputNumberInputs.forEach(el => {
        el.value = newValue || 0;
      });
    }
  }
}

// L(s)
// **
v.$inputNumberInputs.forEach(el => {
  el.addEventListener("keyup", changeInputValue);
});

// **
v.$inputNumberBtns.forEach(el => {
  el.addEventListener("click", changeInputValueWithBtn);
});