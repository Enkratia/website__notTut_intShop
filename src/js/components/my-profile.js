import * as v from "../vars.js";
import * as lr from "./leave-review.js";

const myProfileSection = document.querySelector("#my-profile");
const showPasswordBtns = myProfileSection.querySelectorAll(".profile-content__show");
const profileSelectLists = myProfileSection.querySelectorAll(".custom-select__list");

const country = "USA";
const city = "New Jersey";

// ==== SHOW PASSWORD / INIT SELECTS ==== //
// F(s)
// **
function initSelects(country, city) {
  const countrySelectList = profileSelectLists[0].children;
  const countrySelectListArray = [...countrySelectList];

  const citySelectList = profileSelectLists[1].children;
  const citySelectListArray = [...citySelectList];

  for (let i = 0; i < countrySelectList.length; i++) {
    if (countrySelectListArray[i].innerText === country) {
      countrySelectListArray[i].click();
      countrySelectListArray[i].click();
      break;
    }
  }

  for (let i = 0; i < citySelectList.length; i++) {
    if (citySelectListArray[i].innerText === city) {
      citySelectListArray[i].click();
      citySelectListArray[i].click();
      break;
    }
  }
}
initSelects(country, city);

// **
function showPassword() {
  const input = this.previousElementSibling;

  this.classList.toggle("profile-content__show--active");

  if (this.classList.contains("profile-content__show--active")) {
    input.setAttribute("type", "text");

  } else {
    input.setAttribute("type", "password");
  }
}

// L(s)
// **
showPasswordBtns.forEach(el => {
  el.addEventListener("click", showPassword);
});

// ==== CHECK PROFILE FORM ==== //
const textInputs = myProfileSection.querySelectorAll(".input[type='text']:not(#profile-form-phone)");
const passwords = myProfileSection.querySelectorAll(".input--password");
const selects = myProfileSection.querySelectorAll(".custom-select");
const email = myProfileSection.querySelector("#profile-form-email");
const phone = myProfileSection.querySelector("#profile-form-phone");
const saveChangesBtn = myProfileSection.querySelector(".profile-content__btn");

// F(s)
function checkProfileForm(e) {
  e.preventDefault();

  if (passwords[0].value.trim() || passwords[1].value.trim()) {
    lr.$checkForm(e, textInputs, selects, email, phone, passwords);

  } else {
    lr.$checkForm(e, textInputs, selects, email, phone, null);
  }
}

// L(s)
// **
textInputs.forEach(el => {
  el.addEventListener("blur", lr.$verifyTextInput);
});

// **
passwords.forEach(el => {
  el.addEventListener("blur", () => lr.$verifyMatchPassword(passwords));
});

// **
selects.forEach(el => {
  el.addEventListener("blur", lr.$verifySelect);
});

// **
email.addEventListener("blur", lr.$verifyEmailInput);

// **
phone.addEventListener("blur", lr.$verifyPhone);

// **
saveChangesBtn.addEventListener("click", checkProfileForm);
