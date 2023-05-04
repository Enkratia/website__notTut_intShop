import * as v from "../vars.js";
import { page, totalPages, testObj } from "./tool-pag.js";



const leftMiniArrows = document.querySelectorAll(".tool-pag-mini [data-toolpag='arrow-left']");
const rightMiniArrows = document.querySelectorAll(".tool-pag-mini [data-toolpag='arrow-right']");
let currentPage;
let total;
export { currentPage, total }

// testObj.data = currentPage;
// console.log(page, totalPages);

// if (leftMiniArrows[0]) {

//   // F(s)
//   // ** 
//   function writePageNumber() {
//     v.$toolPagsMini.forEach(el => {
//       const currentPageText = el.querySelector("[data-toolpag='current'] .tool-pag__link");
//       currentPageText.textContent = currentPage;
//     });
//   }

//   // **
//   // function initPages() {
//   //   if (v.$mdq875.matches) {
//   //     currentPage = page || 1;
//   //     total = totalPages || 10;

//   //     if (currentPage > 1) {
//   //       currentPage--;
//   //       toNextPage();

//   //     } else {
//   //       currentPage++;
//   //       toPrevPage();
//   //     }
//   //   }
//   // }
//   // initPages();

//   // **
//   function toNextPage() {
//     if (currentPage === total) return;
//     if (currentPage === total - 1) {
//       rightMiniArrows.forEach(el => el.classList.add("tool-pag-mini__item--inactive"));
//     }

//     currentPage++;
//     leftMiniArrows.forEach(el => el.classList.remove("tool-pag-mini__item--inactive"));

//     writePageNumber();
//   }

//   // **
//   function toPrevPage() {
//     if (currentPage === 1) return;
//     if (currentPage === 2) {
//       leftMiniArrows.forEach(el => el.classList.add("tool-pag-mini__item--inactive"));
//     }

//     currentPage--;
//     rightMiniArrows.forEach(el => el.classList.remove("tool-pag-mini__item--inactive"));

//     writePageNumber();
//   }

//   // L(s)
//   // **
//   rightMiniArrows.forEach(el => {
//     el.addEventListener("click", toNextPage);
//   });

//   // // **
//   leftMiniArrows.forEach(el => {
//     el.addEventListener("click", toPrevPage);
//   });

//   // v.$mdq875.addEventListener("change", initPages);
// }
