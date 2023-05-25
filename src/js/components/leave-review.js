import * as v from "../vars.js";

const textInputs = v.$leaveReview.querySelectorAll(".input[type='text']");
const emailInput = v.$leaveReview.querySelector("[type='email']");
const textarea = v.$leaveReview.querySelector(".leave-review__textarea");

const selected = v.$leaveReview.querySelector(".leave-review__sort-selected");
const select = v.$leaveReview.querySelector(".leave-review__sort-select");

const regExp = /^\S+@\S+\.\S+$/;

// ==== CHECK LEAVE-REVIEW VALIDITY | TEXTAREA PLACEHOLDER ==== //
// F(s)
//**
function addWarningClass(elem) {
  elem.parentElement.classList.remove("input-wrapper--success");
  elem.parentElement.classList.add("input-wrapper--warning");
}

//**
function addSuccessClass(elem) {
  elem.parentElement.classList.remove("input-wrapper--warning");
  elem.parentElement.classList.add("input-wrapper--success");
}

// **
function removeTextareaPlaceholder() {
  const isEmpty = isTextareaEmpty();

  if (isEmpty || this.querySelector("a")) {
    textarea.classList.add("leave-review__textarea--active");
    return;
  }

  textarea.classList.remove("leave-review__textarea--active");
}

// **
function isTextareaEmpty() {
  const regExp = /(<a.+<\/a>)/i;
  let textareaText = textarea.innerHTML.trim();

  const regExpResult = textareaText.match(regExp);
  if (regExpResult) {
    textareaText = textareaText.replace(regExpResult[0], "");
  }

  return textareaText.length;
}

// **
function verifyTextarea() {
  const isEmpty = isTextareaEmpty();

  if (isEmpty) {
    addSuccessClass(textarea);
  }
}

// **
function verifySelectInput() {
  if (selected.innerText !== "Choose rating") {
    const selectWrapper = selected.closest(".custom-select__outer-wrapper");
    selectWrapper.classList.remove("custom-select__outer-wrapper--warning");
    selectWrapper.classList.add("custom-select__outer-wrapper--success");
  }
}

// **
function verifyEmailInput() {
  if (emailInput.value.match(regExp)) {
    addSuccessClass(emailInput);
  }
}

// **
function verifyTextInput() {
  textInputs.forEach(el => {
    if (el.value.length > 0) {
      addSuccessClass(el);
    }
  });
}

// ***
function checkAndSendForm(e) {
  e.preventDefault();

  textInputs.forEach(el => {
    if (el.value.length === 0) {
      addWarningClass(el);
    }
  });

  if (!emailInput.value.match(regExp)) {
    addWarningClass(emailInput);
  }

  const isEmpty = isTextareaEmpty();
  if (!isEmpty) {
    addWarningClass(textarea);
  }


  if (selected.innerText === "Choose rating") {
    const selectWrapper = selected.closest(".custom-select__outer-wrapper");
    selectWrapper.classList.remove("custom-select__outer-wrapper--success");
    selectWrapper.classList.add("custom-select__outer-wrapper--warning");
  }
}

// L(s)
// **
v.$leaveReviewSubmit.addEventListener("click", checkAndSendForm);

// **
textInputs.forEach(el => {
  el.addEventListener("blur", verifyTextInput);
});

// **
emailInput.addEventListener("blur", verifyEmailInput);

// **
select.addEventListener("blur", verifySelectInput);

// **
textarea.addEventListener("blur", verifyTextarea);

// **
textarea.addEventListener("input", removeTextareaPlaceholder);


// ==== CHECK HIDE LEAVE-REVIEW ==== //
// **
function hideLeaveReview() {
  v.$leaveReview.classList.remove("leave-review--show");
  document.body.classList.remove("overflow-hidden");
}

// **
function showLeaveReview() {
  textarea.classList.remove("leave-review__textarea--active");
  textarea.innerHTML = "";

  v.$leaveReview.classList.add("leave-review--show");
  document.body.classList.add("overflow-hidden");
}

// L(s)
// ** 
v.$leaveReviewBtn.addEventListener("click", showLeaveReview);

// **
v.$leaveReviewClose.addEventListener("click", hideLeaveReview);