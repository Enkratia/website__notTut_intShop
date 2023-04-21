import * as v from "../vars";

import {
  OverlayScrollbars,
  ScrollbarsHidingPlugin,
  SizeObserverPlugin
} from 'overlayscrollbars';

// Add plugins
OverlayScrollbars.plugin([ScrollbarsHidingPlugin, SizeObserverPlugin]);

// CUSTOM SELECT LIST SCROLLBAR
const customSelectListScrollbar = OverlayScrollbars(document.querySelector('#custom-select-list'), {});

// NAV SCROLLBAR
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

// CUSTOM SELECT LIST SCROLLBAR
const sidebarListScrollbar = OverlayScrollbars(document.querySelector('.filter__list'), {
  scrollbars: {
    theme: 'os-theme-sidebar-list',
  }
});