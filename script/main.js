//*************** DATA ****************** */
import {
  units,
  houseStars,
  starsTransfer,
  houses,
  lvlSize,
  housesPrice,
  House,
} from "./data.js";
import * as method from "./method.js";
//*********************FUNCTIONS************************ */
function counter() {
  if (parseInt(counterBox.innerHTML) > 0)
    counterBox.innerHTML = parseInt(counterBox.innerHTML) - 1;
  else if (takeDownBox("house1")) counterBox.innerHTML = 10;
}
function earnRateSum() {
  const housess = document.querySelectorAll(".town > img");
  let sumTotal = 0;
  housess.forEach((house) => {
    sumTotal = sumTotal + parseInt(house.getAttribute("earn"));
  });
  const res = method.transfer(sumTotal);
  earnPerMuniteValueVar = res[0];
  earnPerMuniteValue.innerHTML = earnPerMuniteValueVar.toFixed(2);
  earnPerMuniteUnit.innerHTML = res[1];
}
function coinsTotal() {
  let unit = earnTotalUnit.innerHTML;
  const amountUnit = units[earnPerMuniteUnit.innerHTML];
  const newAmount = earnPerMuniteValueVar * amountUnit;
  const realValue = parseInt(
    method.realPrice(earnTotalValueVar, unit) + newAmount
  );
  let result = 0;
  if (realValue <= 0) {
    result = [0, ""];
    // clearInterval(nctl);
  } else result = method.transfer(realValue);

  earnTotalValueVar = result[0];
  earnTotalValue.innerHTML = earnTotalValueVar.toFixed(2);
  earnTotalUnit.innerHTML = result[1];
}
function updateAll() {
  earnRateSum();
  coinsTotal();
  coinsTotalInterval = setInterval(() => coinsTotal(), totalCoinTimer);
}
function decrementTimer() {
  const timeer = buttonTimer.innerHTML.split(":");
  let minunte = parseInt(timeer[0]);
  let seconde = parseInt(timeer[1]);
  if (seconde > 0) {
    seconde--;
  } else if (seconde === 0 && minunte > 0) {
    minunte--;
    seconde = 59;
  } else {
    clearInterval(timerInterval);
    buttonTimer.innerHTML = "FREE";
    store.style.backgroundColor = "var(--green)";
    store.style.animation = "gift 1s infinite";
    return;
  }
  buttonTimer.innerHTML = `${minunte < 10 ? "0" + minunte : minunte}:${
    seconde < 10 ? "0" + seconde : seconde
  }`;
}
function dropgift() {
  if (buttonTimer.innerHTML === "FREE") {
    if (takeDownBox("house1")) {
      buttonTimer.innerHTML = "10:00";
      timerInterval = setInterval(decrementTimer, gifTimer);
      store.style.backgroundColor = "";
      store.style.animation = "";
    } else method.showNoftif("no space");
  } else method.showNoftif("no available gift :(");
}
function takeDownBox(houseType) {
  let checkerSpace = document.querySelectorAll(".town:not(:has(img))");
  if (checkerSpace.length > 0) {
    checkerSpace[0].appendChild(new House(houseType).image);
    checkerSpace[0].addEventListener("click", () =>
      toggleTownClicked(checkerSpace[0])
    );
    earnRateSum();
    return true;
  }
}
function toggleTownClicked(town) {
  if (town.classList.contains("similair")) {
    merge(town);
  } else {
    if (town.children[0].classList.contains("house7") === false) {
      method.checkNotOtherClicked(town);
      town.classList.toggle("clicked");
      method.deletePreviouSimilair();
      method.coloredSimilair(town);
    }
  }
}
function merge(similairTown) {
  let clickedTown = document.querySelector(".clicked");
  let upgradedTown = method.upgradeClass(clickedTown);
  clickedTown.parentNode.replaceChild(clickedTown.cloneNode(), clickedTown);
  similairTown.firstElementChild.remove();
  const hh = new House(upgradedTown).image;
  similairTown.appendChild(hh);
  upgradeLvl(hh.className, "merge");
  method.clearLand();
  clearInterval(intervalId);
  intervalId = setInterval(counter, dropBoxTimer);
  releaseQueueHouse();
  earnRateSum();
}
function releaseQueueHouse() {
  if (counterBox.innerHTML === "0") {
    counterBox.innerHTML = 10;
    setTimeout(() => takeDownBox("house1"), 300);
  }
}
function upgradeLvl(houseLvl, degree) {
  //degree => buy or merge
  const newhouseStars = houseStars[houseLvl] * starsTransfer[degree];
  let newNumeratorStars = parseInt(lvlNumerator.innerHTML) + newhouseStars;
  let denominatorStars = parseInt(lvlDenominator.innerHTML);

  while (newNumeratorStars >= denominatorStars) {
    const currentLvl = document.querySelector(".score .levels i > span");
    const restAmount = newNumeratorStars - denominatorStars;
    const nextLvlIndex = +currentLvl.innerHTML + 1;
    const nextLvlAmount = lvlSize[nextLvlIndex];

    lvlNumerator.innerHTML = newNumeratorStars = restAmount;
    lvlDenominator.innerHTML = denominatorStars = nextLvlAmount;

    method.creatTown(1);

    currentLvl.style.fontSize = "18px";
    lvlDenominator.style.color = "orange";
    currentLvl.innerHTML = nextLvlIndex;
    setTimeout(() => {
      currentLvl.style.fontSize = "";
      lvlDenominator.style.color = "";
    }, 600);
    if (+currentLvl.innerText <= 8) unlockHouse();
  }
  if (newNumeratorStars < denominatorStars) {
    lvlNumerator.innerHTML = newNumeratorStars;
  }
  lvlBar.style.width = calcLvlWidth();
}
function calcLvlWidth() {
  return `${(lvlNumerator.innerHTML * 100) / lvlDenominator.innerHTML}%`;
}
function unlockHouse() {
  const unlockedHouses = document.querySelectorAll(" .item:not(.unknown)");
  const firstLockedIndex = unlockedHouses.length;
  const targetHouse = houses[firstLockedIndex];
  const targetHousePrice = housesPrice[firstLockedIndex];
  //replace

  replaceImg(firstLockedIndex, targetHouse);
  replacePrice(firstLockedIndex, targetHousePrice, targetHouse);
}
function replaceImg(index, targetHouse) {
  const store = document.querySelector(".items");
  let tg = store.children[index];
  tg.children[0].replaceChild(
    new House(targetHouse).image,
    tg.children[0].children[0]
  );
  tg.children[0].children[1].innerHTML = `${targetHouse}`;
  tg.classList.remove("unknown");
}
function replacePrice(index, price, targetHouse) {
  const store = document.querySelector(".items");
  let tg = store.children[index];

  tg.children[1].innerHTML = method.CreateButton(price);
  tg.children[1].addEventListener("click", () => {
    const item = document.querySelector(`.items .item:has(.${targetHouse})`)
      .children[1].children[0].children[1];
    const buyPrice = item.children[1].innerText;
    const bpUnit = item.children[2].innerText;

    const total = method.realPrice(earnTotalValueVar, earnTotalUnit.innerHTML);
    let priceHouse = method.realPrice(buyPrice, bpUnit);
    if (total >= priceHouse) {
      if (takeDownBox(targetHouse)) {
        const rest = method.transfer(total - priceHouse);
        priceHouse = method.transfer(priceHouse + priceHouse * 0.1);
        item.children[1].innerText = priceHouse[0].toFixed(2);
        item.children[2].innerText = priceHouse[1];
        //
        earnTotalValueVar = rest[0];
        earnTotalValue.innerHTML = earnTotalValueVar.toFixed(2);
        earnTotalUnit.innerHTML = rest[1];
      } else method.showNoftif("no space");
    } else method.showNoftif("no money");
  });
}
//START MAIN--------------------------------------
let [gifTimer, dropBoxTimer, totalCoinTimer] = [1000, 1000, 10000];
const store = document.querySelector(".bottom i:last-of-type");
//start show or hide store
const closeBtn = document.querySelector(".buy-store > .close");
const storeBtn = document.querySelector(".bottom i.store");
closeBtn.addEventListener("click", () => method.showHide(".all", "none"));
storeBtn.addEventListener("click", () => method.showHide(".all", "flex"));
//end show or hide store
//start counter of box creator
let counterBox = document.querySelector(".bottom .box-upcoming span");
let intervalId = setInterval(counter, dropBoxTimer);
//end counter of box creator
//start merge town
document
  .querySelectorAll(".land .town-border .town:has(img:not(.house7))")
  .forEach((e) => {
    e.addEventListener("click", () => toggleTownClicked(e));
  });
//end merge town
//start timer of gift box
let buttonTimer = document.querySelector(".buy-store .top button");
buttonTimer.addEventListener("click", () => dropgift());
let timerInterval = setInterval(decrementTimer, gifTimer);
//end timer of gift box
//start coins
let earnPerMuniteValue = document.querySelector(".container  .rate .value");
let earnPerMuniteUnit = document.querySelector(".container  .rate .unit");
let earnPerMuniteValueVar = parseFloat(earnPerMuniteValue.innerHTML);
//----
let earnTotalValue = document.querySelector(".container .score .total .value");
let earnTotalValueVar = parseFloat(earnTotalValue.innerHTML);
let earnTotalUnit = document.querySelector(".container .score .total .unit");
let coinsTotalInterval;
updateAll();
//end coins
//start levels
let lvlNumerator = document.querySelector(
  ".container .score .levels .value span:first-of-type"
);
let lvlDenominator = document.querySelector(
  ".container .score .levels .value span:last-of-type"
);
let lvlBar = document.querySelector(".container .score .levels .progress");
lvlBar.style.width = calcLvlWidth();
//end levels
let endGame = setInterval(() => method.keepGaing(), 3000);
//
const speedOptions = document.querySelectorAll('input[name="speed"]');
speedOptions.forEach((option) => {
  option.addEventListener("change", () => {
    const op = +option.value;
    const nv = [1000 / op, 1000 / op, 1000 / op];
    clearInterval(timerInterval);
    clearInterval(intervalId);
    clearInterval(coinsTotalInterval);
    [gifTimer, dropBoxTimer, totalCoinTimer] = nv;
    timerInterval = setInterval(decrementTimer, gifTimer);
    intervalId = setInterval(counter, dropBoxTimer);
    coinsTotalInterval = setInterval(coinsTotal, totalCoinTimer);
  });
});
//END MAIN
export { endGame };
