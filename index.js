const holes = document.querySelectorAll(".hole");
const scoreBoard = document.querySelector(".score");
const moles = document.querySelectorAll(".mole");
const button = document.querySelector(".button");
let lastHole;
let timeUp = false;
let score = 0;

const randomTime = (min, max) => Math.round(Math.random() * (max - min) + min);
const randomHole = (holes) => {
  const idx = Math.floor(Math.random() * holes.length);
  const hole = holes[idx];
  if (hole === lastHole) randomHole(holes)
  return lastHole = hole; 
};
const peep = () => {
  const time = randomTime(200, 1000);
  const hole = randomHole(holes);
  hole.classList.add("up");
  setTimeout(() => { hole.classList.remove("up")
   if (!timeUp) peep();
  }, time);
};
const startGame = () => {
  scoreBoard.textContent = 0;
  timeUp = false;
  score = 0;
  peep();
  setTimeout(() => (timeUp = true), 15000);
};
const bonk = (e) => {
  if (!e.isTrusted) return;
  score++;
  e.target.parentNode.classList.remove("up");
  scoreBoard.textContent = score;
};
button.addEventListener("click", startGame);
moles.forEach((mole) => mole.addEventListener("click", bonk));
