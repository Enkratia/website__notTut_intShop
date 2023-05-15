import * as v from "../vars.js";

let newValue;

// F(s)
// **
function rechargeProductButton() {
  const product = this.closest(".product-card");

  if (product) {
    const productButton = product.querySelector(".product__button-cart");
    productButton.classList.remove("product-card__btn-cart--active");
  }
}

// **
function changeInputValue(e) {

  if (e.key === "PageUp" || e.key === "ArrowUp") {
    if (this.value > 998) return;

    newValue = parseInt(this.value) + 1;

    v.$inputNumberInputs.forEach(el => {
      el.value = newValue || 0;
    });

    return;
  }

  if ((e.key === "PageDown" || e.key === "ArrowDown")) {
    if (this.value < 1 && this.value) return;

    newValue = parseInt(this.value) - 1;

    v.$inputNumberInputs.forEach(el => {
      el.value = newValue || 0;
    });

    return;
  }

  if (!this.value.match(/^\d*$/)) {
    newValue = this.value.replace(/\D/g, "");

    v.$inputNumberInputs.forEach(el => {
      el.value = newValue;
    });

  } else {
    newValue = this.value;

    v.$inputNumberInputs.forEach(el => {
      el.value = newValue;
    });
  }
}

// **
function changeInputValueWithBtn() {
  const input = this.parentElement.previousElementSibling;

  if (this.classList.contains("input-number__btn--upper")) {
    if (input.value > 998) return;
    newValue = parseInt(input.value) + 1;

    v.$inputNumberInputs.forEach(el => {
      el.value = newValue || 0;
    });

  } else {
    if (input.value < 1 && input.value) return;
    newValue = parseInt(input.value) - 1;

    v.$inputNumberInputs.forEach(el => {
      el.value = newValue || 0;
    });
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

// **
v.$inputNumberInputs.forEach(el => {
  el.addEventListener("change", rechargeProductButton);
});