const tasks = [];
const deletedTasks = [];

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
  const todoList = document.getElementById("todoList");
  const inProgressList = document.getElementById("inProgressList");
  const completedList = document.getElementById("completedList");
  const deletedList = document.getElementById("deletedList");

  // Pulisce le liste
  todoList.innerHTML = "";
  inProgressList.innerHTML = "";
  completedList.innerHTML = "";
  deletedList.innerHTML = "";

  // Distribuisce le attività nelle liste corrispondenti
  filteredTasks.forEach((task, index) => {
    const listItem = document.createElement("li");
    listItem.className = `status-${task.status}`;
    listItem.innerHTML = `
      <div class="task-content">
        <span>${task.name}</span>
      </div>
      <div class="task-actions">
        <button class="edit-task" onclick="updateTask(${index}, prompt('Nuovo nome:', '${
      task.name
    }'))">Modifica ✏️</button>
        ${
          task.status !== "todo"
            ? `<button class="todo" onclick="changeStatus(${index}, 'todo')">Da fare ⏳</button>`
            : `<button class="todo disabled" disabled>Da fare ⏳</button>`
        }
        ${
          task.status !== "inprogress"
            ? `<button class="inprogress" onclick="changeStatus(${index}, 'inprogress')">In corso 🚀</button>`
            : `<button class="inprogress disabled" disabled>In corso 🚀</button>`
        }
        ${
          task.status !== "completed"
            ? `<button class="completed" onclick="changeStatus(${index}, 'completed')">Completata ✅</button>`
            : `<button class="completed disabled" disabled>Completata ✅</button>`
        }
        <button class="remove-task" onclick="removeTask(${index})">Rimuovi ❌</button>
      </div>
    `;

    // Aggiunge l'attività alla lista corrispondente
    if (task.status === "todo") {
      todoList.appendChild(listItem);
    } else if (task.status === "inprogress") {
      inProgressList.appendChild(listItem);
    } else if (task.status === "completed") {
      completedList.appendChild(listItem);
    }
  });

  // Gestione delle attività eliminate
  deletedTasks.forEach((task, index) => {
    const deletedItem = document.createElement("li");
    deletedItem.className = "status-deleted";
    deletedItem.innerHTML = `
      <div class="task-content">
        <span>${task.name}</span>
      </div>
      <div class="task-actions">
        <button class="restore-task" onclick="restoreTask(${index})">Ripristina 🔄</button>
        <button class="delete-permanently" onclick="deletePermanently(${index})">Rimuovi definitivamente 🗑️</button>
      </div>
    `;
    deletedList.appendChild(deletedItem);
  });
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
    const removedTask = tasks.splice(originalIndex, 1)[0];
    deletedTasks.push(removedTask);
    renderTasks();
  }
}

function restoreTask(deletedIndex) {
  if (deletedIndex >= 0 && deletedIndex < deletedTasks.length) {
    const restoredTask = deletedTasks.splice(deletedIndex, 1)[0];
    tasks.push(restoredTask);
    renderTasks();
  }
}

function deletePermanently(deletedIndex) {
  if (
    confirm("Sei sicuro di voler rimuovere definitivamente questa attività?")
  ) {
    if (deletedIndex >= 0 && deletedIndex < deletedTasks.length) {
      deletedTasks.splice(deletedIndex, 1);
      renderTasks();
    }
  }
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

function resetFilters() {
  document.getElementById("filterStatus").value = "all";
  document.getElementById("searchInput").value = "";
  filterTasks();
}
