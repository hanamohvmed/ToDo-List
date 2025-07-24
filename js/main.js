const card = document.querySelector(".card");

const tasksContent = document.createElement("div");
tasksContent.className = "tasks-content";
card.appendChild(tasksContent);

const tasksToDo = document.createElement("span");
tasksToDo.className = "tasks-to-do";
tasksToDo.textContent = `Tasks to do - 0`;
tasksContent.appendChild(tasksToDo);

const doneTasksToDo = document.createElement("div");
doneTasksToDo.className = "done-tasks-content";
card.appendChild(doneTasksToDo);

const doneTaskMsg = document.createElement("span");
doneTaskMsg.className = "done-tasks-message";
doneTaskMsg.textContent = `Done - 0`;
doneTasksToDo.appendChild(doneTaskMsg);

const input = document.getElementById("input");
const btn = document.getElementById("add");

let taskData = JSON.parse(localStorage.getItem("taskData")) || {
  toDo: [],
  done: []
};

taskData.toDo.forEach((task) => createTaskElement(task, false));
taskData.done.forEach((task) => createTaskElement(task, true));

function updateStorage() {
  localStorage.setItem("taskData", JSON.stringify(taskData));
}

function taskCount() {
  const count = document.querySelectorAll(".task-box").length;
  tasksToDo.textContent = `Tasks to do - ${count}`;
}

function doneCount() {
  const count = document.querySelectorAll(".finish-task-box").length;
  doneTaskMsg.textContent = `Done - ${count}`;
}

function createTaskElement(text, isDone) {
  const taskBox = document.createElement("span");
  taskBox.className = isDone ? "finish-task-box" : "task-box";

  const inputParag = document.createElement("p");
  inputParag.className = isDone ? "finish-parag" : "parag";
  inputParag.textContent = text;
  taskBox.appendChild(inputParag);

  const iconDiv = document.createElement("div");
  iconDiv.className = "icon";
  taskBox.appendChild(iconDiv);

  const checkTask = document.createElement("span");
  checkTask.className = "material-symbols-outlined check";
  checkTask.textContent = isDone ? "" : "check";
  iconDiv.appendChild(checkTask);

  const deleteTask = document.createElement("span");
  deleteTask.className = "material-symbols-outlined delete";
  deleteTask.textContent = "delete";
  iconDiv.appendChild(deleteTask);

  if (isDone) doneTasksToDo.appendChild(taskBox);
  else tasksContent.appendChild(taskBox);

  taskCount();
  doneCount();

  deleteTask.onclick = function () {
    taskBox.remove();
    if (isDone) {
      taskData.done = taskData.done.filter((t) => t !== text);
    } else {
      taskData.toDo = taskData.toDo.filter((t) => t !== text);
    }

    updateStorage();
    taskCount();
    doneCount();
  };

  checkTask.onclick = function () {
    if (isDone) checkTask.remove();
    taskBox.remove();

    taskData.toDo = taskData.toDo.filter((t) => t !== text);
    taskData.done.push(text);
    createTaskElement(text, true);

    updateStorage();
    taskCount();
    doneCount();
  };
}

btn.onclick = function () {
  if (input.value === "") {
    var notyf = new Notyf();
    notyf.error("You must add a task first");
    return;
  }
  const taskText = input.value;
  taskData.toDo.push(taskText);
  updateStorage();
  createTaskElement(taskText, false);
  input.value = "";
  input.focus();
};
