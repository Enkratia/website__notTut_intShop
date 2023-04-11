const looks = document.querySelectorAll(".sale .product__look");

// Functions
function chooseImage() {
  let currentIdx = 0;

  return function(e) {
    const image = this.querySelector("#microslider-image");
    const srcs = this.querySelectorAll(".microslider__src");
  
    if (e.target.closest(".microslider__button--left")) {
      currentIdx -= 1;
      
      if (currentIdx < 0) {
        currentIdx = srcs.length -1;
        image.src = srcs[currentIdx].dataset.src;
        return;
      }
      
      image.src = srcs[currentIdx].dataset.src;
      
    } else if (e.target.closest(".microslider__button--right")) {
      currentIdx += 1;
      
      if (currentIdx > srcs.length - 1) {
        currentIdx = 0;
        image.src = srcs[currentIdx].dataset.src;
        return;
      }
      
      image.src = srcs[currentIdx].dataset.src;
    }
  }
}

// Listeners
looks.forEach(look => {
  look.addEventListener("click", chooseImage());
});