import * as v from "../vars";
let isOpen = false;

function closeSelect() {
  this.classList.remove("custom-select--open");
  this.removeEventListener("blur", closeSelect);
}

function removeAddClass(el) {
  document.querySelector(".custom-select__item--active").classList.remove("custom-select__item--active");
   return el.classList.add("custom-select__item--active");
}

// SELECT WITH MOUSE
function selectCurrency(e) {

  function changeSelectValue() {
    if (e.target.classList.contains("custom-select__item")) {
      v.$selected.textContent = e.target.textContent;
      document.querySelector(".custom-select__item--active").classList.remove("custom-select__item--active");
      e.target.classList.add("custom-select__item--active");
    }
  }

  this.classList.toggle("custom-select--open");

  changeSelectValue();

  this.addEventListener("blur", closeSelect.bind(this));
}

v.$customSelect.addEventListener("click", selectCurrency);

// SELECT WITH KEYBOARD
function selectCurrencyWithKeyboard(e) {

  if (e.key === "Enter") {
    this.classList.toggle("custom-select--open");
    isOpen = this.classList.contains("custom-select--open");

  } else if (e.key === " ") {
    this.classList.add("custom-select--open");
    isOpen = this.classList.contains("custom-select--open");

  } else if (e.key === "ArrowUp" && isOpen) {
    let prevSibling = document.querySelector(".custom-select__item--active").previousElementSibling;
    if (!prevSibling) return;

    v.$selected.textContent = prevSibling.textContent;
    removeAddClass(prevSibling)

  } else if (e.key === "ArrowDown" && isOpen) {
    let nextSibling = document.querySelector(".custom-select__item--active").nextElementSibling;
    if (!nextSibling) return;

    v.$selected.textContent = nextSibling.textContent;
    removeAddClass(nextSibling)

  } else if ((e.key === "PageUp" || e.key === "Home") && isOpen) {
    const firstSibling = v.$customSelectList.firstElementChild;

    v.$selected.textContent = firstSibling.textContent;
    removeAddClass(firstSibling)

  } else if ((e.key === "PageDown" || e.key === "End") && isOpen) {
    const lastSibling = v.$customSelectList.lastElementChild;

    v.$selected.textContent = lastSibling.textContent;
    removeAddClass(lastSibling)

  } else if (isOpen) {
    this.classList.remove("custom-select--open");
  }

  this.addEventListener("blur", closeSelect.bind(this));
}

v.$customSelect.addEventListener("keydown", selectCurrencyWithKeyboard);