import * as v from "../vars.js";

// F(s)
// **
function hideSizeChart(e) {
  const isChartData = e.target.closest(".chart__data");
  const isChartClose = e.target.closest(".chart__close");

  if (!isChartData || isChartClose) {
    this.classList.remove("chart--show");
    document.body.classList.remove("overflow-hidden");
  }
}

// **
function showSizeChart() {
  v.$productCardChart.classList.add("chart--show");
  document.body.classList.add("overflow-hidden");
}

// L(s)
v.$productCardSizeBtn?.addEventListener("click", showSizeChart);

v.$productCardChart?.addEventListener("click", hideSizeChart);