import * as v from "../vars.js";

// F(s)
// **
function hideSizeChart() {
  v.$productCardChart.classList.remove("chart--show");
  document.body.classList.remove("overflow-hidden");
}

// **
function showSizeChart() {
  v.$productCardChart.classList.add("chart--show");
  document.body.classList.add("overflow-hidden");
}

// L(s)
v.$productCardSizeBtn?.addEventListener("click", showSizeChart);
v.$chartClose?.addEventListener("click", hideSizeChart);