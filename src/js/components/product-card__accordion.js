const productCardAccordionTops = document.querySelectorAll(".product-card .accordion__top");
let isShow;

// F(s)
function showAccordion() {
  this.classList.toggle("accordion__top--show");
  const accordionBottom = this.nextElementSibling;

  if (this.classList.contains("accordion__top--show")) {
    const accordionBottomHeight = accordionBottom.scrollHeight;
    accordionBottom.style.height = accordionBottomHeight + "px";
    isShow = false;

    return;
  }

  accordionBottom.style.height = "";
  isShow = true;
}

// L(s)
productCardAccordionTops.forEach(el => {
  el.addEventListener("click", showAccordion);
});