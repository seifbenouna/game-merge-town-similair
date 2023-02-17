const HouseRate = {
  house1: 100,
  house2: 300,
  house3: 900,
  house4: 2300,
  house5: 5000,
  house6: 15000,
  house7: 40000,
};
const objTransfer = {
  "": (value) => value,
  k: (value) => value / 1000,
  m: (value) => value / 1000000,
  b: (value) => value / 1000000000,
  t: (value) => value / 1000000000000,
};
const units = {
  "": 1,
  k: 1000,
  m: 1000000,
  b: 1000000000,
  t: 1000000000000,
};
const lengthUnit = {
  3: "",
  6: "k",
  9: "m",
  12: "b",
  15: "t",
};
const houseStars = {
  house1: 50,
  house2: 600,
  house3: 700,
  house4: 900,
  house5: 1000,
  house6: 1600,
  house7: 3200,
};
const starsTransfer = {
  merge: 2,
  buy: 1.5,
};
let houses = [
  "house1",
  "house2",
  "house3",
  "house4",
  "house5",
  "house6",
  "house7",
];
class House {
  constructor(name) {
    this.image = document.createElement("img");
    this.image.className = name;
    this.image.src = "./imgs/" + name + ".png";
    this.image.setAttribute("earn", HouseRate[name]);
  }
}
let housesPrice = ["1", "3", "9", "23", "50", "150", "400"];
const lvlSize = [0, 1000, 3000, 9000, 10000, 30000, 60000, 90000, 1000000];

//
export {
  objTransfer,
  units,
  lengthUnit,
  houseStars,
  starsTransfer,
  houses,
  lvlSize,
  housesPrice,
  House,
};
