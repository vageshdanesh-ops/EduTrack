let currentUser = null;

// Sample Learning Materials
const materialsData = [
  { title: "Java Basics", link: "https://www.youtube.com/watch?v=rZ41y93P2Qo&list=PL9gnSGHSqcnr_DxHsP7AW9ftq0AtAyYqJ" },
  { title: "HTML Introduction", link: "https://www.youtube.com/watch?v=G3e-cpL7ofc&t=62s" },
  { title: "Data Structures Notes", link: "https://www.jsscacs.edu.in/sites/default/files/Department%20Files/Data%20Structures%20Full%20Notes.pdf" }
];

// Sample Quiz Questions
const quizData = [
  {
    question: "What is JVM?",
    options: ["Java Virtual Machine", "Java Variable Method", "Joint Visual Model"],
    correct: 0
  },
  {
    question: "HTML stands for?",
    options: ["Hyper Text Markup Language", "High Text Machine Language", "Hyper Tool Markup Language"],
    correct: 0
  }
];

// LOGIN
function login() {
  const name = document.getElementById("username").value;
  if (!name) return alert("Enter your name");

  currentUser = name;
  localStorage.setItem("currentUser", name);

  document.getElementById("authSection").classList.add("hidden");
  document.getElementById("appSection").classList.remove("hidden");

  loadMaterials();
  loadQuiz();
  loadProgress();
  loadDiscussion();
}

// LOGOUT
function logout() {
  localStorage.removeItem("currentUser");
  location.reload();
}

// MATERIALS
function loadMaterials() {
  const materialsDiv = document.getElementById("materials");
  materialsDiv.innerHTML = "";

  materialsData.forEach(mat => {
    materialsDiv.innerHTML += `
      <div class="card">
        <b>${mat.title}</b><br>
        <a href="${mat.link}" target="_blank">View Resource</a>
      </div>
    `;
  });
}

// QUIZ
function loadQuiz() {
  const quizDiv = document.getElementById("quiz");
  quizDiv.innerHTML = "";

  quizData.forEach((q, index) => {
    quizDiv.innerHTML += `
      <div class="card">
        <p>${q.question}</p>
        ${q.options.map((opt, i) =>
          `<input type="radio" name="q${index}" value="${i}"> ${opt}<br>`
        ).join("")}
      </div>
    `;
  });
}

function submitQuiz() {
  let score = 0;

  quizData.forEach((q, index) => {
    const answer = document.querySelector(`input[name="q${index}"]:checked`);
    if (answer && parseInt(answer.value) === q.correct) {
      score++;
    }
  });

  alert("Your Score: " + score);

  let attempts = JSON.parse(localStorage.getItem("attempts")) || [];
  attempts.push(score);
  localStorage.setItem("attempts", JSON.stringify(attempts));

  loadProgress();
}

// PROGRESS
function loadProgress() {
  let attempts = JSON.parse(localStorage.getItem("attempts")) || [];

  let totalAttempts = attempts.length;
  let totalScore = attempts.reduce((a, b) => a + b, 0);

  document.getElementById("progress").innerHTML = `
    Attempts: ${totalAttempts}<br>
    Average Score: ${totalAttempts ? (totalScore/totalAttempts).toFixed(2) : 0}
  `;
}

// DISCUSSION
function postMessage() {
  const message = document.getElementById("messageInput").value;
  if (!message) return;

  let discussions = JSON.parse(localStorage.getItem("discussions")) || [];

  discussions.push({
    user: currentUser,
    message: message
  });

  localStorage.setItem("discussions", JSON.stringify(discussions));
  document.getElementById("messageInput").value = "";

  loadDiscussion();
}

function loadDiscussion() {
  let discussions = JSON.parse(localStorage.getItem("discussions")) || [];
  const discussionDiv = document.getElementById("discussion");
  discussionDiv.innerHTML = "";

  discussions.forEach(d => {
    discussionDiv.innerHTML += `
      <div class="card">
        <b>${d.user}</b>: ${d.message}
      </div>
    `;
  });
}

// Auto-login if user exists
window.onload = () => {
  const savedUser = localStorage.getItem("currentUser");
  if (savedUser) {
    currentUser = savedUser;
    document.getElementById("authSection").classList.add("hidden");
    document.getElementById("appSection").classList.remove("hidden");

    loadMaterials();
    loadQuiz();
    loadProgress();
    loadDiscussion();
  }
};
