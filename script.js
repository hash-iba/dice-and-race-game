"use strict";

//Assigning variables
const diceEl = document.querySelector(".dice");
const score0El = document.getElementById("score--0");
const score1El = document.getElementById("score--1");
const btnRollDice = document.querySelector(".btn--roll");
const btnNewGame = document.querySelector(".btn--new");
const btnHold = document.querySelector(".btn--hold");
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
const currentScore0El = document.getElementById("current--0");
const currentScore1El = document.getElementById("current--1");

//Starter values
let currentScore, score, activePlayer, playing;
const init = function () {
  currentScore = 0;
  activePlayer = 0;
  score = [0, 0];
  playing = true;

  diceEl.classList.add("hidden");
  score0El.textContent = score1El.textContent = 0;
  currentScore0El.textContent = currentScore1El.textContent = 0;

  player0El.classList.remove("player--winner");
  player1El.classList.remove("player--winner");
  player0El.classList.add("player--active");
  player1El.classList.remove("player--active");
};
init();

const switchPlayer = function () {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  document.getElementById(`score--${activePlayer}`).textContent = score[activePlayer];
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
};

//If 'Roll Dice' button is clicked
btnRollDice.addEventListener("click", function () {
  if (playing) {
    //Generate random dice value
    let dice = Math.trunc(Math.random() * 6) + 1;

    //Show dice image
    diceEl.src = `dice-${dice}.png`;
    diceEl.classList.remove("hidden");

    //Check if dice value is 1: not 1
    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent = currentScore;
    } else {
      //if value is 1
      switchPlayer();
    }
  }
});

//If 'Hold' button is clicked
btnHold.addEventListener("click", function () {
  if (playing) {
    score[activePlayer] += currentScore;

    //Check if score is less than 100
    if (score[activePlayer] < 100) switchPlayer();
    else {
      playing = false;
      document.getElementById(`current--${activePlayer}`).textContent = 0;
      document.getElementById(`score--${activePlayer}`).textContent = score[activePlayer];
      diceEl.classList.add("hidden");
      document.querySelector(`.player--${activePlayer}`).classList.add("player--winner");
      document.querySelector(`.player--${activePlayer}`).classList.remove("player--active");
    }
  }
});

btnNewGame.addEventListener("click", init);
