const myOrderHeads = document.querySelectorAll(".orders-content__head");
let timer;

// F(s)
// **
function setHeight(orderProducts) {
  const orderProductsHeight = orderProducts.scrollHeight;
  orderProducts.style.height = orderProductsHeight + "px";
}

// **
function hideOrder() {
  const prevOrderHead = document.querySelector(".orders-content__head--show");

  if (prevOrderHead) {
    prevOrderHead.classList.remove("orders-content__head--show");
    prevOrderHead.setAttribute("aria-expanded", "false");
    
    const prevOrderProducts = prevOrderHead.nextElementSibling;
    setHeight(prevOrderProducts);

    clearTimeout(timer);
    setTimeout(() => {
      prevOrderProducts.style.height = "";
    }, 0);
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
  setHeight(orderProducts);

  timer = setTimeout(() => {
    orderProducts.style.height = "auto";
  }, 400);
}

// L(s)
if (myOrderHeads[0]) {
  myOrderHeads.forEach(el => {
    el.addEventListener("click", showOrder);
  });

  showOrderInit();
}