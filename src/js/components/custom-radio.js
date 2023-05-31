import * as v from "../vars.js";
import * as che from "./checkout.js";

// F(s)
// **
function checkCustomRadioWithKey(e) {
  if(e.key === "Enter") {
    this.click();
  }
}

// **
function checkCustomRadio() {
  const prevActiveRadio = document.querySelector(".custom-radio--checked");
  prevActiveRadio.classList.remove("custom-radio--checked");
  prevActiveRadio.setAttribute("aria-checked", "false");
  
  const currentRadio = this.parentElement;
  currentRadio.classList.add("custom-radio--checked");
  currentRadio.setAttribute("aria-checked", "true");

  che.$calculateOrderTotal();
}

// L(s)
v.$customRadios.forEach(el => {
  const nativeRadio = el.querySelector("input");
  nativeRadio.addEventListener("change", checkCustomRadio);

  el.addEventListener("keyup", checkCustomRadioWithKey);
});