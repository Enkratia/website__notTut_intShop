const myOrderHeads = document.querySelectorAll(".orders-content__head");
// F(s)
// **
function hideOrder() {
  const prevOrderHead = document.querySelector(".orders-content__head--show");

  if (prevOrderHead) {
    const prevOrderProducts = prevOrderHead.nextElementSibling;

    prevOrderHead.classList.remove("orders-content__head--show");
    prevOrderHead.setAttribute("aria-expanded", "false");

    prevOrderProducts.style.height = "";
  }
}

// **
function showOrderInit() {
  const activePaymentMethod = document.querySelector(".orders-content__head--init");
  activePaymentMethod.click();
}

// **
function showOrder() {
  if (this.classList.contains("orders-content__head--show")) {
    hideOrder();
    return;
  }

  hideOrder();

  this.classList.add("orders-content__head--show");
  this.setAttribute("aria-expanded", "true");

  const orderProducts = this.nextElementSibling;
  const orderProductsHeight = orderProducts.scrollHeight;
  orderProducts.style.height = orderProductsHeight + "px";
}

// L(s)
if (myOrderHeads[0]) {
  myOrderHeads.forEach(el => {
    el.addEventListener("click", showOrder);
  });

  showOrderInit();
}