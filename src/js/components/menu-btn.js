const menuBtn = document.querySelector("#menu-btn");

function showMenu() {
  this.classList.toggle("menu-btn--show");
}

menuBtn.addEventListener("click", showMenu);