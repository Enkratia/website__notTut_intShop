// Components
import "./components/currency";
import "./components/special-offers";
import "./components/timer";
import "./components/swipers";
import "./components/product";

// Libraries
// **OverlayScrollbars
import { 
  OverlayScrollbars, 
  ScrollbarsHidingPlugin, 
  SizeObserverPlugin
} from 'overlayscrollbars';

OverlayScrollbars.plugin([ScrollbarsHidingPlugin, SizeObserverPlugin]);
const osInstance = OverlayScrollbars(document.querySelector('#custom-select-list'), {});