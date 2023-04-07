// Components
import "./components/currency";
import "./components/special-offers";
import "./components/timer";
import "./components/swiper";
import "./components/product-bottom";

// Libraries
// **OverlayScrollbars
import { 
  OverlayScrollbars, 
  ScrollbarsHidingPlugin, 
  SizeObserverPlugin
} from 'overlayscrollbars';

OverlayScrollbars.plugin([ScrollbarsHidingPlugin, SizeObserverPlugin]);
const osInstance = OverlayScrollbars(document.querySelector('#custom-select-list'), {});