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


