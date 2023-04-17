// Components
import "./components/currency";
import "./components/special-offers";
import "./components/timer";
import "./components/swipers";
import "./components/product__bottom";
import "./components/microslider";
import "./components/custom-checkbox";
import "./components/subscribe__categories";
import "./components/menu-btn";
import "./components/megamenu";


// Libraries
// **OverlayScrollbars
import {
  OverlayScrollbars,
  ScrollbarsHidingPlugin,
  SizeObserverPlugin
} from 'overlayscrollbars';

OverlayScrollbars.plugin([ScrollbarsHidingPlugin, SizeObserverPlugin]);
const cslScrollbar = OverlayScrollbars(document.querySelector('#custom-select-list'), {});
let navScrollBar;

const mediaq991 = window.matchMedia("(max-width: 991px)");
const mediaq992 = window.matchMedia("(min-width: 992px)");

// F(s)
function setNavScrollbar() {
  if (mediaq991.matches) {
    navScrollBar = OverlayScrollbars(document.querySelector('#nav'), {
      overflow: {
        x: 'hidden',
      },
      scrollbars: {
        theme: 'os-theme-my',
      },
    });
  }
}
setNavScrollbar();

function removetNavScrollbar() {
  if (mediaq992.matches) {
    navScrollBar = null;
  }
}

// L(s)
mediaq991.addEventListener("change", setNavScrollbar);
mediaq992.addEventListener("change", removetNavScrollbar);

//------------------------------------------


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