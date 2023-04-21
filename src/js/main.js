// Components
import "./vars";
import "./components/currency";
import "./components/special-offers";
import "./components/timer";
import "./components/custom-checkbox";
import "./components/subscribe__categories";
import "./components/menu-btn";
import "./components/megamenu";
import "./components/login";
import "./components/top-nav";
import "./components/product__bottom";
import "./components/microslider";
import "./components/filter";

// Components multiple in one
import "./components/$swipers";
import "./components/$overlayScrollbars";


// Scroll-top
const scrollTop = document.querySelector(".scroll-top");

// F(s)
function showScrollTop() {
  scrollTop.classList.toggle("scroll-top--active", window.pageYOffset > 250);
}

function scrollToTop() {
  window.scrollTo(0, 0);
}

// L(s)
window.addEventListener("scroll", showScrollTop);
scrollTop.addEventListener("click", scrollToTop);