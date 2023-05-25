import * as v from "../vars.js";
let siblingBtn;

// ==== LIKE - DISLIKE BUTTONS ==== //
// F(s)
// **
function decreaseCount(btn) {
  const btnCount = btn.lastElementChild;
  const btnCountText = btnCount.innerText;

  btnCount.innerText = btnCountText - 1;
  btn.classList.remove("review__message-btn--active");
}

// **
function increaseCount(btn) {
  const btnCount = btn.lastElementChild;
  const btnCountText = btnCount.innerText;

  btnCount.innerText = +btnCountText + 1;
  btn.classList.add("review__message-btn--active");
}

// ***
function assessReview() {

  if (this.classList.contains("review__message-btn--active")) {
    decreaseCount(this);
    return;
  }

  increaseCount(this);

  if (this.classList.contains("review__message-btn--like")) {
    siblingBtn = this.nextElementSibling;

  } else {
    siblingBtn = this.previousElementSibling;
  }

  if (siblingBtn.classList.contains("review__message-btn--active")) {
    decreaseCount(siblingBtn);
  }
}

// L(s)
v.$reviewAssessBtns.forEach(el => {
  el.addEventListener("click", assessReview);
});

// ==== REPLY BUTTON ==== //
const textarea = v.$leaveReview.querySelector(".leave-review__textarea");

// F(s)
// **
function replyOnReview() {
  v.$leaveReviewBtn.click();
  textarea.classList.add("leave-review__textarea--active");
  textarea.innerHTML = "";

  const review = this.closest(".review__box");
  const reviewUserName = review.querySelector(".review__user-name").innerText;
  
  const reviewLink = document.createElement("a");
  reviewLink.setAttribute("contenteditable", "false");
  reviewLink.className = "leave-review__textarea-link";
  reviewLink.innerText = "@" + reviewUserName;

  textarea.appendChild(reviewLink);
  textarea.insertAdjacentHTML("beforeend", " ");
}

// L(s)
v.$replyBtns.forEach(el => {
  el.addEventListener("click", replyOnReview);
});
