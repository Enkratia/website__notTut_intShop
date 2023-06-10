import * as lr from "./leave-review.js";

const commentSection = document.querySelector("#leave-your-comment");

if (commentSection) {
  const commentName = commentSection.querySelector("#leave-your-comment-name");
  const commentEmail = commentSection.querySelector("#leave-your-comment-email");
  const commentTextarea = commentSection.querySelector("#leave-your-comment-comment");
  const commentSubmit = commentSection.querySelector(".leave-your-comment__submit");

  // F(s)
  // **
  function checkCommentForm(e) {
    e.preventDefault();
    lr.$checkForm(e, [commentName], null, commentEmail, null, null, commentTextarea);
  }

  // L(s)
  // **
  commentName.addEventListener("blur", lr.$verifyTextInput);

  // **
  commentEmail.addEventListener("blur", lr.$verifyEmailInput);

  // **
  commentTextarea.addEventListener("blur", lr.$verifyTextarea);

  // **
  commentTextarea.addEventListener("input", lr.$removeTextareaPlaceholder);

  // **
  commentSubmit.addEventListener("click", checkCommentForm);
}