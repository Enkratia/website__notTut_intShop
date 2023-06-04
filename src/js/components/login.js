import * as v from "../vars.js";
import * as lr from "./leave-review.js";

// ==== SHOW / HIDE LOG MODAL ==== //
// F(s)
// **
function resetLogModal(modal) {
  const inputs = modal.querySelectorAll(".input");
  const successClasses = modal.querySelectorAll(".input-wrapper--success");
  const warningClasses = modal.querySelectorAll(".input-wrapper--warning");
  const showPasswordBtns = modal.querySelectorAll(".log__show");
  const checkbox = modal.querySelector(".custom-checkbox");

  inputs.forEach(el => {
    el.value = "";
  });

  successClasses.forEach(el => {
    el.classList.remove("input-wrapper--success");
  });

  warningClasses.forEach(el => {
    el.classList.remove("input-wrapper--warning");
  });

  showPasswordBtns.forEach(el => {
    if (el.classList.contains("log__show--active")) {
      el.click();
    }
  });

  if (!checkbox.classList.contains("custom-checkbox--checked")) {
    checkbox.click();
  }
}

// **
function hideLogModal() {
  const logModal = this.closest(".log");

  logModal.classList.remove("log--show");
  document.body.classList.remove("overflow-hidden");

  resetLogModal(logModal);
}

// **
function showLogRegisterModal() {
  v.$logRegisterModal.classList.add("log--show");
  document.body.classList.add("overflow-hidden");
}

// **
function showLogInModal() {
  v.$logInModal.classList.add("log--show");
  document.body.classList.add("overflow-hidden");
}

// L(s)
// **
v.$loginBtnIn.addEventListener("click", showLogInModal);

// **
v.$loginBtnRegister.addEventListener("click", showLogRegisterModal);

// **
v.$logClose.forEach(el => {
  el.addEventListener("click", hideLogModal);
});


// ==== VERIFY LOG-IN MODAL FORM ==== //
const logInEmail = v.$logInModal.querySelector("#log-in-email");
const logInPasswords = v.$logInModal.querySelectorAll("#log-in-password");
const logInBtn = v.$logInModal.querySelector(".log__button");

// F(s)
// **
function showPassword() {
  const input = this.previousElementSibling;

  this.classList.toggle("log__show--active");

  if (this.classList.contains("log__show--active")) {
    input.setAttribute("type", "text");

  } else {
    input.setAttribute("type", "password");
  }
}

// L(s)
// **
logInEmail.addEventListener("blur", lr.$verifyEmailInput);

// **
logInPasswords.forEach(el => {
  el.addEventListener("blur", lr.$verifyPassword);
});

// **
logInBtn.addEventListener("click", (e) => {
  lr.$checkForm(e, null, null, logInEmail, null, logInPasswords);
});

// **
v.$showPasswordBtns.forEach(el => {
  el.addEventListener("click", showPassword);
});

// ==== VERIFY LOG-REGISTER MODAL FORM ==== //
const logRegNames = v.$logRegisterModal.querySelectorAll("#log-register-name");
const logRegEmail = v.$logRegisterModal.querySelector("#log-register-email");
const logRegPasswords = v.$logRegisterModal.querySelectorAll(".input--password");
const logRegBtn = v.$logRegisterModal.querySelector(".log__button");

// L(s)
// **
logRegNames.forEach(el => {
  el.addEventListener("blur", lr.$verifyTextInput);
});

// **
logRegEmail.addEventListener("blur", lr.$verifyEmailInput);

// **
logRegPasswords.forEach(el => {
  el.addEventListener("blur", function() {lr.$verifyMatchPassword(logRegPasswords)});
});

// **
logRegBtn.addEventListener("click", (e) => {
  lr.$checkForm(e, logRegNames, null, logRegEmail, null, logRegPasswords);
});


// ==== TRANSFER LOGIN ELEMENT (FOR TABLET) ==== //
// F(s)
function replaceLogin() {
  if (v.$mdq991.matches) {
    v.$headerMainContainer.appendChild(v.$login);
  }
}
replaceLogin();

function returnLogin() {
  if (v.$mdq992.matches) {
    v.$headerTopContainer.appendChild(v.$login);
  }
}

// L(s)
v.$mdq991.addEventListener("change", replaceLogin);
v.$mdq992.addEventListener("change", returnLogin);