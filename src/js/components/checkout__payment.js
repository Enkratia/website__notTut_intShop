import * as v from "../vars.js";

const paymentTops = document.querySelectorAll(".checkout__payment-top");

let isInit = true;

// F(s)
// **
function hidePayment() {
  const prevPaymentTop = document.querySelector(".checkout__payment-top--show");

  if (prevPaymentTop)  {
    const prevPaymentBottom = prevPaymentTop.nextElementSibling;
  
    prevPaymentTop.classList.remove("checkout__payment-top--show");
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

  const nativeRadio = this.querySelector("input");
  nativeRadio.dispatchEvent(new Event("change"));

  const paymentBottom = this.nextElementSibling;
  const paymentBottomHeight = paymentBottom.scrollHeight;
  paymentBottom.style.height = paymentBottomHeight + "px";
}

// L(s)
paymentTops.forEach(el => {
  el.addEventListener("click", showPayment);
});

showPaymentMethodInit();