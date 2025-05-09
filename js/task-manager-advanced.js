 const tasks = [];
 let filteredTasks = tasks; 

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
  if (newName && newName.trim() !== "") {
    const taskIndex = tasks.indexOf(filteredTasks[index]);
    if (taskIndex !== -1) {
      tasks[taskIndex].name = newName.trim();
      filterTasks();
    }
  }
}

function changeStatus(index, newStatus) {
  const taskIndex = tasks.indexOf(filteredTasks[index]);
  if (taskIndex !== -1) {
    tasks[taskIndex].status = newStatus;
    filterTasks();
  }
}

function removeTask(index) {
  const taskIndex = tasks.indexOf(filteredTasks[index]);
  if (taskIndex !== -1) {
    tasks.splice(taskIndex, 1);
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