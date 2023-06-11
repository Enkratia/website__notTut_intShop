import * as v from "../vars.js";
export { changeCurrency as $changeCurrency}

const currency = v.$headerTopContainer.querySelector(".currency");
const currencyImage = currency.querySelector(".currency__flag");
const regExp = /(^.+)\s\//i;

const flags = {
  eng: "./img/flag-usa.svg",
  ru: "./img/flag-ru.svg",
  eu: "./img/flag-eu.svg"
}

function changeCurrency(elem) {
  const chosenCurrency = elem.innerText.match(regExp)[1];
  currencyImage.setAttribute("src", flags[chosenCurrency.toLowerCase()]);
} 