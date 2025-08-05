// -------------------- QUIZ --------------------
const quizData = [
  {
    question: "What is the capital of India?",
    options: ["Delhi", "Mumbai", "Chennai"],
    answer: "Delhi"
  },
  {
    question: "Which is the largest planet?",
    options: ["Earth", "Jupiter", "Mars"],
    answer: "Jupiter"
  },
  {
    question: "HTML stands for?",
    options: ["HyperText Markup Language", "Home Tool Markup Language", "Hyperlinks Text Marking Language"],
    answer: "HyperText Markup Language"
  }
];

let quizIndex = 0;

function loadQuiz() {
  const q = quizData[quizIndex];
  document.getElementById("question").textContent = q.question;
  const ansDiv = document.getElementById("answers");
  ansDiv.innerHTML = "";

  q.options.forEach(option => {
    const btn = document.createElement("button");
    btn.textContent = option;
    btn.onclick = () => {
      if (option === q.answer) {
        alert("✅ Correct!");
      } else {
        alert("❌ Wrong!");
      }
    };
    ansDiv.appendChild(btn);
  });
}

document.getElementById("nextBtn").onclick = () => {
  quizIndex++;
  if (quizIndex < quizData.length) {
    loadQuiz();
  } else {
    document.getElementById("quiz").innerHTML = "<h3>🎉 Quiz Finished!</h3>";
  }
};

loadQuiz();

// -------------------- CAROUSEL --------------------
const images = [
  "https://picsum.photos/id/237/300/200",
  "https://picsum.photos/id/238/300/200",
  "https://picsum.photos/id/239/300/200"
];
let currentImage = 0;

function showImage() {
  document.getElementById("carouselImage").src = images[currentImage];
}

function next() {
  currentImage = (currentImage + 1) % images.length;
  showImage();
}

function prev() {
  currentImage = (currentImage - 1 + images.length) % images.length;
  showImage();
}

showImage();

// -------------------- JOKE API --------------------
async function getJoke() {
  const res = await fetch("https://official-joke-api.appspot.com/random_joke");
  const data = await res.json();
  document.getElementById("joke").textContent = `${data.setup} 😂 ${data.punchline}`;
}
