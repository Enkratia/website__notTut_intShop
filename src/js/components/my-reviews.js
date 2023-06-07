import * as rmt from "./review-message-tooltips.js";

const myReviews = document.querySelector("#my-reviews");

if (myReviews) {
  const assessmentBtns = myReviews.querySelectorAll(".review__message-btn");
  
  assessmentBtns.forEach(el => {
    el.addEventListener("click", rmt.$assessReview);
  });
}