import * as v from "../vars.js";
import { Decimal } from 'decimal.js';

export { calculateOrderTotal as $calculateOrderTotal, calculateDiscount as $calculateDiscount}

// ==== METHOD ==== //
// F(s)
// **
function calculateDiscount(array) {
  let discountArray = [];

  array.forEach(el => {
    if (el.oldPrice) {
      const discount = el.oldPrice.replace("$", "") - el.price.replace("$", "");
      discountArray.push(discount);
    }
  });

  if (discountArray.length === 0) {
    v.$checkoutOrderDiscount.innerText = "—";
    return;
  }

  const discountSum = Decimal.sum(...discountArray);
  v.$checkoutOrderDiscount.innerText = "$" + discountSum.toFixed(2);
}

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
function toggleActiveClass(met) {
  const customRadio = met.querySelector(".custom-radio");
  customRadio.click();
}

// **
function applyMethod(met) {
  const methodCost = met.querySelector(".checkout__method-price").innerText;
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

