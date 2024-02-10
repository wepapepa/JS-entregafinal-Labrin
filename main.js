document.addEventListener("DOMContentLoaded", () => {
    loadTasksAndLabels();
});

function addTask() {
    const taskInput = document.getElementById("newTask");
    const labelSelect = document.getElementById("taskLabel");
    const tasks = getTasks();
    const labels = getLabels();


    if (taskInput.value.trim() === "") {
        alert("¡Debes ingresar una tarea!")
        return; // Abandonar la función si está vacío
    }

 tasks.push({ content: taskInput.value, done: false, label: labelSelect.value });

    saveTasks(tasks);
    renderTasksByLabel(labelSelect.value);

    taskInput.value = ""; // Limpiar el campo de entrada
}

function getTasks() {
    const storedTasks = sessionStorage.getItem("tasks");
    return storedTasks ? JSON.parse(storedTasks) : [];
}

function saveTasks(tasks) {
    sessionStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasksByLabel(label) {
    const tasks = getTasks().filter(task => task.label === label);
    renderTasks(tasks, label);
}

function renderTasks(tasks, label) {
    const container = document.getElementById(label + "List");
    container.innerHTML = '';

    tasks.forEach(task => {
        const taskElement = document.createElement("li");
        taskElement.textContent = task.content;
        taskElement.onclick = () => toggleTaskDone(task);
        if (task.done) {
            taskElement.style.textDecoration = "line-through";
        }
        container.appendChild(taskElement);
    });
}

function toggleTaskDone(taskToToggle) {
    const tasks = getTasks();
    const taskIndex = tasks.findIndex(task => task.content === taskToToggle.content && task.label === taskToToggle.label);
    if (taskIndex !== -1) {
        tasks[taskIndex].done = !tasks[taskIndex].done;
    }
    saveTasks(tasks);
    renderTasksByLabel(taskToToggle.label);
}

function loadTasksAndLabels() {
    const tasks = getTasks();
    tasks.forEach(task => renderTasksByLabel(task.label));
}

function getLabels() {
    const storedTasks = sessionStorage.getItem("tasks");
    const tasks = storedTasks ? JSON.parse(storedTasks) : [];
    return tasks.map(task => task.label).filter((label, index, self) => self.indexOf(label) === index);
}