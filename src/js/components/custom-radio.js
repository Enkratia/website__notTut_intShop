import * as v from "../vars.js";
import * as che from "./checkout.js";

let prevCustomRadio;

// F(s)
// **
function checkCustomRadioWithKey(e) {
  if(e.key === "Enter") {
    this.dispatchEvent(new Event("change"));
  }
}

// **
function toggleActiveClass(prev, current) {
  prev.classList.remove("custom-radio--checked");
  prev.setAttribute("aria-checked", "false");

  current.classList.add("custom-radio--checked");
  current.setAttribute("aria-checked", "true");
}

// **
function checkCustomRadio() {
  const currentCustomRadio = this.closest(".custom-radio");
  
  if (currentCustomRadio.classList.contains("checkout__payment-radio")) {
    prevCustomRadio = document.querySelector(".checkout__payment-radio.custom-radio--checked");
    toggleActiveClass(prevCustomRadio, currentCustomRadio);

  } else if (currentCustomRadio.classList.contains("checkout__method-radio")) {
    prevCustomRadio = document.querySelector(".checkout__method-radio.custom-radio--checked");
    toggleActiveClass(prevCustomRadio, currentCustomRadio);

    che.$calculateOrderTotal();
  }
}

// L(s)
v.$customRadios.forEach(el => {
  const nativeRadio = el.querySelector("input");
  nativeRadio.addEventListener("change", checkCustomRadio);

  el.addEventListener("keyup", checkCustomRadioWithKey);
});