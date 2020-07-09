class Task {
  constructor(id, title) {
    this.id = id;
    this.title = title;
  }
}

class TaskListPage {
  constructor() {
    this.tasks = [];

    this.taskInput = document.getElementById("task");
    this.listElement = document.getElementById("task-list");
  }

  onTaskSubmit(e) {
    e.preventDefault();
    const title = document.getElementById("task").value;
    const taskId = document.getElementById("task").getAttribute("data-task-id");
    if (taskId) {
      this.updateTask(taskId, title);
    } else {
      this.addTask(title);
    }
  }

  onTaskListClick(e) {
    e.preventDefault();

    const action = e.target.getAttribute("data-action");
    if (!action) return;

    const validActions = ["edit-task"];
    if (!validActions.includes(action)) return;

    const taskId = e.target.parentElement.parentElement.getAttribute(
      "data-task-id"
    );
    console.log(taskId);
    if (!taskId) return;

    this.editTask(taskId);
  }

  addTask(title) {
    const taskId = this.tasks.length + 1;
    const task = new Task(taskId, title);
    this.tasks.push(task);

    this.renderTaskHtml(task);
    this.clearTaskInput();
    console.log(task);
  }

  renderTaskHtml(task) {
    const row = document.createElement("tr");
    row.setAttribute("data-task-id", task.id);
    row.innerHTML = `
    <td>${task.title}</td>
    <td><i data-action="edit-task" class="fa fa-pencil-square-o edit" style="cursor: pointer;"></i></td
    `;

    this.listElement.appendChild(row);
  }

  clearTaskInput() {
    this.taskInput.value = "";
    this.taskInput.removeAttribute("data-task-id");
  }

  editTask(taskId) {
    const task = this.tasks.find((task) => task.id == taskId);
    if (!task) throw new Error("Task does not exist.");

    this.taskInput.value = task.title;
    this.taskInput.setAttribute("data-task-id", task.id);
  }

  updateTask(taskId, title) {
    const task = this.tasks.find((task) => task.id == taskId);
    task.title = title;

    const existingTask = document.querySelector(`tr[data-task-id="${taskId}"]`);
    existingTask.children[0].innerHTML = task.title;
    this.clearTaskInput();
  }
}

// HTML Dom Implementation below

const taskListPage = new TaskListPage();
document.getElementById("task-form").addEventListener("submit", function (e) {
  taskListPage.onTaskSubmit(e);
});

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind
document
  .getElementById("task-list")
  .addEventListener("click", taskListPage.onTaskListClick.bind(taskListPage));