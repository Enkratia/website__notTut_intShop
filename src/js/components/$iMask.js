import IMask from "imask";

const cardNumber = document.getElementById("checkout-payment-number");

// ==== CHECKOUT ==== //
if (cardNumber) {
  const cardDate = document.getElementById("checkout-payment-date");
  const phoneNumber = document.getElementById("checkout-billing-phone");
  
  const cardMask = IMask(cardNumber, {mask: "0000 0000 0000 0000"});
  const dateMask = IMask(cardDate, {mask: "00/00"});
  const phoneMask = IMask(phoneNumber, {mask: "(000) 000-0000"});
}

// ==== MY PROFILE ==== //
const profilePhoneNumber = document.getElementById("profile-form-phone");

if (profilePhoneNumber) {
  const profilePhoneMask = IMask(profilePhoneNumber, {mask: "(000) 000-0000"});
}

// ==== CONTACTS ==== //
const contactsPhoneNumber = document.getElementById("contact-us-phone");

if (contactsPhoneNumber) {
  const contactsPhoneMask = IMask(contactsPhoneNumber, {mask: "(000) 000-0000"});
}