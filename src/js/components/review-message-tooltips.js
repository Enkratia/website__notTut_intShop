import * as v from "../vars.js";
export { assessReview as $assessReview }

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

if (v.$leaveReview) {

  // L(s)
  v.$reviewAssessBtns.forEach(el => {
    el.addEventListener("click", assessReview);
  });
}

// ==== REPLY BUTTON ==== //
const textarea = document.querySelector(".custom-textarea");
const replyBtns = document.querySelectorAll(".review__message-reply");

// F(s)
// **
function replyOn(e) {
  if (this.tagName === "BUTTON") {
    v.$leaveReviewBtn.click();

  } else {
    e.preventDefault();
    const leaveCommentSection = document.querySelector("#leave-your-comment");
    const pageOffset = window.scrollY;
    const sectionOffset = leaveCommentSection.getBoundingClientRect().top;
    window.scrollTo(0, pageOffset + sectionOffset - 120);
  }

  textarea.classList.add("custom-textarea--active");
  textarea.innerHTML = "";

  const review = this.closest(".review__box");
  const reviewUserName = review.querySelector(".review__user-name").innerText;

  const reviewLink = document.createElement("a");
  reviewLink.setAttribute("contenteditable", "false");
  reviewLink.className = "custom-textarea__link";
  reviewLink.innerText = "@" + reviewUserName;

  textarea.appendChild(reviewLink);
  textarea.insertAdjacentHTML("beforeend", " ");
}

if (replyBtns[0]) {

  // L(s)
  replyBtns.forEach(el => {
    el.addEventListener("click", replyOn);
  });
}

