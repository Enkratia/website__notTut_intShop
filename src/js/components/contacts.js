import * as lr from "./leave-review.js";

const contactsSection = document.querySelector("#contacts-section");

if (contactsSection) {

  // ==== CONTACT US ==== //
  const textInputs = contactsSection.querySelectorAll(".input[type='text']:not(#contact-us-phone)");
  const textarea = contactsSection.querySelector("#contact-us-message");
  const phoneInput = contactsSection.querySelector("#contact-us-phone");
  const emailInput = contactsSection.querySelector(".input[type='email']");

  const contactsSectionBtn = contactsSection.querySelector(".contact-us__submit");

  // F(s)
  function checkContactsForm(e) {
    e.preventDefault();
    lr.$checkForm(e, [...textInputs, textarea], null, emailInput, phoneInput);
  }

  // L(s)
  // **
  contactsSectionBtn.addEventListener("click", checkContactsForm);

  // **
  textInputs.forEach(el => {
    el.addEventListener("blur", lr.$verifyTextInput);
  });

  // **
  textarea.addEventListener("blur", lr.$verifyTextInput);

  // **
  emailInput.addEventListener("blur", lr.$verifyEmailInput);

  // **
  phoneInput.addEventListener("blur", lr.$verifyPhone);


  // ==== FAQ ==== //
  const faqHeads = contactsSection.querySelectorAll(".contacts-faq__accordion-head");

  // F(s)
  function setHeight(prevBody) {
    const faqBodyHeight = prevBody.scrollHeight;
    prevBody.style.height = faqBodyHeight + "px";
  }

  // **
  function hideFaqItem() {
    const prevFaqHead = contactsSection.querySelector(".contacts-faq__accordion-head--show");

    if (prevFaqHead) {
      prevFaqHead.classList.remove("contacts-faq__accordion-head--show");
      prevFaqHead.setAttribute("aria-expanded", "false");

      const prevFaqItemBody = prevFaqHead.nextElementSibling;
      setHeight(prevFaqItemBody);

      setTimeout(() => {
        prevFaqItemBody.style.height = "";
      }, 0);
    }
  }

  // **
  function showFaqItem() {
    if (this.classList.contains("contacts-faq__accordion-head--show")) {
      hideFaqItem();
      return;
    }

    hideFaqItem();

    this.classList.add("contacts-faq__accordion-head--show");
    this.setAttribute("aria-expanded", "true");

    const faqItemBody = this.nextElementSibling;
    setHeight(faqItemBody);
  }

  // L(s)
  faqHeads.forEach(el => {
    el.addEventListener("click", showFaqItem);
  });

  // === TABS === //
  const contactsTabs = contactsSection.querySelectorAll(".contacts__tabs-tab");

  // F(s)
  // **
  function hideActiveClass() {
    const prevTab = contactsSection.querySelector(".contacts__tabs-tab--active");
    prevTab.classList.remove("contacts__tabs-tab--active");
    prevTab.setAttribute("aria-selected", "false");
  }


  // **
  function showActiveClass() {
    if (this.classList.contains("contacts__tabs-tab--active")) {
      return;
    }

    hideActiveClass();

    this.classList.add("contacts__tabs-tab--active");
    this.setAttribute("aria-selected", "true");
  }

  // L(s)
  contactsTabs.forEach(el => {
    el.addEventListener("click", showActiveClass);
  });
}


