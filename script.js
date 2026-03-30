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

let currentQuestionIndex = 0;
let score = 0;
let timer;
let timeLeft = 15;

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const nextBtn = document.getElementById("next-btn");
const scoreContainer = document.getElementById("score-container");
const scoreEl = document.getElementById("score");
const highScoreEl = document.getElementById("high-score");
const restartBtn = document.getElementById("restart-btn");
const timeEl = document.getElementById("time");

function startTimer() {
  timeLeft = 15;
  timeEl.innerText = timeLeft;
  timer = setInterval(() => {
    timeLeft--;
    timeEl.innerText = timeLeft;
    if (timeLeft <= 0) {
      clearInterval(timer);
      disableOptions();
      showCorrectAnswer();
    }
  }, 1000);
}

function showQuestion() {
  clearInterval(timer);
  startTimer();
  const q = questions[currentQuestionIndex];
  questionEl.innerText = q.question;
  optionsEl.innerHTML = "";
  q.options.forEach(option => {
    const button = document.createElement("button");
    button.innerText = option;
    button.classList.add("option");
    button.addEventListener("click", () => selectAnswer(button, q.answer));
    optionsEl.appendChild(button);
  });
}

function selectAnswer(button, correctAnswer) {
  clearInterval(timer);
  const selected = button.innerText;
  if (selected === correctAnswer) {
    button.classList.add("correct");
    score++;
  } else {
    button.classList.add("incorrect");
    showCorrectAnswer();
  }
  disableOptions();
}

function disableOptions() {
  Array.from(optionsEl.children).forEach(btn => btn.disabled = true);
}

function showCorrectAnswer() {
  const correctAnswer = questions[currentQuestionIndex].answer;
  Array.from(optionsEl.children).forEach(btn => {
    if (btn.innerText === correctAnswer) btn.classList.add("correct");
  });
}

nextBtn.addEventListener("click", () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
});

function showScore() {
  document.getElementById("question-container").classList.add("hidden");
  scoreContainer.classList.remove("hidden");
  scoreEl.innerText = score;

  const highScore = localStorage.getItem("highScore") || 0;
  if (score > highScore) localStorage.setItem("highScore", score);
  highScoreEl.innerText = localStorage.getItem("highScore");
}

restartBtn.addEventListener("click", () => {
  currentQuestionIndex = 0;
  score = 0;
  scoreContainer.classList.add("hidden");
  document.getElementById("question-container").classList.remove("hidden");
  showQuestion();
});

showQuestion();