const looks = document.querySelectorAll(".sale .product__look");
let currentIdx = 0;

// Functions
function chooseImage(e) {
  const image = this.querySelector("#microslider-image");
  const srcs = this.querySelectorAll(".microslider__src");

  if (e.target.closest(".microslider__button--left")) {
    if (currentIdx < 1) {
      currentIdx = srcs.length - 1;
      image.src = srcs[currentIdx].dataset.src;
      return;
    }
    
    currentIdx -= 1;
    image.src = srcs[currentIdx].dataset.src;
    
  } else if (e.target.closest(".microslider__button--right")) {
    if (currentIdx >= srcs.length - 1) {
      currentIdx = 0;
      image.src = srcs[currentIdx].dataset.src;
      return;
    }

    currentIdx += 1;
    image.src = srcs[currentIdx].dataset.src;
  }
}

// Listeners
looks.forEach(look => {
  look.addEventListener("click", chooseImage);
});
