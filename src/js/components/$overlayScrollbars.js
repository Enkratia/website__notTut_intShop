import * as v from "../vars.js";

import {
  OverlayScrollbars,
  ScrollbarsHidingPlugin,
  SizeObserverPlugin
} from 'overlayscrollbars';

// Add plugins
OverlayScrollbars.plugin([ScrollbarsHidingPlugin, SizeObserverPlugin]);

// ==== CUSTOM-SELECT-LIST SCROLLBAR ==== //
const customSelectListScrollbar = OverlayScrollbars(document.querySelector('#custom-select-list'), {});

// ==== NAV SCROLLBAR ==== //
let navScrollBar;

// F(s)
function setNavScrollbar() {
  if (v.$mdq991.matches) {
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
  if (v.$mdq992.matches) {
    navScrollBar.destroy();
  }
}

// L(s)
v.$mdq991.addEventListener("change", setNavScrollbar);
v.$mdq992.addEventListener("change", removetNavScrollbar);


// ==== SIDEBAR BOTTOM SCROLLBAR ==== //
if (v.$sidebarFilterTops[0]) {

  // *For filter__list
  v.$sidebarFilterLists.forEach(el => {
    let sidebarBottomListScrollbar = OverlayScrollbars(el, {
      scrollbars: {
        theme: 'os-theme-sidebar-bottom',
      }
    });
  });

  // *For filter__colors
  let sidebarBottomColorsScrollbar = OverlayScrollbars(document.querySelector('.filter__colors-wrapper'), {
    scrollbars: {
      theme: 'os-theme-sidebar-bottom',
    }
  });
}

// ==== SIDEBAR FILTERS WRAPPER SCROLLBAR ==== //
if (v.$filterWrapper) {

  let sidebarFiltersWrapper;

  // F(s)
  // **
  function overflowHiddenBody() {
    if (v.$filterWrapper.classList.contains("sidebar-filters__wrapper--hide")) {
      document.body.classList.add("overflow-hidden");
    }
  }

  // **
  function toggleSidebarFiltersWrapperOS() {
    if (v.$mdq1119.matches) {
      sidebarFiltersWrapper = OverlayScrollbars(document.querySelector('.sidebar-filters__wrapper-inner'), {
        overflow: {
          x: 'visible',
        },
        scrollbars: {
          theme: 'os-theme-sidebar-filters',
        }
      });

      overflowHiddenBody();

    } else {
      sidebarFiltersWrapper?.destroy();
    }
  }
  toggleSidebarFiltersWrapperOS();


  // L(s)
  v.$mdq1119.addEventListener("change", toggleSidebarFiltersWrapperOS);
}

// ==== CART CHOICE SCROLLBAR ==== //
let cartChoiceListScrollbar = OverlayScrollbars(document.querySelector('.cart-choice__list-wrapper'), {
  scrollbars: {
    theme: 'os-theme-cart-choice',
  }
});

if (v.$productCard) {

  // ==== DOWNLOAD FILES SCROLLBAR ==== //
  let downloadFilesScrollbar = OverlayScrollbars(document.querySelector('.download__files-wrapper'), {
    scrollbars: {
      theme: 'os-theme-download-files',
    }
  });

  // ==== LEAVE REVIEW CONTENT SCROLLBAR ==== //
  let leaveReviewContentScrollbar = OverlayScrollbars(document.querySelector('.leave-review__content'), {
    scrollbars: {
      theme: 'os-theme-leave-review-content',
    }
  });
}




