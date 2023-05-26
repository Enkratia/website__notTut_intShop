import * as v from "../vars.js";

const textInput = v.$leaveReview.querySelector(".input[type='text']");
const emailInput = v.$leaveReview.querySelector("[type='email']");
const textarea = v.$leaveReview.querySelector(".leave-review__textarea");

const selected = v.$leaveReview.querySelector(".leave-review__sort-selected");
const select = v.$leaveReview.querySelector(".leave-review__sort-select");

const regExp = /^\S+@\S+\.\S+$/;

// ==== CHECK LEAVE-REVIEW VALIDITY | TEXTAREA PLACEHOLDER ==== //
// F(s)
// **
function removeWarningSuccessClasses(elem) {
  elem.parentElement.classList.remove("input-wrapper--success", "input-wrapper--warning");
} 

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
  if (textInput.value.length > 0) {
    addSuccessClass(textInput);
  }
}

// ***
function checkAndSendForm(e) {
  e.preventDefault();

  if (textInput.value.length === 0) {
    addWarningClass(textInput);
  }

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
textInput.addEventListener("blur", verifyTextInput);

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
function resetForm() {
  textarea.classList.remove("leave-review__textarea--active");

  textarea.innerHTML = "";
  textInput.value = "";
  emailInput.value = "";

  removeWarningSuccessClasses(textarea);
  removeWarningSuccessClasses(textInput);
  removeWarningSuccessClasses(emailInput);

  const firstSelectChild = v.$leaveReview.querySelector(".leave-review__sort-list").firstElementChild;
  firstSelectChild.click();
  firstSelectChild.click();

  const selectWrapper = select.closest(".custom-select__outer-wrapper");
  selectWrapper.classList.remove("custom-select__outer-wrapper--success", "custom-select__outer-wrapper--warning");

  v.$downloadingFiles.innerHTML = "";
  v.$downloadingFiles.closest(".download__files-wrapper").classList.remove("download__files-wrapper--show");
}

// ***
function hideLeaveReview() {
  v.$leaveReview.classList.remove("leave-review--show");
  document.body.classList.remove("overflow-hidden");

  resetForm();
}

// ***
function showLeaveReview() {
  v.$leaveReview.classList.add("leave-review--show");
  document.body.classList.add("overflow-hidden");
}

// L(s)
// ** 
v.$leaveReviewBtn.addEventListener("click", showLeaveReview);

// **
v.$leaveReviewClose.addEventListener("click", hideLeaveReview);