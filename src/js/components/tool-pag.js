import * as v from "../vars.js";

// ==== PAGINATION ==== //
let page = 1;
let totalPages = 10;
let activePag;
let chosenPag;

const leftArrows = document.querySelectorAll(".tool-pag [data-toolpag='arrow-left']");
const rightArrows = document.querySelectorAll(".tool-pag [data-toolpag='arrow-right']");
const rightDots = document.querySelector(".tool-pag [data-toolpag='dots-right']");

if (rightDots) {

  // F(s)
  // **
  function initPags() {
    if (!v.$mdq875.matches) {
      const activePag = v.$toolPags[0].querySelector(".tool-pag__item--active").dataset.toolpag;
      let diff;

      if (activePag > page) {
        diff = activePag - page;
        page = +activePag;

        for (let i = 0; i < diff; i++) {
          leftArrows[0].click();
          if (page === 1) break;
        }

      } else if (activePag < page) {
        diff = page - activePag;
        page = +activePag;

        for (let i = 0; i < diff; i++) {
          rightArrows[0].click();
          if (page === totalPages) break;
        }
      }
    }
  }
  initPags();

  v.$mdq875.addEventListener("change", initPags);

  // **
  function goFarAhead() {
    for (let i = 0; i < 5; i++) {
      rightArrows[0].click();
      if (page === totalPages) break;
    }
  }

  // **
  function goFarBack() {
    for (let i = 0; i < 5; i++) {
      leftArrows[0].click();
      if (page === 1) break;
    }
  }

  // **
  function createRightDots(el) {
    const penultEl = el.querySelector(`[data-toolpag='${totalPages - 1}']`);
    penultEl.querySelector(".tool-pag__link").textContent = "...";
    penultEl.setAttribute("data-toolpag", "dots-right");

    const rightDots = el.querySelector("[data-toolpag='dots-right']");
    rightDots.addEventListener("click", goFarAhead);
    rightDots.removeEventListener("click", changePag);
  }

  // **
  function destroyRightDots(el) {
    const dotsRight = el.querySelector(`[data-toolpag='dots-right']`);

    if (!dotsRight) return;

    dotsRight.querySelector(".tool-pag__link").textContent = `${totalPages - 1}`;
    dotsRight.setAttribute("data-toolpag", `${totalPages - 1}`);

    const penultPag = el.querySelector(`[data-toolpag='${totalPages - 1}']`);
    penultPag.addEventListener("click", changePag);
    penultPag.removeEventListener("click", goFarAhead);
  }

  // **
  function createLeftDots(el) {
    const secondEl = el.querySelector(`[data-toolpag='2']`);
    secondEl.querySelector(".tool-pag__link").textContent = "...";
    secondEl.setAttribute("data-toolpag", "dots-left");

    const leftDots = el.querySelector("[data-toolpag='dots-left']");
    leftDots.addEventListener("click", goFarBack);
    leftDots.removeEventListener("click", changePag);
  }

  // **
  function destroyLeftDots(el) {
    const dotsLeft = el.querySelector(`[data-toolpag='dots-left']`);

    if (!dotsLeft) return;

    dotsLeft.querySelector(".tool-pag__link").textContent = '2';
    dotsLeft.setAttribute("data-toolpag", '2');

    const secondPag = el.querySelector(`[data-toolpag='2']`);
    secondPag.addEventListener("click", changePag);
    secondPag.removeEventListener("click", goFarBack);
  }

  // **
  function rearrangeActiveClass() {
    v.$toolPags.forEach(el => {
      el.querySelector(".tool-pag__item--active")?.classList.remove("tool-pag__item--active");
      console.log(page)
      el.querySelector(`[data-toolpag='${page}']`).classList.add("tool-pag__item--active");
    });
  }

  // **
  function createPrevPag(el, page) {
    el.querySelector(`[data-toolpag='${page}']`).insertAdjacentHTML("beforebegin", `
    <li class="tool-pag__item" data-toolpag="${page - 1}">
      <a href="#" class="tool-pag__link">
      ${page - 1}
      </a>
    </li>
  `);

    const prevPag = el.parentElement.querySelector(`[data-toolpag='${page - 1}']`);
    prevPag.addEventListener("click", changePag);
  }

  // **
  function createNextPag(el, page) {
    el.querySelector(`[data-toolpag='${page}']`).insertAdjacentHTML("afterend", `
    <li class="tool-pag__item" data-toolpag="${page + 1}">
      <a href="#" class="tool-pag__link">
      ${page + 1}
      </a>
    </li>
  `);

    const nextPag = el.parentElement.querySelector(`[data-toolpag='${page + 1}']`);
    nextPag.addEventListener("click", changePag);
  }

  // **
  function destroyLeftPage(el) {
    el.querySelector(`[data-toolpag='${page - 2}']`)?.remove();
  }

  // **
  function destroyRightPage(el) {
    el.querySelector(`[data-toolpag='${page + 2}']`)?.remove();
  }

  // ***
  function changePag() {
    page = parseInt(this.dataset.toolpag);

    v.$toolPags.forEach(el => {
      activePag = el.querySelector(".tool-pag__item--active");
      chosenPag = el.querySelector(`[data-toolpag='${page}']`);
    });

    if (chosenPag === activePag) return;

    rightArrows.forEach(el => el.classList.toggle("tool-pag__item--inactive", page === totalPages));
    leftArrows.forEach(el => el.classList.toggle("tool-pag__item--inactive", page === 1));

    if (page === 1) {
      v.$toolPags.forEach(el => {
        const liElems = el.children;
        const liElemsLength = liElems.length;

        for (let i = 0; i < liElemsLength - 4; i++) {
          liElems[2].remove();
        }

        for (let i = 0; i < 2; i++) {
          createNextPag(el, 1 + i);
        }

        liElems[3].insertAdjacentHTML("afterend", `
        <li class="tool-pag__item" data-toolpag="dots-right">
          <a href="#" class="tool-pag__link">
            ...
          </a>
        </li>
      `);

        const rightDots = el.querySelector("[data-toolpag='dots-right']");
        rightDots.addEventListener("click", goFarAhead);
      });

      rearrangeActiveClass();
      return;
    }

    if (page === totalPages) {
      v.$toolPags.forEach(el => {
        const liElems = el.children;
        const liElemsLength = liElems.length;

        for (let i = 0; i < liElemsLength - 4; i++) {
          liElems[2].remove();
        }

        for (let i = 0; i < 2; i++) {
          createPrevPag(el, totalPages - i);
        }

        liElems[1].insertAdjacentHTML("afterend", `
          <li class="tool-pag__item" data-toolpag="dots-left">
            <a href="#" class="tool-pag__link">
             ...
            </a>
          </li>
        `);

        const leftDots = el.querySelector("[data-toolpag='dots-left']");
        leftDots.addEventListener("click", goFarBack);
      });

      rearrangeActiveClass();
      return;
    }

    if (chosenPag === activePag.previousElementSibling) {
      page++;
      leftArrows[0].click();

    } else if (chosenPag === activePag.nextElementSibling) {
      page--;
      rightArrows[0].click();

    } else if (page === 3) {
      v.$toolPags.forEach(el => {
        createNextPag(el, page);
      });

    } else if (page === totalPages - 2) {
      v.$toolPags.forEach(el => {
        createPrevPag(el, page);
      });
    };

    rearrangeActiveClass();
  }

  // ***
  function toNextPag() {
    page += 1;
    leftArrows.forEach(el => el.classList.remove("tool-pag__item--inactive"));

    rearrangeActiveClass();

    if (page === totalPages) {
      rightArrows.forEach(el => el.classList.add("tool-pag__item--inactive"));
      return;
    }

    if (page === 3) {
      v.$toolPags.forEach(el => {
        createNextPag(el, page);
      });

      return;
    }

    if (page === 4) {
      v.$toolPags.forEach(el => {
        createNextPag(el, page);
        createLeftDots(el);
      });

      return;
    }

    if (page > totalPages - 2) {
      v.$toolPags.forEach(el => {
        destroyLeftPage(el);
      });

      return;
    }

    if (page > 4) {
      v.$toolPags.forEach(el => {
        if (page <= totalPages - 3) createNextPag(el, page);

        destroyLeftPage(el);

        if (page === totalPages - 2) {
          destroyRightDots(el);
        }
      });
    }
  }

  // ***
  function toPrevPag() {
    page -= 1;
    rightArrows.forEach(el => el.classList.remove("tool-pag__item--inactive"));

    rearrangeActiveClass();

    if (page === 1) {
      leftArrows.forEach(el => el.classList.add("tool-pag__item--inactive"));
      return;
    }

    if (page === totalPages - 2) {
      v.$toolPags.forEach(el => {
        createPrevPag(el, page);
      });

      return;
    }

    if (page === totalPages - 3) {
      v.$toolPags.forEach(el => {
        createPrevPag(el, page);
        createRightDots(el);
      });

      return;
    }

    if (page === 2) {
      v.$toolPags.forEach(el => {
        destroyRightPage(el)
      });

      return;
    }

    if (page === 3) {
      v.$toolPags.forEach(el => {
        destroyLeftDots(el)
        destroyRightPage(el)
      });

      return;
    }

    if (page < totalPages - 3) {
      v.$toolPags.forEach(el => {
        createPrevPag(el, page);

        destroyRightPage(el)
      });
    }
  }

  // L(s)
  // **
  v.$toolPags.forEach(el => {
    for (let i = 0; i < el.children.length; i++) {
      if (i == 1 || i == 2 || i == 3 || i == 5) {
        let numPag = el.children[i];
        numPag.addEventListener("click", changePag);
      }
    }
  });

  // **
  rightArrows.forEach(el => {
    el.addEventListener("click", toNextPag);
  });

  // **
  leftArrows.forEach(el => {
    el.addEventListener("click", toPrevPag);
  });

  // **
  rightDots.addEventListener("click", goFarAhead);
}


// ==== MINI PAGINATION (ON SMALL WIDTH DEVICES) ==== //
const leftMiniArrows = document.querySelectorAll(".tool-pag-mini [data-toolpag='arrow-left']");
const rightMiniArrows = document.querySelectorAll(".tool-pag-mini [data-toolpag='arrow-right']");

// F(s)
function toLastPage() {
  rightMiniArrows.forEach(el => el.classList.add("tool-pag-mini__item--inactive"));
  leftMiniArrows.forEach(el => el.classList.remove("tool-pag-mini__item--inactive"));

  page = totalPages;
  writePageNumber();
}

// ** 
function writePageNumber() {
  v.$toolPagsMini.forEach(el => {
    const currentPageText = el.querySelector("[data-toolpag='current'] .tool-pag__link");
    currentPageText.textContent = page;
  });
}

// **
function initMiniPags() {
  if (v.$mdq875.matches) {
    if (page > 1) {
      page--;
      toNextPage();

    } else {
      page++;
      toPrevPage();
    }
  }
}
initMiniPags();

// **
function toNextPage() {
  if (page === totalPages) return;
  if (page === totalPages - 1) {
    rightMiniArrows.forEach(el => el.classList.add("tool-pag-mini__item--inactive"));
  }

  page++;
  leftMiniArrows.forEach(el => el.classList.remove("tool-pag-mini__item--inactive"));

  writePageNumber();
}

// **
function toPrevPage() {
  if (page === 1) return;
  if (page === 2) {
    leftMiniArrows.forEach(el => el.classList.add("tool-pag-mini__item--inactive"));
  }

  page--;
  rightMiniArrows.forEach(el => el.classList.remove("tool-pag-mini__item--inactive"));

  writePageNumber();
}

// L(s)
// **
function addListeners() {
  if (v.$mdq875.matches) {
    rightMiniArrows.forEach(el => {
      el.addEventListener("click", toNextPage);
    });

    leftMiniArrows.forEach(el => {
      el.addEventListener("click", toPrevPage);
    });

    v.$toolPagsMini.forEach(el => {
      const totalPagesPag = el.querySelector("[data-toolpag='total']");
      totalPagesPag.addEventListener("click", toLastPage);
    });
  }
}
addListeners();

// **
v.$mdq875.addEventListener("change", () => {
  addListeners();
  initMiniPags();
});