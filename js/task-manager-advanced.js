 const tasks = [];

function addTask() {
  const taskInput = document.getElementById("taskInput");
  const taskName = taskInput.value.trim();
  if (taskName === "") {
    alert("Inserisci un nome valido per l'attività!");
    return;
    }
    tasks.push({ name: taskName, status: "todo" });
    renderTasks();
    taskInput.value = "";
}

function renderTasks(filteredTasks = tasks) {
      const taskList = document.getElementById('taskList');
      taskList.innerHTML = '';

      filteredTasks.forEach((task, index) => {
        const taskItem = document.createElement('div');
        taskItem.className = 'task-item';
        taskItem.innerHTML = `
          <span>${task.name} (${task.status})</span>
          <div>
            <button onclick="updateTask(${index}, prompt('Nuovo nome:', '${task.name}'))">Modifica</button>
            <button onclick="changeStatus(${index}, 'todo')">Da fare</button>
            <button onclick="changeStatus(${index}, 'inprogress')">In corso</button>
            <button onclick="changeStatus(${index}, 'completed')">Completata</button>
            <button onclick="removeTask(${index})">Rimuovi</button>
          </div>
        `;
        taskList.appendChild(taskItem);
      });
}

function updateTask(index, newName) {
  tasks[index].name = newName;
  renderTasks();
}

function changeStatus(index, newStatus) {
    tasks[index].status = newStatus;
    renderTasks();
}

function removeTask(index) {
  tasks.splice(index, 1);
  renderTasks();
}

function filterTasks() {
  const filterStatus = document.getElementById("filterStatus").value;
  const searchQuery = document
    .getElementById("searchInput")
    .value.toLowerCase();

  const filteredTasks = tasks.filter((task) => {
    const matchesStatus =
    filterStatus === "all" || task.status === filterStatus;
    const matchesSearch = task.name.toLowerCase().includes(searchQuery);
    return matchesStatus && matchesSearch;
    });

    renderTasks(filteredTasks);
}