import * as v from "../vars";

// F(s)
// **
function isInputValid(e) {
  if (e.key === "PageUp" || e.key === "ArrowUp") {
    if (this.value > 998) return;
    this.value = parseInt(this.value) + 1;
    return;
  }

  if (e.key === "PageDown" || e.key === "ArrowDown") {
    if (this.value < 1) return;
    this.value = parseInt(this.value) - 1;
    return;
  }

  if (!this.value.match(/^\d*$/)) {
    this.value = this.value.replace(/\D/g, "");
  }
}

// **
function changeInputValue() {
  const input = this.parentElement.previousElementSibling;
  
  if (this.classList.contains("input-number__btn--upper")) {
    if (input.value > 998) return;

    input.value = parseInt(input.value) + 1;
    return;
  }

  if (input.value < 1) return;
  input.value = parseInt(input.value) - 1;
}

// L(s)
// **
v.$inputNumberInputs.forEach(el => {
  el.addEventListener("keyup", isInputValid);
});

// **
v.$inputNumberBtns.forEach(el => {
  el.addEventListener("click", changeInputValue);
});