import * as v from "../vars.js";
import { Decimal } from 'decimal.js';

export { calculateOrderTotal as $calculateOrderTotal}

// ==== SHIPPING METHOD ==== //
// F(s)
// **
function calculateOrderTotal() {
  const regExp = /(\$)(.+)/i;
  let allCosts = document.querySelectorAll("[data-totals]");
  
  allCosts = [...allCosts].map(el => {
    const cost = el.innerText.match(regExp);
    return cost ? cost[2] : 0;
  });

  const sum = Decimal.sum(...allCosts);
  v.$checkoutOrderTotalSum.innerText = "$" + sum.toFixed(2);
}

// **
function toggleActiveClass(meth) {
  const customRadio = meth.querySelector(".custom-radio");
  customRadio.click();
}

// **
function applyMethod(meth) {
  const methodCost = meth.querySelector(".checkout__method-price").innerText;
  const shippingCosts = v.$checkoutTotals.querySelector("[data-totals='shipping']");
  shippingCosts.innerText = methodCost;
}

// ***
function changeMethod(e) {
  const method = e.target.closest(".checkout__method-box");

  if (method) {
    toggleActiveClass(method);
    applyMethod(method);
  }
}

// L(s)
v.$checkoutMethod?.addEventListener("click", changeMethod);

