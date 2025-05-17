const tasks = [];
let filteredTasks = [...tasks];

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
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = "";

  filteredTasks.forEach((task, index) => {
    const taskItem = document.createElement("div");
    taskItem.className = "task-item status-" + task.status;
    taskItem.innerHTML = `
      <div class="task-content">
        <div class="task-icon">
          ${getTaskIcon(task.status)}
        </div>
        <span>${task.name}</span>
      </div>
      <div class="task-actions">
        <button onclick="updateTask(${tasks.indexOf(
          task
        )}, prompt('Nuovo nome:', '${task.name}'))">Modifica</button>
        <button onclick="changeStatus(${tasks.indexOf(
          task
        )}, 'todo')">Da fare</button>
        <button onclick="changeStatus(${tasks.indexOf(
          task
        )}, 'inprogress')">In corso</button>
        <button onclick="changeStatus(${tasks.indexOf(
          task
        )}, 'completed')">Completata</button>
        <button onclick="removeTask(${tasks.indexOf(task)})">Rimuovi</button>
      </div>
    `;
    taskList.appendChild(taskItem);
  });
}

function getTaskIcon(status) {
  switch (status) {
    case "todo":
      return `<svg viewBox="0 0 24 24" width="20" height="20"><circle cx="12" cy="12" r="9" fill="#e74c3c"/></svg>`;
    case "inprogress":
      return `<svg viewBox="0 0 24 24" width="20" height="20"><circle cx="12" cy="12" r="9" fill="#f1c40f"/><path fill="none" stroke="#2c3e50" stroke-width="2" d="M12 6v6l4 2"/></svg>`;
    case "completed":
      return `<svg viewBox="0 0 24 24" width="20" height="20"><circle cx="12" cy="12" r="9" fill="#2ecc71"/><path fill="none" stroke="white" stroke-width="2" d="M8 12l3 3 5-5"/></svg>`;
    default:
      return "";
  }
}

function updateTask(originalIndex, newName) {
  if (newName && newName.trim() !== "") {
    if (originalIndex >= 0 && originalIndex < tasks.length) {
      tasks[originalIndex].name = newName.trim();
      filterTasks();
    }
  }
}

function changeStatus(originalIndex, newStatus) {
  if (originalIndex >= 0 && originalIndex < tasks.length) {
    tasks[originalIndex].status = newStatus;
    filterTasks();
  }
}

function removeTask(originalIndex) {
  if (originalIndex >= 0 && originalIndex < tasks.length) {
    tasks.splice(originalIndex, 1);
    filterTasks();
  }
}

function filterTasks() {
  const filterStatus = document.getElementById("filterStatus").value;
  const searchQuery = document
    .getElementById("searchInput")
    .value.toLowerCase();

  filteredTasks = tasks.filter((task) => {
    const matchesStatus =
      filterStatus === "all" || task.status === filterStatus;
    const matchesSearch = task.name.toLowerCase().includes(searchQuery);
    return matchesStatus && matchesSearch;
  });

  renderTasks(filteredTasks);
}

function resetFilters() {
  document.getElementById("filterStatus").value = "all";
  document.getElementById("searchInput").value = "";
  filterTasks();
}
