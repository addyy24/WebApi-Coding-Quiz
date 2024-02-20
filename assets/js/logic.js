// Add variables that keep track of the quiz "state"
let currentQuestionIndex = 0;
let time = questions.length * 15;
let timerId;

// Add variables to reference DOM elements
let questionsEl = document.getElementById('questions');
let startBtn = document.getElementById('start-btn');
let choicesEl = document.getElementById('choices');
let initialsEl = document.getElementById('initials');
let submitBtn = document.getElementById('submit-btn');
let feedbackEl = document.getElementById('feedback');
let timerEl = document.getElementById('timer');
let score = 0;

// Reference the sound effects
let sfxRight = new Audio('assets/sfx/correct.wav');
let sfxWrong = new Audio('assets/sfx/incorrect.wav');

// Use addEventListener for better practice
startBtn.addEventListener('click', startQuiz);

function startQuiz() {
  document.getElementById('start-screen').classList.add('hide');
  document.getElementById('questions').classList.remove('hide');
  time = questions.length * 15;
  currentQuestionIndex = 0;
  score = 0;

  timerId = setInterval(clockTick, 1000);

  getQuestion();
}

function getQuestion() {
  let currentQuestion = questions[currentQuestionIndex];

  document.getElementById('question-title').textContent = currentQuestion.title;
  choicesEl.innerHTML = ''; // Use the existing choicesEl variable

  currentQuestion.choices.forEach(function (choice, index) {
    let choiceBtn = document.createElement('button');
    choiceBtn.textContent = choice;
    choiceBtn.setAttribute('data-index', index);
    choiceBtn.addEventListener('click', questionClick);
    choicesEl.appendChild(choiceBtn);
  });
}

function questionClick(event) {
  let selectedChoiceIndex = parseInt(event.target.getAttribute('data-index'));
  let currentQuestion = questions[currentQuestionIndex];

  if (selectedChoiceIndex === currentQuestion.choices.indexOf(currentQuestion.answer)) {
    score++;
    feedbackEl.textContent = 'Correct!';
  } else {
    time -= 15;
    feedbackEl.textContent = 'Wrong!';
  }

  feedbackEl.setAttribute('class', 'feedback');
  setTimeout(function () {
    feedbackEl.setAttribute('class', 'feedback hide');
  }, 500);

  currentQuestionIndex++;

  if (currentQuestionIndex < questions.length) {
    getQuestion();
  } else {
    endQuiz();
  }
}

function endQuiz() {
  clearInterval(timerId);

  document.getElementById('questions').classList.add('hide');
  document.getElementById('end-screen').classList.remove('hide');

  document.getElementById('final-score').textContent = score;
}

function clockTick() {
  time--;
  timerEl.textContent = 'Time: ' + time;

  if (time <= 0) {
    endQuiz();
  }
}

function saveHighScore() {
  let initials = initialsEl.value.trim();

  if (initials !== '') {
    let highScores = JSON.parse(localStorage.getItem('highScores')) || [];

    let newScore = {
      initials: initials,
      score: score
    };

    highScores.push(newScore);

    localStorage.setItem('highScores', JSON.stringify(highScores));

    window.location.href = 'highscores.html';
  }
}

function checkForEnter(event) {
  if (event.key === 'Enter') {
    saveHighScore();
  }
}

// Use addEventListener for better practice
submitBtn.addEventListener('click', saveHighScore);
initialsEl.addEventListener('keyup', checkForEnter);
