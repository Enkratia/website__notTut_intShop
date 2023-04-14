// Components
import "./components/currency";
import "./components/special-offers";
import "./components/timer";
import "./components/swipers";
import "./components/product__bottom";
import "./components/microslider";
import "./components/custom-checkbox";
import "./components/subscribe__categories";


// Libraries
// **OverlayScrollbars
import { 
  OverlayScrollbars, 
  ScrollbarsHidingPlugin, 
  SizeObserverPlugin
} from 'overlayscrollbars';

OverlayScrollbars.plugin([ScrollbarsHidingPlugin, SizeObserverPlugin]);
const osInstance = OverlayScrollbars(document.querySelector('#custom-select-list'), {});

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