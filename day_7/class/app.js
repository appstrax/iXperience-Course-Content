class Task {
  constructor(id, title) {
    this.id = id;
    this.title = title;
    this.priorityId = "";
    this.priority = {};
  }
}

class TaskListPage {
  constructor() {
    this.tasks = [];

    this.priorities = [];

    
    // 1. Fetch all priorities from firebase
    // 2. Loop through all firebases tasks
    // for (var k = 0; k < fbTasksDb.length; k++) {
    //   const priorityId = fbTasksDb[k].priorityId;
    //   //    look up the priority by ID
    //   const priority = {}; // findById();
    //   const task = new Task(id, title, priority);
    // }

    // const db = firebase.database();

    // Create or Update (PUT)
    // const accountsDb = db.ref('accounts');
    // accountsDb.set({
    //   property1: "Test",
    //   property2: "testing..."
    // });

    // db.ref("new-keys").set({test: "test"});
    // db.ref("new-keys-2").set({test: "testing..."});

    // const massUpdate = {};
    // massUpdate['/new-keys-zz'] = {test: "lolol"};
    // massUpdate['/new-keys-2-zz'] = {test: "lololol..."};
    // console.log(massUpdate);

    // const massUpdatez = {
    //   "/new-keys": {test: "test"},
    //   "/new-keys-2": {test: "testing..."}
    // };

    // db.ref().update(massUpdate);

    // db.ref("accounts/property1").set("lololol");

    // const taskId = "-MC8Fx4kQmlyOns9hLQA";
    // db.ref("tasks/" + taskId).remove();
    // db.ref("tasks").child(taskId).remove();

    // const newTaskRef = db.ref("tasks").push({
    //   title: "new title"
    // });
    // console.log(newTaskRef.key);

    // var newTaskKey = firebase.database().ref().child('tasks').push().key;
    // console.log(newTaskKey);

    // firebase.database().ref("tasks").child(newTaskKey).set({
    //   title: "My new task..."
    // });

    // firebase.database().ref("tasks").on("value", function(snapshot) {
    //   const data = snapshot.val();
    //   console.log("Repeated: ", data);
    // });

    // firebase.database().ref("tasks").once("value", function(snapshot) {
    //   const data = snapshot.val();
    //   console.log("Once: ", data);
    // });

    // const url = "https://ix-2020-green-miki.firebaseio.com/tasks.json";
    // fetch(url)
    //   .then((response) => {
    //     response
    //       .json()
    //       .then((data) => {
    //         // const keys = Object.keys(data);
    //         // console.log(keys);
    //         // console.log(data["task-1"]);

    //         Object.keys(data).forEach(key => {
    //           const taskData = data[key];
    //           console.log(taskData);
    //           const task = new Task(key, taskData.title);
    //           this.tasks.push(task);

    //           const taskListElement = document.getElementById("taskList");
    //           const row = document.createElement("tr");
    //           row.setAttribute("data-task-id", task.id);
    //           row.innerHTML = `
    //           <td>${task.title}</td>
    //           <td><button data-action="edit" data-task-id="${task.id}" class="btn btn-primary">Edit</button></td>
    //           `;
    //           taskListElement.appendChild(row);
    //         });

    //         // const arrTaskData = Object.values(data);
    //       })
    //       .catch((err) => console.log(err));
    //   })
    //   .catch((err) => console.log(err));
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

    const url = "https://ix-2020-green-miki.firebaseio.com/tasks.json";
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify(task)
    }).then(response => {
      response.json().then(data => {
        console.log(data);
        const taskId = data.name;
      }).catch(err => console.log(err));
    }).catch(err => console.log(err));
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

// const MyDatabase = {
//   key1: "value abc",
//   key2: "",
//   key3: 5,
//   key4: {
//     subKey1: "abc",
//     subKey2: {
//       subSubKey1: "abc"
//     }
//   }
// }

// const json = JSON.stringify(MyDatabase);
// {
//   "key1": "value abc",
//   "key2": "",
//   "key3": 5
// }

// const back = JSON.parse(json);

// HTTP GET MyDatabase/key4/subKey1
