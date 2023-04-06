const timer = document.querySelector("#timer");
const counters = timer.querySelectorAll(".timer__count");

const daysElem = counters[0];
const hoursElem = counters[1];
const minsElem = counters[2];
const secElem = counters[3];

const initDays = 6;
let timerCount;

function turnOnTimer(initDays) {
  // Init numbers
  let days = initDays;
  let hours = 0;
  let mins = 0
  let sec = 0;

  // Starting text
  daysElem.textContent = amendTime(initDays);
  hoursElem.textContent = "00";
  minsElem.textContent = "00";
  secElem.textContent = "00";

  // Functions
  function amendTime(time) {
    return (time > 9) ? time : "0" + time;
  }

  function changeTime() {
    if (sec > 0) {
      sec -= 1;
      secElem.textContent = amendTime(sec);
      return;
    }

    if (sec == 0) {
      if (mins > 0) {
        mins -= 1;
        minsElem.textContent = amendTime(mins);

        sec = 59;
        secElem.textContent = sec;
      } else {
        if (hours > 0) {
          hours -= 1;
          hoursElem.textContent = amendTime(hours);

          mins = 59;
          minsElem.textContent = mins;

          sec = 59;
          secElem.textContent = sec;
        } else {
          if (days > 0) {
            days -= 1;
            daysElem.textContent = amendTime(days);

            hours = 23;
            hoursElem.textContent = hours;

            mins = 59;
            minsElem.textContent = mins;

            sec = 59;
            secElem.textContent = sec;
          } else {
            clearInterval(timerCount);
          }
        }
      }
    }
  }

  // Start functions after starting text
  setTimeout(() => {
    timerCount = setInterval(changeTime, 1000);
  }, 1000);
}

turnOnTimer(initDays);




