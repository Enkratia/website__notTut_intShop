import * as v from "../vars.js";
import * as lr from "./leave-review.js";

export { showPassword as $showPassword }

// ==== SHOW / HIDE LOG MODAL ==== //
// F(s)
// **
function resetLogModal(modal) {
  const inputs = modal.querySelectorAll(".input");
  const successClasses = modal.querySelectorAll(".input-wrapper--success");
  const warningClasses = modal.querySelectorAll(".input-wrapper--warning");
  const showPasswordBtns = modal.querySelectorAll(".log__show");
  const checkbox = modal.querySelector(".custom-checkbox");

  inputs.forEach(el => {
    el.value = "";
  });

  successClasses.forEach(el => {
    el.classList.remove("input-wrapper--success");
  });

  warningClasses.forEach(el => {
    el.classList.remove("input-wrapper--warning");
  });

  showPasswordBtns.forEach(el => {
    if (el.classList.contains("log__show--active")) {
      el.click();
    }
  });

  if (!checkbox.classList.contains("custom-checkbox--checked")) {
    checkbox.click();
  }
}

// **
function hideLogModal(e) {
  const logContent = e.target.closest(".log__content");
  const isCloseBtn = e.target.closest(".log__close");

  if (!logContent || isCloseBtn) {
    this.classList.remove("log--show");
    document.body.classList.remove("overflow-hidden");

    resetLogModal(logModal);
  }
}

// **
function showLogRegisterModal() {
  v.$logRegisterModal.classList.add("log--show");
  document.body.classList.add("overflow-hidden");
}

// **
function showLogInModal() {
  v.$logInModal.classList.add("log--show");
  document.body.classList.add("overflow-hidden");
}

// L(s)
// **
v.$loginBtnIn.addEventListener("click", showLogInModal);

// **
v.$loginBtnRegister.addEventListener("click", showLogRegisterModal);

// **
v.$headerLogs.forEach(el => {
  el.addEventListener("click", hideLogModal);
});

// ==== VERIFY LOG-IN MODAL FORM ==== //
const logInEmail = v.$logInModal.querySelector("#log-in-email");
const logInPasswords = v.$logInModal.querySelectorAll("#log-in-password");
const logInBtn = v.$logInModal.querySelector(".log__button");

// F(s)
// **
function showPassword() {
  const input = this.previousElementSibling;

  this.classList.toggle("log__show--active");

  if (this.classList.contains("log__show--active")) {
    input.setAttribute("type", "text");

  } else {
    input.setAttribute("type", "password");
  }
}

// L(s)
// **
logInEmail.addEventListener("blur", lr.$verifyEmailInput);

// **
logInPasswords.forEach(el => {
  el.addEventListener("blur", lr.$verifyPassword);
});

// **
logInBtn.addEventListener("click", (e) => {
  lr.$checkForm(e, null, null, logInEmail, null, logInPasswords);
});

// **
v.$showPasswordBtns.forEach(el => {
  el.addEventListener("click", showPassword);
});

// ==== VERIFY LOG-REGISTER MODAL FORM ==== //
const logRegNames = v.$logRegisterModal.querySelectorAll("#log-register-name");
const logRegEmail = v.$logRegisterModal.querySelector("#log-register-email");
const logRegPasswords = v.$logRegisterModal.querySelectorAll(".input--password");
const logRegBtn = v.$logRegisterModal.querySelector(".log__button");

// L(s)
// **
logRegNames.forEach(el => {
  el.addEventListener("blur", lr.$verifyTextInput);
});

// **
logRegEmail.addEventListener("blur", lr.$verifyEmailInput);

// **
logRegPasswords.forEach(el => {
  el.addEventListener("blur", function () { lr.$verifyMatchPassword(logRegPasswords) });
});

// **
logRegBtn.addEventListener("click", (e) => {
  lr.$checkForm(e, logRegNames, null, logRegEmail, null, logRegPasswords);
});


// ==== TRANSFER LOGIN ELEMENT (FOR TABLET) ==== //
// F(s)
function replaceLogin() {
  if (v.$mdq991.matches) {
    v.$headerMainContainer.appendChild(v.$login);
  }
}
replaceLogin();

function returnLogin() {
  if (v.$mdq992.matches) {
    v.$headerTopContainer.appendChild(v.$login);
  }
}

// L(s)
v.$mdq991.addEventListener("change", replaceLogin);
v.$mdq992.addEventListener("change", returnLogin);


// ==== SHOW AUTORIZED LOGIN (FOR ACCOUNT PAGES) ==== //
if (v.$accountMenu) {
  const userName = "Annette Black";
  let userBtn;

  //F(s)
  // **
  function insertWishlistCount() {
    const wishlistCount = `    
      <span class="login-dropdown__link-count" aria-label="Number of products in wishlist.">
        2
      </span>`;

    return wishlistCount;
  }

  // **
  function generateCode(username, page) {
    let pagesInfo = [
      {
        id: "my-profile",
        pageName: "My profile",
        pageLink: "/account-my-profile.html",
        pageIcon: "./img/sprite.svg#person"
      },
      {
        id: "my-orders",
        pageName: "My orders",
        pageLink: "/account-my-orders.html",
        pageIcon: "./img/sprite.svg#wallet-2"
      },
      {
        id: "wishlist",
        pageName: "Wishlist",
        pageLink: "/account-wishlist.html",
        pageIcon: "./img/sprite.svg#heart"
      },
      {
        id: "account-recently-viewed",
        pageName: "Recently viewed",
        pageLink: "/account-recently-viewed.html",
        pageIcon: "./img/sprite.svg#eye"
      },
      {
        id: "my-reviews",
        pageName: "My reviews",
        pageLink: "/account-my-reviews.html",
        pageIcon: "./img/sprite.svg#star"
      },
      {
        id: "",
        pageName: "Sign out",
        pageLink: "/index.html",
        pageIcon: "./img/sprite.svg#logout"
      },
    ];

    let finalAuthCode = "";

    const authCodePart1 = `
    <div class="login__dropdown login-dropdown">
    <a class="login-dropdown__btn">
      <span class="login-dropdown__btn-name">
       ${username}
      </span>

      <svg xmlns='http://www.w3.org/2000/svg' aria-hidden='true'>
        <use href='./img/sprite.svg#angle-down' aria-hidden='true'></use>
      </svg>
    </a>

    <!-- Links -->
    <ul class="login-dropdown__links">
  `;

    let authCodePart2 = "";

    for (let i = 0; i < pagesInfo.length; i++) {
      authCodePart2 += `
      <!-- Item -->
      <li class="login-dropdown__item">
        <a href="${pagesInfo[i].pageLink}" class="login-dropdown__link ${pagesInfo[i].id === page ? 'login-dropdown__link--active' : ''}">
          <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <use href="${pagesInfo[i].pageIcon}" aria-hidden="true"></use>
          </svg>

          <span class="login-dropdown__link-name">
          ${pagesInfo[i].pageName}
          </span>

        ${i === 2 ? insertWishlistCount() : ''}
        </a>
      </li>
    `;
    }

    const authCodePart3 = `
    </ul>
    </div>

    <svg class="login__icon" xmlns='http://www.w3.org/2000/svg'>
     <use href='./img/sprite.svg#person'></use>
    </svg>
  `;

    finalAuthCode = authCodePart1 + authCodePart2 + authCodePart3;
    return finalAuthCode;
  }

  // **
  function hideLoginMenu(e) {
    const isloginMenu = e.target.closest(".login-dropdown__links");

    if (!isloginMenu) {
      userBtn.classList.remove("login-dropdown__btn--show");
      document.documentElement.removeEventListener("click", hideLoginMenu);
    }
  }

  // **
  function toggleLoginMenu() {
    userBtn.classList.toggle("login-dropdown__btn--show");

    if (userBtn.classList.contains("login-dropdown__btn--show")) {
      setTimeout(() => {
        document.documentElement.addEventListener("click", hideLoginMenu);
      }, 0);
    }
  }

  // **
  function pasteAuthLogin() {
    const currentPage = document.querySelector("[data-account]").getAttribute("id");
    v.$login.innerHTML = "";

    v.$login.insertAdjacentHTML("afterbegin", generateCode(userName, currentPage));
    v.$login.classList.add("login--authorized");

    userBtn = v.$login.querySelector(".login-dropdown__btn");
    userBtn.addEventListener("click", toggleLoginMenu);
  }
  pasteAuthLogin();


  // === MAKE LOGIN AS LINK FOR TABLET/MOBILE === //
  // F(s)
  // **
  function makeLoginBtnAsLink() {
    const accountBtn = v.$header.querySelector(".login-dropdown__btn");

    if (v.$mdq992.matches) {
      accountBtn.removeAttribute("href");
      accountBtn.setAttribute("role", "button");
      accountBtn.setAttribute("tabindex", 0);

    } else {
      accountBtn.setAttribute("href", "/account-my-profile.html");
      accountBtn.removeAttribute("role");
      accountBtn.removeAttribute("tabindex");
    }
  }
  makeLoginBtnAsLink();

  v.$mdq992.addEventListener("change", makeLoginBtnAsLink);
}
