import * as v from "../vars.js";

export {
  verifySelect as $verifySelect,
  verifyTextInput as $verifyTextInput,
  checkForm as $checkForm,
  verifyEmailInput as $verifyEmailInput,
  verifyPhone as $verifyPhone,
  verifyPassword as $verifyPassword,
  verifyMatchPassword as $verifyMatchPassword
}

const textInputs = v.$leaveReview?.querySelectorAll(".input[type='text']");
const selects = v.$leaveReview?.querySelectorAll(".leave-review__sort-select");
const textarea = v.$leaveReview?.querySelector(".leave-review__textarea");
const emailInput = v.$leaveReview?.querySelector(".input[type='email']");

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

// ** (For: export + checkForm)
function verifyPhone() {
  if (this.value.length === 14) {
    addSuccessClass(this);
  }
}

// ** (For: export + checkForm)
function verifyPassword() {
  if (this.value.length > 5) {
    addSuccessClass(this);
  }
}

// ** (For: export + checkForm)
function verifyMatchPassword(passwords) {
  if (passwords[0].value.length > 5) {
    addSuccessClass(passwords[0]);
  }

  if (passwords[0].value.length > 5 && passwords[0].value === passwords[1].value) {
    addSuccessClass(passwords[1]);
  }
}

// **
function verifyEmailInput() {
  if (this.value.match(regExp)) {
    addSuccessClass(this);
  }
}

// **
function verifyTextarea() {
  const isEmpty = isTextareaEmpty();

  if (isEmpty) {
    addSuccessClass(textarea);
  }
}

// **
function verifySelect() {
  if (this.classList.contains("custom-select--chosen")) {
    const selectWrapper = this.closest(".custom-select__outer-wrapper");
    selectWrapper.classList.remove("custom-select__outer-wrapper--warning");
    selectWrapper.classList.add("custom-select__outer-wrapper--success");
  }
}

// **
function verifyTextInput() {
  if (this.value.length > 0) {
    addSuccessClass(this);
  }
}

// **
function resetForm() {
  textInputs.forEach(el => {
    el.value = "";
    removeWarningSuccessClasses(el);
  });

  selects.forEach(el => {
    const firstSelectChild = el.querySelector(".custom-select__list").firstElementChild;
    firstSelectChild.click();
    firstSelectChild.click();

    const selectWrapper = el.closest(".custom-select__outer-wrapper");
    selectWrapper.classList.remove("custom-select__outer-wrapper--success", "custom-select__outer-wrapper--warning");
  });

  textarea.classList.remove("leave-review__textarea--active");

  textarea.innerHTML = "";
  removeWarningSuccessClasses(textarea);

  v.$downloadingFiles.innerHTML = "";
  v.$downloadingFiles.closest(".download__files-wrapper").classList.remove("download__files-wrapper--show");
}

// ***
function checkForm(e, text, select, email, phone, passwords) {
  e.preventDefault();

  text?.forEach(el => {
    if (el.value.length === 0) {
      addWarningClass(el);
    }
  });

  select?.forEach(el => {
    if (!el.classList.contains("custom-select--chosen")) {
      const selectWrapper = el.closest(".custom-select__outer-wrapper");
      selectWrapper.classList.remove("custom-select__outer-wrapper--success");
      selectWrapper.classList.add("custom-select__outer-wrapper--warning");
    }
  });

  if (email && !email.value.match(regExp)) {
    addWarningClass(email);
  }

  if (phone && phone.value.length !== 14) {
    addWarningClass(phone);
  }

  passwords?.forEach((el, idx) => {
    if (passwords.length === 1) {
      if (el.value.length < 6) {
        addWarningClass(el);
      }

    } else {
      if (idx === 0 && el.value.length < 6) {
        removeWarningSuccessClasses(el);
        addWarningClass(el);
      }
      
      if (idx === 1 &&  passwords[0].value !== passwords[1].value) {
        removeWarningSuccessClasses(el);
        addWarningClass(el);
      }
    }
  });

  if (v.$leaveReview) {
    const isEmpty = isTextareaEmpty();

    if (!isEmpty) {
      addWarningClass(textarea);
    }
  }
}

// L(s)
if (v.$leaveReview) {

  // **
  textInputs.forEach(el => {
    el.addEventListener("blur", verifyTextInput);
  });

  // **
  selects.forEach(el => {
    el.addEventListener("blur", verifySelect);
  });

  // **
  emailInput.addEventListener("blur", verifyEmailInput);

  // **
  textarea.addEventListener("blur", verifyTextarea);

  // **
  textarea.addEventListener("input", removeTextareaPlaceholder);

  // **
  v.$leaveReviewSubmit.addEventListener("click", (e) => checkForm(e, textInputs, selects, emailInput));
}

// ==== CHECK HIDE LEAVE-REVIEW ==== //
// F(s)
// **
function hideLeaveReview() {
  v.$leaveReview.classList.remove("leave-review--show");
  document.body.classList.remove("overflow-hidden");

  resetForm();
}

// **
function showLeaveReview() {
  v.$leaveReview.classList.add("leave-review--show");
  document.body.classList.add("overflow-hidden");
}

// L(s)
if (v.$leaveReview) {

  // ** 
  v.$leaveReviewBtn.addEventListener("click", showLeaveReview);

  // **
  v.$leaveReviewClose.addEventListener("click", hideLeaveReview);
}

