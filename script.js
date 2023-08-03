const Colors = {
  GREEN: 0,
  RED: 1,
  YELLOW: 2,
  BLUE: 3,
};

let order = [];
let clickedOrder = [];
let score = 0;

const buttonStart = document.querySelector(".start-button");
const scoreElement = document.querySelector("#score-value");

const blue = document.querySelector(".blue");
const red = document.querySelector(".red");
const green = document.querySelector(".green");
const yellow = document.querySelector(".yellow");

const shuffleOrder = () => {
  const colorOrder = Math.floor(Math.random() * 4);
  order.push(colorOrder);
  clickedOrder = [];

  order.forEach((color, index) => {
    const elementColor = getColorElement(color);
    lightColor(elementColor, index + 1);
  });
};

const lightColor = (element, number) => {
  number = number * 500;
  setTimeout(() => {
    element.classList.add("selected", "blink");
  }, number - 250);
  setTimeout(() => {
    element.classList.remove("selected", "blink");
  }, number);
};

const checkOrder = () => {
  for (let i = 0; i < clickedOrder.length; i++) {
    if (clickedOrder[i] !== order[i]) {
      scoreElement.textContent = 0;
      gameOver();
      return;
    }
  }
  if (clickedOrder.length === order.length) {
    setTimeout(() => {
      scoreElement.textContent = score;
      nextLevel();
    }, 1000);
  }
};

const click = (color) => {
  clickedOrder.push(color);
  const element = getColorElement(color);
  element.classList.add("selected", "blink");

  setTimeout(() => {
    element.classList.remove("selected", "blink");
    checkOrder();
  }, 250);
};

const getColorElement = (color) => {
  switch (color) {
    case Colors.GREEN:
      return green;
    case Colors.RED:
      return red;
    case Colors.YELLOW:
      return yellow;
    case Colors.BLUE:
      return blue;
    default:
      throw new Error("Cor inválida.");
  }
};

const nextLevel = () => {
  score++;
  shuffleOrder();
};

const gameOver = () => {
  alert(`Você perdeu o jogo!`);
  order = [];
  clickedOrder = [];
};

const playGame = () => {
  score = 0;
  nextLevel();
};

green.onclick = () => click(Colors.GREEN);
red.onclick = () => click(Colors.RED);
yellow.onclick = () => click(Colors.YELLOW);
blue.onclick = () => click(Colors.BLUE);
buttonStart.onclick = () => playGame();
