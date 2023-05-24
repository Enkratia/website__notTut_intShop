import * as v from "../vars.js";

const ordinaryInputs = v.$leaveReview.querySelectorAll(".input:not([type='email'])");
const emailInput = v.$leaveReview.querySelector("[type='email']");
const selected = v.$leaveReview.querySelector(".leave-review__sort-selected");
const select = v.$leaveReview.querySelector(".leave-review__sort-select");

const regExp = /^\S+@\S+\.\S+$/;

// F(s)
// **
function verifySelectInput() {
  if (selected.innerText !== "Choose rating") {
    const selectWrapper = selected.closest(".custom-select__outer-wrapper");
    selectWrapper.classList.remove("custom-select__outer-wrapper--warning");
    selectWrapper.classList.add("custom-select__outer-wrapper--success");
  }
}

// **
function verifyEmailInput () {
  if (emailInput.value.match(regExp)) {
    emailInput.parentElement.classList.remove("input-wrapper--warning");
    emailInput.parentElement.classList.add("input-wrapper--success");
  }
}

// **
function verifyOrdinaryInput() {
  ordinaryInputs.forEach(el => {
    if (el.value.length > 0) {
      el.parentElement.classList.remove("input-wrapper--warning");
      el.parentElement.classList.add("input-wrapper--success");
    }
  });
}

// **
function checkAndSendForm(e) {
  e.preventDefault();

  ordinaryInputs.forEach(el => {
    if (el.value.length === 0) {
      el.parentElement.classList.remove("input-wrapper--success");
      el.parentElement.classList.add("input-wrapper--warning");
    }
  });

  if (!emailInput.value.match(regExp)) {
    emailInput.parentElement.classList.remove("input-wrapper--success");
    emailInput.parentElement.classList.add("input-wrapper--warning");
  }

  if (selected.innerText === "Choose rating") {
    const selectWrapper = selected.closest(".custom-select__outer-wrapper");
    selectWrapper.classList.remove("custom-select__outer-wrapper--success");
    selectWrapper.classList.add("custom-select__outer-wrapper--warning");
  }
}

// **
function hideLeaveReview() {
  v.$leaveReview.classList.remove("leave-review--show");
  document.body.classList.remove("overflow-hidden");
}

// **
function showLeaveReview() {
  v.$leaveReview.classList.add("leave-review--show");
  document.body.classList.add("overflow-hidden");
}

// L(s)
// ** 
v.$leaveReviewBtn.addEventListener("click", showLeaveReview);
v.$leaveReviewClose.addEventListener("click", hideLeaveReview);

// **
v.$leaveReviewSubmit.addEventListener("click", checkAndSendForm);

// **
ordinaryInputs.forEach(el => {
  el.addEventListener("blur", verifyOrdinaryInput);
});
emailInput.addEventListener("blur", verifyEmailInput);
select.addEventListener("blur", verifySelectInput);