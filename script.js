const questions = [
  { question: "Which language is used for web apps?", options: ["Python", "JavaScript", "C++", "Java"], answer: "JavaScript" },
  { question: "What does CSS stand for?", options: ["Cascading Style Sheets", "Computer Style Sheets", "Creative Style System", "Colorful Style Sheets"], answer: "Cascading Style Sheets" },
  { question: "HTML stands for?", options: ["HyperText Markup Language", "HighText Markup Language", "Hyper Tool Markup Language", "HyperText Markdown Language"], answer: "HyperText Markup Language" },
  { question: "Which tag is used for a line break in HTML?", options: ["<br>", "<break>", "<lb>", "<hr>"], answer: "<br>" },
  { question: "Which property changes text color in CSS?", options: ["color", "font-color", "text-color", "fgcolor"], answer: "color" },
  { question: "JavaScript is used for?", options: ["Styling", "Structure", "Logic/Interactivity", "Database"], answer: "Logic/Interactivity" },
  { question: "Which symbol is used for comments in JS?", options: ["//", "<!-- -->", "#", "**"], answer: "//" },
  { question: "Largest heading in HTML?", options: ["<h1>", "<h6>", "<head>", "<header>"], answer: "<h1>" },
  { question: "What does JSON stand for?", options: ["JavaScript Object Notation", "JavaScript Online Notation", "Java Style Object Notation", "Java Simple Object Name"], answer: "JavaScript Object Notation" },
  { question: "Attribute used for links in HTML?", options: ["src", "href", "link", "url"], answer: "href" }
];

const LETTERS = ["A", "B", "C", "D"];
const RING_CIRCUMFERENCE = 163.4;
const TIME_LIMIT = 15;

let currentQuestionIndex = 0;
let score = 0;
let timer;
let timeLeft = TIME_LIMIT;

const questionEl = document.getElementById("question");
const qNumberEl = document.getElementById("qNumber");
const optionsEl = document.getElementById("options");
const nextBtn = document.getElementById("next-btn");
const scoreContainer = document.getElementById("score-container");
const scoreEl = document.getElementById("score");
const highScoreEl = document.getElementById("high-score");
const restartBtn = document.getElementById("restart-btn");
const timeEl = document.getElementById("time");
const timerRing = document.getElementById("timerRing");
const dateField = document.getElementById("dateField");
const gradeLetterEl = document.getElementById("gradeLetter");
const gradePercentEl = document.getElementById("gradePercent");

/* ============================================
   Letterhead date
   ============================================ */
dateField.textContent = "Date: " + new Date().toLocaleDateString(undefined, {
  month: "short",
  day: "numeric",
  year: "numeric"
});

/* ============================================
   Timer
   ============================================ */
function startTimer() {
  timeLeft = TIME_LIMIT;
  timeEl.innerText = timeLeft;
  updateRing();
  timer = setInterval(() => {
    timeLeft--;
    timeEl.innerText = Math.max(timeLeft, 0);
    updateRing();
    if (timeLeft <= 0) {
      clearInterval(timer);
      disableOptions();
      showCorrectAnswer();
    }
  }, 1000);
}

function updateRing() {
  const fraction = Math.max(timeLeft, 0) / TIME_LIMIT;
  timerRing.style.strokeDashoffset = String(RING_CIRCUMFERENCE * (1 - fraction));
  timerRing.style.stroke = fraction <= 0.25 ? "#b7282e" : "#34302a";
}

/* ============================================
   Render question
   ============================================ */
function showQuestion() {
  clearInterval(timer);
  startTimer();

  const q = questions[currentQuestionIndex];
  qNumberEl.textContent = `Q${currentQuestionIndex + 1}`;
  questionEl.innerText = q.question;
  optionsEl.innerHTML = "";

  q.options.forEach((option, i) => {
    const button = document.createElement("button");
    button.classList.add("option");
    button.innerHTML = `
      <span class="option-bubble">${LETTERS[i]}</span>
      <span class="option-label">${option}</span>
      <span class="option-mark"></span>
    `;
    button.addEventListener("click", () => selectAnswer(button, q.answer));
    optionsEl.appendChild(button);
  });
}

/* ============================================
   Answer handling
   ============================================ */
function selectAnswer(button, correctAnswer) {
  clearInterval(timer);
  const selected = button.querySelector(".option-label").innerText;
  button.classList.add("selected");

  if (selected === correctAnswer) {
    button.classList.add("correct");
    button.querySelector(".option-mark").textContent = "✓";
    score++;
  } else {
    button.classList.add("incorrect");
    button.querySelector(".option-mark").textContent = "✗";
    showCorrectAnswer();
  }
  disableOptions();
}

function disableOptions() {
  Array.from(optionsEl.children).forEach((btn) => (btn.disabled = true));
}

function showCorrectAnswer() {
  const correctAnswer = questions[currentQuestionIndex].answer;
  Array.from(optionsEl.children).forEach((btn) => {
    const label = btn.querySelector(".option-label").innerText;
    if (label === correctAnswer && !btn.classList.contains("correct")) {
      btn.classList.add("correct");
      btn.querySelector(".option-mark").textContent = "✓";
    }
  });
}

/* ============================================
   Navigation
   ============================================ */
nextBtn.addEventListener("click", () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
});

/* ============================================
   Grade lettering
   ============================================ */
function gradeFor(percent) {
  if (percent >= 90) return "A+";
  if (percent >= 80) return "A";
  if (percent >= 70) return "B";
  if (percent >= 60) return "C";
  if (percent >= 50) return "D";
  return "F";
}

function showScore() {
  document.getElementById("question-container").classList.add("hidden");
  scoreContainer.classList.remove("hidden");
  scoreEl.innerText = score;

  const percent = Math.round((score / questions.length) * 100);
  gradePercentEl.textContent = `${percent}%`;
  gradeLetterEl.textContent = gradeFor(percent);

  const highScore = Number(localStorage.getItem("highScore") || 0);
  if (score > highScore) localStorage.setItem("highScore", score);
  highScoreEl.innerText = localStorage.getItem("highScore");
}

/* ============================================
   Restart
   ============================================ */
restartBtn.addEventListener("click", () => {
  currentQuestionIndex = 0;
  score = 0;
  scoreContainer.classList.add("hidden");
  document.getElementById("question-container").classList.remove("hidden");
  showQuestion();
});

showQuestion();
