// Contact Form Validation
document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();
  const formMessage = document.getElementById("formMessage");

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!name || !email || !message) {
    formMessage.textContent = "Please fill out all fields.";
    return;
  }

  if (!emailRegex.test(email)) {
    formMessage.textContent = "Invalid email format.";
    return;
  }

  formMessage.style.color = "green";
  formMessage.textContent = "Form submitted successfully!";
});

// To-Do List DOM Manipulation
function addTask() {
  const input = document.getElementById("todoInput");
  const taskText = input.value.trim();

  if (taskText === "") return;

  const li = document.createElement("li");
  li.textContent = taskText;

  const removeBtn = document.createElement("button");
  removeBtn.textContent = "X";
  removeBtn.onclick = () => li.remove();

  li.appendChild(removeBtn);
  document.getElementById("todoList").appendChild(li);

  input.value = "";
}