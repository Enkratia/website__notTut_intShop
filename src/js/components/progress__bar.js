const progressBars = document.querySelectorAll(".progress__bar");
const percentageArray = [];

const asessments = {
  "5": 7,
  "4": 2,
  "3": 1,
  "2": 1,
  "1": 1,
}

// **
function calculatePercentage(num, total) {
  const percentage = 50 + (num - 2) / total * 100;
  return percentage.toFixed(2) + "%";
}

// **
function pushPercentage() {
  const total = Object.values(asessments).reduce(((curr, next) => curr + next));

  for (let elem in asessments) {
    switch (asessments[elem]) {
      case 0:
        percentageArray.unshift("0");
        break;
      case 1:
        percentageArray.unshift("25%");
        break;
      case 2: 
        percentageArray.unshift("50%");
        break;
      default:
        percentageArray.unshift(calculatePercentage(asessments[elem], total));
    }
  }
}
pushPercentage();

percentageArray.forEach((el, idx) => {
  progressBars[idx].style.setProperty("--progress-width", el);
});