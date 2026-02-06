// import { beginnerCombo, learnerCombo, intermediateCombo, advancedCombo } from '../data/combos.js'
const beginnerCombo = [
  [1, 2],
  [1, 1],
  [1, 2, 1],
  [1, 3],
  [1, 1, 2],
  [2, 1],
  [1, 6]
  [1, 2, 3],
  [3, 2],
  [2, 5, 4],
  [2, 3],
  [1, 5],
  [1, 4]
];

const learnerCombo = [
  [1, 2, 3],        // jab–cross–lead hook
  [1, 2, 3, 2],     // classic boxing combo
  [1, 3, 2],        // jab–hook–cross
  [2, 3, 2],  
  [2, "roll", 3, 2],      // cross–hook–cross
  [1, 2, 5, 2],     // jab–cross–lead uppercut–cross
  [1, 6, 3],        // jab–rear uppercut–lead hook
  [3, 2, 3],        // hook–cross–hook
  [1, 5, 2, 3],     // jab–lead uppercut–cross–hook
  [2, 5, 2],        // cross–lead uppercut–cross
  [1, 2, 3, 6]      // jab–cross–hook–rear uppercut
];

const intermediateCombo = [
  ["slip", 2, 3],
  [1, "slip", 2, 3],
  ["roll", 3, 2],
  [1, 2, "angle", 3],
  ["pull", 2, 3],
  [1, 5, 2, 3],
  [2, "roll", 3, 2],
  [1, "angle", 2, 3],
  ["slip", 2, "angle", 3],
  [1, 2, "roll", 6],
  ["pull", 2, "angle", 3],
  ["slip", 3, 2],
  [1, "slip", 3, 2],
  ["roll", 5, 3],
  [2, "angle", 3, 2],
  ["pull", 3, 2],
  [1, 2, "angle", 6],
  ["slip", 2, 3, 2],
  [2, "roll", 5, 3],
  [1, "pull", 2, 3],
  ["roll", 3, "angle", 2]
];

const advancedCombo = [
  ["slip", 2, 3, 2],
  [1, "slip", 2, 3, 2],
  ["roll", 3, 2, 3],
  [1, 2, "angle", 3, 2],
  ["pull", 2, 3, 2],

  [1, "slip", 2, "angle", 3],
  [2, "roll", 3, 2, 3],
  ["slip", 2, 3, "angle", 2],
  [1, 2, "roll", 6, 3],
  ["pull", 2, 3, "angle", 2],

  [1, "slip", 3, 2, 3],
  ["roll", 5, 3, 2],
  [2, "angle", 3, 2, 3],
  [1, 2, "pull", 2, 3],
  ["slip", 2, "roll", 3, 2, 3],

  [1, 2, "angle", 6, 3, 2],
  ["pull", 2, 3, "roll", 5, 3],
  [1, "slip", 2, 3, "angle", 2]
];
const bell = document.querySelector('#bell');

let timerInterval = null;
   let totalSeconds = 0;
   let isRunning = false;

let activeComboArray = beginnerCombo;
// let comboInterval = null;
let comboTimeout = null;

// ---- combo picker ----
function pickRandomCombo() {
  const randomIndex = Math.floor(Math.random() * activeComboArray.length);
  const randomCombo = activeComboArray[randomIndex];
  console.log("Your next combo:", randomCombo);
  // Convert combo to readable speech
  const spokenCombo = randomCombo.join(" ");

  const utterance = new SpeechSynthesisUtterance(spokenCombo);

  // Optional: make speech faster
  utterance.rate = 1.5; // normal = 1
  utterance.pitch = 0.9;
  utterance.volume = 1.5;

  utterance.onend = () => {

    comboTimeout = setTimeout(pickRandomCombo, 1000);
  };

  // Stop any queued speech
  speechSynthesis.cancel();
  speechSynthesis.speak(utterance);
}

// ---- button handling ----
const buttons = document.querySelectorAll('#beginner, #learner, #intermediate, #advanced');

buttons.forEach(button => {
  button.addEventListener('click', () => {
    // remove 'on' from all buttons
    buttons.forEach(btn => btn.classList.remove('on'));

    // add 'on' to clicked button
    button.classList.add('on');

    // switch active array
    if (button.id === 'beginner') {
      activeComboArray = beginnerCombo;
    } else if (button.id === 'learner') {
      activeComboArray = learnerCombo;
    }
    else if (button.id === 'intermediate') {
      activeComboArray = intermediateCombo;
    } else if (button.id === 'advanced') {
      activeComboArray = advancedCombo;``
    }

    // restart interval safely
    // clearInterval(comboInterval);
    // comboInterval = setInterval(pickRandomCombo, 1000);
  });
});
 function stopCombo(){
  clearTimeout(comboTimeout);
  comboTimeout = null;
  speechSynthesis.cancel();
  console.log("Combo has stopped");
 }

// ---- stop button ----
document.querySelector('#stop').addEventListener('click', () => {
 stopCombo();
   clearInterval(timerInterval);
  timerInterval = null;
  isRunning = false;
  totalSeconds = 0;
  updateDisplay(0);
  toggleBtn.textContent = "Start";
 
  
 
});

// ----- start button ---------
const toggleBtn = document.querySelector('#start');

toggleBtn.addEventListener('click', () => {
  if (!document.querySelector(".level.on")) {
  alert("Select a difficulty");
  return;
}
 

      if (!isRunning && totalSeconds === 0) {
        const h = parseInt(document.getElementById("hours").value) || 0;
        const m = parseInt(document.getElementById("minutes").value) || 0;
        const s = parseInt(document.getElementById("seconds").value) || 0;

        totalSeconds = h * 3600 + m * 60 + s;

        if (totalSeconds < 30) {
  alert("Minimum timer is 30 seconds");
  totalSeconds = 0;
  return;
}

 // if (totalSeconds === 0) return
  // prevent multiple intervals from running
  if (!comboTimeout) {
    bell.play();
    setTimeout(() => {
      pickRandomCombo()
    }, 3000);
  }

        if (totalSeconds <= 0) return;

        updateDisplay(totalSeconds);
        startTimer();
        toggleBtn.textContent = "Pause";
        isRunning = true;
        return;
        
      }

      // PAUSE
      if (isRunning) {
        clearInterval(timerInterval);
        timerInterval = null;
        isRunning = false;
        toggleBtn.textContent = "Resume";
        stopCombo();
        return;
      }

      // RESUME
      if (!isRunning && totalSeconds > 0) {
        startTimer();
         pickRandomCombo();
        toggleBtn.textContent = "Pause";
        isRunning = true;
      }
});


// function for the timer

    function startTimer() {
      timerInterval = setInterval(() => {
        totalSeconds--;
        updateDisplay(totalSeconds);

        if (totalSeconds <= 0) {
          clearInterval(timerInterval);
          timerInterval = null;
          isRunning = false;
          toggleBtn.textContent = "Start";
          console.log("timer has stopped");
          stopCombo();
          bell.play();
        }
      }, 1000);
    }

    function updateDisplay(seconds) {
      const h = String(Math.floor(seconds / 3600)).padStart(2, "0");
      const m = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
      const s = String(seconds % 60).padStart(2, "0");

      document.getElementById("display").textContent =
        `${h} : ${m} : ${s}`;
    }



    document.getElementById('toggle-btn').addEventListener('click', () => {
  document.querySelector('.level-buttons-div').classList.toggle('show');
  document.getElementById('overlay').classList.toggle('show');
});

document.addEventListener('click', (e) => {
  if (!document.querySelector('.level-buttons-div').contains(e.target) && !e.target.closest('#toggle-btn')) {
    document.querySelector('.level-buttons-div').classList.remove('show');
    document.getElementById('overlay').classList.remove('show');
  }
});
