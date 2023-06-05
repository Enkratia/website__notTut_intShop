import * as v from "../vars.js";
import * as lr from "./leave-review.js";
import { Decimal } from 'decimal.js';

export {
  calculateOrderTotal as $calculateOrderTotal,
  calculateDiscount as $calculateDiscount,
  isBillingReady as $isBillingReady,
  toggleCompleteBtn as $toggleCompleteBtn
}

// ==== SIGN IN BUTTON ==== //
// F(s)
function signIn(e) {
  e.preventDefault();
  v.$loginBtnIn.click();
}

// L(s)
v.$checkoutSignIn?.addEventListener("click", signIn);


// ==== BILLING ==== //
const checkoutBilling = document.querySelector(".checkout__billing");
const textInputs = checkoutBilling?.querySelectorAll(".input[type='text']:not(#checkout-billing-phone)");
const emailInput = checkoutBilling?.querySelector(".input[type='email']");
const phoneInput = checkoutBilling?.querySelector("#checkout-billing-phone");
const selects = checkoutBilling?.querySelectorAll(".custom-select");

const regExp = /^\S+@\S+\.\S+$/;

// F(s)
// **
function toggleCompleteBtn() {
  const isCartFull = v.$cartChoiceList.children.length;
  v.$checkoutCompleteBtn.classList.toggle("btn--disabled", !isBillingReady() || !isCartFull);
}

// **
function isBillingReady() {
  const isTextFilled = [...textInputs].every(el => {
    return el.value.length !== 0;
  });

  const isSelectsSelected = [...selects].every(el => {
    return el.classList.contains("custom-select--chosen");
  });

  const isEmailFilled = emailInput.value.match(regExp);

  const isPhoneFilled = phoneInput.value.length === 14;
  
  if (isTextFilled && isEmailFilled && isPhoneFilled && isSelectsSelected) return true;

  return false;
}

// L(s)
if (checkoutBilling) {

  // **
  textInputs.forEach(el => {
    el.addEventListener("blur", lr.$verifyTextInput.bind(el));
    el.addEventListener("blur", toggleCompleteBtn);
  });

  // **
  selects.forEach(el => {
    el.addEventListener("blur", lr.$verifySelect.bind(el));
    el.addEventListener("blur", toggleCompleteBtn);
  });

  // **
  emailInput.addEventListener("blur", lr.$verifyEmailInput.bind(emailInput));
  emailInput.addEventListener("blur", toggleCompleteBtn);

  // **
  phoneInput.addEventListener("blur", lr.$verifyPhone.bind(phoneInput));
  phoneInput.addEventListener("blur", toggleCompleteBtn);
}


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
  let allCosts = document.querySelectorAll("[data-totals]:not([data-totals='discount'])");

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


// ==== PAYMENT ==== //
const paymentTops = document.querySelectorAll(".checkout__payment-top");

// F(s)
// **
function hidePayment() {
  const prevPaymentTop = document.querySelector(".checkout__payment-top--show");

  if (prevPaymentTop) {
    const prevPaymentBottom = prevPaymentTop.nextElementSibling;

    prevPaymentTop.classList.remove("checkout__payment-top--show");
    prevPaymentTop.setAttribute("aria-expanded", "false");

    prevPaymentBottom.style.height = "";
  }
}

// **
function showPaymentMethodInit() {
  const activePaymentMethod = document.querySelector(".checkout__payment-top--init");
  activePaymentMethod.click();
}

// **
function showPayment() {
  if (this.classList.contains("checkout__payment-top--show")) return;
  hidePayment();

  this.classList.add("checkout__payment-top--show");
  this.setAttribute("aria-expanded", "true");

  const nativeRadio = this.querySelector("input");
  nativeRadio.dispatchEvent(new Event("change"));

  const paymentBottom = this.nextElementSibling;
  const paymentBottomHeight = paymentBottom.scrollHeight;
  paymentBottom.style.height = paymentBottomHeight + "px";
}

// L(s)
if (paymentTops[0]) {
  paymentTops.forEach(el => {
    el.addEventListener("click", showPayment);
  });

  showPaymentMethodInit();
}

// ==== COMPLETE ORDER BUTTON ==== //
// F(s)
function checkCheckoutForm(e) {
  e.preventDefault();
  lr.$checkForm(e, textInputs, selects, emailInput, phoneInput);
}

// L(s)
v.$checkoutCompleteBtn?.addEventListener("click", checkCheckoutForm);


