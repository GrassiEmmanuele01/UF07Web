const tasks = [];

function addTask() {
  const taskInput = document.getElementById("inputTask");
  const taskName = taskInput.value.trim();

  console.log(taskName);

  // controllo che il valore inserito non sia nullo
  if (taskName === "") {
    alert("Inserisci un nome valido per l'attività!");
    return;
  }

  tasks.push(taskName);
  renderTasks();
  taskInput.value = "";
}

function removeTask(index) {
    console.log("Indice cancellato:"+index)
  tasks.splice(index, 1);
  renderTasks();
}

function renderTasks() {
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    const taskItem = document.createElement("div");
    taskItem.className = "task-item";
    taskItem.innerHTML = `<span>${task}</span>
        <button onclick="removeTask(${index})">Rimuovi</button>`;
    taskList.appendChild(taskItem);
  });
}
