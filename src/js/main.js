// Components
import "./components/custom-select";
import "./components/marketing-slider";
import "./components/sliders";

// Libraries
// **OverlayScrollbars
import { 
  OverlayScrollbars, 
  ScrollbarsHidingPlugin, 
  SizeObserverPlugin
} from 'overlayscrollbars';

OverlayScrollbars.plugin([ScrollbarsHidingPlugin, SizeObserverPlugin]);
const osInstance = OverlayScrollbars(document.querySelector('#custom-select-list'), {});