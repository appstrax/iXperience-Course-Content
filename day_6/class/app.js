class Task {
  constructor(id, title) {
    this.id = id;
    this.title = title;
  }
}

class TaskListPage {
  constructor() {
    this.tasks = [];

    const url = "https://ix-2020-pink-miki.firebaseio.com/tasks.json";
    fetch(url)
      .then((response) => {
        response
          .json()
          .then((data) => {
            console.log(data);

            Object.keys(data).forEach(key => {
              console.log(key);
              console.log(data[key]);

              const taskId = data[key].id;
              const taskTitle = data[key].title;
              const task = new Task(taskId, taskTitle);
              this.tasks.push(task);

              const taskListElement = document.getElementById("taskList");
              const row = document.createElement("tr");
              row.setAttribute("data-task-id", task.id);
              row.innerHTML = `
              <td>${task.title}</td>
              <td><button data-action="edit" data-task-id="${task.id}" class="btn btn-primary">Edit</button></td>
              `;
              taskListElement.appendChild(row);
            });
          })
          .catch((err) => console.log("Err", err));
      })
      .catch((err) => console.log("Oops:", err));
  }

  addTask(title) {
    const taskId = this.tasks.length + 1;
    const task = new Task(taskId, title);
    this.tasks.push(task);

    const taskListElement = document.getElementById("taskList");
    const row = document.createElement("tr");
    row.setAttribute("data-task-id", task.id);
    row.innerHTML = `
    <td>${task.title}</td>
    <td><button data-action="edit" data-task-id="${task.id}" class="btn btn-primary">Edit</button></td>
    `;
    taskListElement.appendChild(row);
    document.getElementById("task").value = "";

    const url = "https://ix-2020-pink-miki.firebaseio.com/tasks.json";

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(task),
    })
      .then((response) => {
        response
          .json()
          .then((resData) => console.log(resData))
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  }

  startEdittingTask(taskId) {
    for (let k = 0; k < this.tasks.length; k++) {
      if (this.tasks[k].id == taskId) {
        const task = this.tasks[k];

        const taskInputElement = document.getElementById("task");
        taskInputElement.value = task.title;
        taskInputElement.setAttribute("data-task-id", task.id);
        document.getElementById("addBtn").innerText = "Save";
      }
    }
  }

  saveTaskTitle(taskId, taskTitle) {
    // this.tasks.forEach(function (task) {
    //   if (task.id == taskId) {
    //   }
    // });

    // const task = this.tasks.find(function (task) {
    //   if (task.id == taskId) return true;
    // });

    const task = this.tasks.find((task) => task.id == taskId);
    if (!task) return;

    task.title = taskTitle;

    const existingRow = document.querySelector(`tr[data-task-id="${task.id}"]`);
    if (!existingRow) return;

    existingRow.children[0].innerHTML = task.title;
    const taskInput = document.getElementById("task");
    taskInput.removeAttribute("data-task-id");
    taskInput.value = "";
    document.getElementById("addBtn").innerText = "Add";
  }
}

const taskListPage = new TaskListPage();

document.getElementById("addBtn").addEventListener("click", (e) => {
  const taskInputElement = document.getElementById("task");
  const taskTitle = taskInputElement.value;

  const existingTaskId = taskInputElement.getAttribute("data-task-id");
  if (existingTaskId) {
    taskListPage.saveTaskTitle(existingTaskId, taskTitle);
  } else {
    taskListPage.addTask(taskTitle);
  }
});

document.getElementById("taskList").addEventListener("click", (e) => {
  const action = e.target.getAttribute("data-action");
  if (action !== "edit") return;

  const taskId = e.target.getAttribute("data-task-id");
  taskListPage.startEdittingTask(taskId);
});

// function getData2(prop1, prop2) {

// }

// function getData(propertyHolder) {
//     //propertyHolder.prop1
//     //propertyHolder.prop2
// }

// function getData() {
//     this.prop1 = "a";
//     this.prop2 = "b";

//     getData2(this.prop1, this.prop2);
// }
