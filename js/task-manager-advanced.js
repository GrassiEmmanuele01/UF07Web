// Array per le attività attive e quelle eliminate temporaneamente
const tasks = [];
const deletedTasks = [];

/**
 * Aggiunge una nuova attività con stato "todo" se il nome è valido.
 */
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

/**
 * Aggiorna la visualizzazione delle attività filtrate per stato e ricerca.
 * @param {Array} [filteredTasks=tasks] - Lista delle attività da visualizzare.
 */
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

  // Renderizza le attività attive
  filteredTasks.forEach((task, index) => {
    const listItem = document.createElement("li");
    listItem.className = `status-${task.status}`;
    listItem.innerHTML = `
      <div class="task-content">
        <span>${task.name}</span>
      </div>
      <div class="button-row">
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
      </div>
      <div class="button-row">
        <button class="edit-task" onclick="updateTask(${index}, prompt('Nuovo nome:', '${task.name}'))">Modifica ✏️</button>
        <button class="remove-task" onclick="removeTask(${index})">Rimuovi ❌</button>
      </div>
    `;

    // Aggiunge l'attività alla lista corrispondente
    switch (task.status) {
      case "todo":
        todoList.appendChild(listItem);
        break;
      case "inprogress":
        inProgressList.appendChild(listItem);
        break;
      case "completed":
        completedList.appendChild(listItem);
        break;
      default:
        console.error("Stato dell'attività non riconosciuto:", task.status);
    }
  });

  // Renderizza le attività eliminate
  deletedTasks.forEach((task, index) => {
    const deletedItem = document.createElement("li");
    deletedItem.className = "status-deleted";
    deletedItem.innerHTML = `
      <span>${task.name}</span>
      <div class="button-row">
        <button class="restore-task" onclick="restoreTask(${index})">Ripristina 🔄</button>
        <button class="delete-permanently" onclick="deletePermanently(${index})">Rimuovi definitivamente 🗑️</button>
      </div>
    `;
    deletedList.appendChild(deletedItem);
  });
}

/**
 * Modifica il nome di una attività.
 * @param {number} originalIndex - Indice dell'attività da modificare.
 * @param {string} newName - Nuovo nome dell'attività.
 */
function updateTask(originalIndex, newName) {
  if (!newName || newName.trim() === "") {
    alert("Il nuovo nome dell'attività non può essere vuoto!");
    return;
  }

  if (originalIndex >= 0 && originalIndex < tasks.length) {
    tasks[originalIndex].name = newName.trim();
    filterTasks();
  } else {
    console.error("Indice dell'attività non valido:", originalIndex);
  }
}

/**
 * Cambia lo stato di una attività.
 * @param {number} originalIndex - Indice dell'attività.
 * @param {string} newStatus - Nuovo stato ("todo", "inprogress", "completed").
 */
function changeStatus(originalIndex, newStatus) {
  if (originalIndex >= 0 && originalIndex < tasks.length) {
    tasks[originalIndex].status = newStatus;
    filterTasks();
  } else {
    console.error("Indice dell'attività non valido:", originalIndex);
  }
}

/**
 * Rimuove una attività e la sposta tra gli eliminati.
 * @param {number} originalIndex - Indice dell'attività da rimuovere.
 */
function removeTask(originalIndex) {
  if (originalIndex >= 0 && originalIndex < tasks.length) {
    const removedTask = tasks.splice(originalIndex, 1)[0];
    deletedTasks.push(removedTask);
    renderTasks();
  } else {
    console.error("Indice dell'attività non valido:", originalIndex);
  }
}

/**
 * Ripristina una attività dagli eliminati.
 * @param {number} deletedIndex - Indice dell'attività eliminata da ripristinare.
 */
function restoreTask(deletedIndex) {
  if (deletedIndex >= 0 && deletedIndex < deletedTasks.length) {
    const restoredTask = deletedTasks.splice(deletedIndex, 1)[0];
    tasks.push(restoredTask);
    renderTasks();
  } else {
    console.error("Indice dell'attività eliminata non valido:", deletedIndex);
  }
}

/**
 * Elimina definitivamente una attività dagli eliminati dopo conferma.
 * @param {number} deletedIndex - Indice dell'attività da eliminare definitivamente.
 */
function deletePermanently(deletedIndex) {
  if (
    confirm("Sei sicuro di voler rimuovere definitivamente questa attività?")
  ) {
    if (deletedIndex >= 0 && deletedIndex < deletedTasks.length) {
      deletedTasks.splice(deletedIndex, 1);
      renderTasks();
    } else {
      console.error("Indice dell'attività eliminata non valido:", deletedIndex);
    }
  }
}

/**
 * Filtra le attività per stato e ricerca.
 */
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

/**
 * Reimposta i filtri di stato e ricerca.
 */
function resetFilters() {
  document.getElementById("filterStatus").value = "all";
  document.getElementById("searchInput").value = "";
  filterTasks();
}
