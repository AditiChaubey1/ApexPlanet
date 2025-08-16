// Get elements
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

// Load tasks from localStorage on page load
window.onload = function () {
  loadTasks();
};

function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText === "") return;

  const task = {
    text: taskText,
    completed: false,
  };

  let tasks = getTasksFromStorage();
  tasks.push(task);
  saveTasksToStorage(tasks);
  taskInput.value = "";
  renderTasks();
}

function renderTasks() {
  const tasks = getTasksFromStorage();
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = task.completed ? "completed" : "";

    const span = document.createElement("span");
    span.textContent = task.text;
    span.onclick = () => toggleComplete(index);

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.onclick = () => deleteTask(index);

    li.appendChild(span);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);
  });
}

function toggleComplete(index) {
  const tasks = getTasksFromStorage();
  tasks[index].completed = !tasks[index].completed;
  saveTasksToStorage(tasks);
  renderTasks();
}

function deleteTask(index) {
  let tasks = getTasksFromStorage();
  tasks.splice(index, 1);
  saveTasksToStorage(tasks);
  renderTasks();
}

function getTasksFromStorage() {
  return JSON.parse(localStorage.getItem("tasks")) || [];
}

function saveTasksToStorage(tasks) {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  renderTasks();
}
