import * as v from "../vars.js";
import * as cb from "./colors__button.js";
let isOpen = false;

// SELECT WITH MOUSE
// F(s)
// **
function toggleActiveClassInCard(elem) {
  const activeSizeBtns = v.$productCard.querySelectorAll(".sizes__button--active");
  const newSize = elem.getAttribute("data-size-select");

  if (!newSize) {
    activeSizeBtns.forEach(el => {
      el.classList.remove("sizes__button--active");
    });

    return
  }

  const newSizeBtns = v.$productCard.querySelectorAll(`[data-size=${newSize}]`);
  
  activeSizeBtns.forEach(el => {
    el.classList.remove("sizes__button--active");
  });
  
  newSizeBtns.forEach(el => {
    el.classList.add("sizes__button--active");
  });
}

// **
function highlightChosen(select) {
  const selectedText = select.querySelector(".custom-select__selected").innerText;
  const firstLiItemText = select.querySelector(".custom-select__list").firstElementChild.innerText;

  select.classList.toggle("custom-select--chosen", selectedText !== firstLiItemText);
}

// **
function closeSelect() {
  this.classList.remove("custom-select--open");
}

// **
function rearrangeClass(el, list) {
  list.querySelector(".custom-select__item--active").classList.remove("custom-select__item--active");
  return el.classList.add("custom-select__item--active");
}

// **
function changeSelectValue(e, selected, thisSelect) {

  // For duplicted selects (toolbar selects)
  if (e.target.classList.contains("toolbar__sort-item")) {

    // Find active item idx in list
    const thisSortListChildren = thisSelect.querySelector(".toolbar__sort-list").children;
    const thisSortItemIdx = Array.from(thisSortListChildren).indexOf(e.target);

    v.$toolbarSortSelects.forEach(el => {

      // Rearrange class
      el.querySelector(".custom-select__item--active").classList.remove("custom-select__item--active");
      const toolbarSortListChildren = el.querySelector(".toolbar__sort-list").children;
      toolbarSortListChildren[thisSortItemIdx].classList.add("custom-select__item--active");

      // Change text in selected
      const toolbarSortSelected = el.querySelector(".toolbar__sort-selected");
      toolbarSortSelected.textContent = e.target.textContent;
    });

    highlightChosen(thisSelect);

    return;
  }

  // For ordinary selects
  if (e.target.classList.contains("custom-select__item")) {
    selected.textContent = e.target.textContent;
    rearrangeClass(e.target, thisSelect);
    cb.$rechargeProductButton(e.target);

    highlightChosen(thisSelect);
    toggleActiveClassInCard(e.target);
  }
}

// ***
function select(e) {
  const thisSelect = this;
  const selected = this.querySelector(".custom-select__selected");

  this.classList.toggle("custom-select--open");
  this.addEventListener("blur", closeSelect.bind(this), { once: true });

  changeSelectValue(e, selected, thisSelect);
}

// SELECT WITH KEYBOARD
// ***
function selectWithKeyboard(e) {
  const selected = this.querySelector(".custom-select__selected");
  const selectList = this.querySelector(".custom-select__list");

  if (e.key === "Enter") {
    this.classList.toggle("custom-select--open");
    isOpen = this.classList.contains("custom-select--open");

  } else if (e.key === " ") {
    this.classList.add("custom-select--open");
    isOpen = this.classList.contains("custom-select--open");

  } else if (e.key === "ArrowUp" && isOpen) {
    let prevSibling = selectList.querySelector(".custom-select__item--active").previousElementSibling;
    if (!prevSibling) return;

    selected.textContent = prevSibling.textContent;
    rearrangeClass(prevSibling, selectList);

  } else if (e.key === "ArrowDown" && isOpen) {
    console.log(e.currentTarget)
    let nextSibling = selectList.querySelector(".custom-select__item--active").nextElementSibling;
    if (!nextSibling) return;

    selected.textContent = nextSibling.textContent;
    rearrangeClass(nextSibling, selectList);

  } else if ((e.key === "PageUp" || e.key === "Home") && isOpen) {
    const firstSibling = selectList.firstElementChild;

    selected.textContent = firstSibling.textContent;
    rearrangeClass(firstSibling, selectList);

  } else if ((e.key === "PageDown" || e.key === "End") && isOpen) {
    const lastSibling = selectList.lastElementChild;

    selected.textContent = lastSibling.textContent;
    rearrangeClass(lastSibling, selectList);

  } else if (isOpen) {
    this.classList.remove("custom-select--open");
  }

  this.addEventListener("blur", closeSelect.bind(this), { once: true });
  cb.$rechargeProductButton(e.target);
}

// L(s)
// **
v.$customSelects.forEach(el => {
  el.addEventListener("click", select);
});

// **
v.$customSelects.forEach(el => {
  el.addEventListener("keydown", selectWithKeyboard);
});
