import { objTransfer, lengthUnit, units } from "./data.js";
import { endGame } from "./main.js";
/*try to seperate functions in single file 
but to not success with them all 
bcz some functions have relation with some variables*/
function CreateButton(price) {
  return ` 
    <button>
    <div>BUY</div><div>
    <i class="fas fa-coins"></i>
    <span>${price}</span><span>k</span>
    </div>
    </button>`;
}
function transfer(money) {
  const lengthNumber = `${money}`.length;
  for (let lu in lengthUnit) {
    if (lengthNumber <= lu)
      return [objTransfer[lengthUnit[lu]](money), lengthUnit[lu]];
  }
}
function creatTown(count) {
  for (let index = 0; index < count; index++) {
    const townBorder = document.createElement("div");
    const town = document.createElement("div");
    townBorder.classList.add("town-border");
    town.classList.add("town");
    townBorder.appendChild(town);
    document.querySelector(".land").appendChild(townBorder);
  }
}
function deletePreviousClicked() {
  const elemClickedExcist = document.querySelector(".clicked");
  if (elemClickedExcist !== null) elemClickedExcist.classList.remove("clicked");
}
function deletePreviouSimilair() {
  document
    .querySelectorAll(".similair")
    .forEach((e) => e.classList.remove("similair"));
}
function clearLand() {
  deletePreviousClicked();
  deletePreviouSimilair();
}
function showHide(target, status) {
  document.querySelector(target).style.display = status;
  clearLand();
}
function checkNotOtherClicked(town) {
  if (
    document.querySelectorAll(".clicked").length > 0 &&
    !town.classList.contains("clicked")
  )
    deletePreviousClicked();
}
function coloredSimilair(town) {
  if (town.classList.contains("clicked")) {
    let houseClass = town.children[0].className;
    let similairElem = document.querySelectorAll(
      ".land .town:not(.clicked):has(img." + houseClass + ")"
    );
    similairElem.forEach((e) => e.classList.add("similair"));
  }
}
function upgradeClass(house) {
  let town1 = house.children[0].className;
  const houseNewLvl = parseInt(town1.split("house")[1]) + 1;
  return "house" + houseNewLvl;
}
function realPrice(p, u) {
  return +p * units[u];
}
function keepGaing() {
  let space = document.querySelectorAll(".town:not(:has(img))");
  if (space.length > 0) {
    // console.log("not completed 1");
    return;
  }

  for (let index = 1; index <= 6; index++) {
    const nOfHouse = document.querySelectorAll(`.land .house${index}`).length;
    if (nOfHouse > 1) {
      // console.log(`not h${index},=>${nOfHouse}n`);
      return;
    }
  }
  clearInterval(endGame);
  showNoftif("تهانينا ,لقد انهيت اللعبة , شكرا على تجربتك");
  setTimeout(() => location.reload(), 1000);
}
const nt = document.querySelector(".notification");
function showNoftif(text) {
  const info = document.querySelector(".notification .info");
  info.innerText = text;

  nt.classList.add("show");
  setTimeout(() => nt.classList.remove("show"), 1000);
}
//
export {
  keepGaing,
  CreateButton,
  transfer,
  creatTown,
  clearLand,
  deletePreviouSimilair,
  deletePreviousClicked,
  showHide,
  checkNotOtherClicked,
  coloredSimilair,
  upgradeClass,
  realPrice,
  showNoftif,
};
