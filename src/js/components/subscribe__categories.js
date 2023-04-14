const subscribeCategories = document.querySelector(".subscribe__categories");
const nativeCheckBoxes = subscribeCategories.querySelectorAll(".categories__btn-checkbox");

// Function(s)
function checkSubscribeCategoriesCheckbox() {
  const checkbox = this.parentElement;

  checkbox.classList.toggle("categories__btn--checked");
  const isAriaChecked = checkbox.getAttribute("aria-checked");

  if (isAriaChecked === "false") {
    checkbox.setAttribute("aria-checked", "true");
  } else {
    checkbox.setAttribute("aria-checked", "false");
  }
}

// Listener(s)
nativeCheckBoxes.forEach(el => {
  el.addEventListener("change", checkSubscribeCategoriesCheckbox);
});
