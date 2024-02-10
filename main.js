document.addEventListener("DOMContentLoaded", () => {
    loadTasks();
});

function addTask() {
    const taskInput = document.getElementById("newTask");
    const labelSelect = document.getElementById("taskLabel");
    const tasks = getTasks();


    if (taskInput.value.trim() === "") {
        alert("¡Debes ingresar una tarea!")
        return; // Abandonar la función si está vacío
    }

    if (!tasks[labelSelect.value]) {
        tasks[labelSelect.value] = []; // Crear un nuevo array si la etiqueta no existe
    }


    tasks[labelSelect.value].push({ content: taskInput.value, done: false });


    saveTasks(tasks);
    renderTasks();

    taskInput.value = ""; // Limpiar el campo de entrada
}

function getTasks() {
    const storedTasks = sessionStorage.getItem("tasks");
    return storedTasks ? JSON.parse(storedTasks) : [];
}

function getLabels() {
    const storedLabels = sessionStorage.getItem("labels");
    return storedLabels ? JSON.parse(storedLabels) : [];
}

function saveTasks(tasks) {
    sessionStorage.setItem("tasks", JSON.stringify(tasks));
}

function saveLabels(labels) {
    sessionStorage.setItem("labels", JSON.stringify(labels));
}

function renderTasks(tasks) {
    const listElement = document.getElementById("taskList");
    listElement.innerHTML = '';

    tasks.forEach((task, index) => {
        const taskElement = document.createElement("li");
        taskElement.textContent = task.content;
        taskElement.onclick = () => toggleTaskDone(index);
        if (task.done) {
            taskElement.style.textDecoration = "line-through";
        }
        listElement.appendChild(taskElement);
    });
}

function renderLabels(labels) {
    const labelListElement = document.getElementById("taskLabelList");
    labelListElement.innerHTML = '';

    labels.forEach(label => {
        const labelElement = document.createElement("li");
        labelElement.textContent = label.label;
        labelListElement.appendChild(labelElement);
    });
}

function toggleTaskDone(index) {
    const tasks = getTasks();
    tasks[index].done = !tasks[index].done;
    saveTasks(tasks);
    renderTasks(tasks);
}

function loadTasksAndLabels() {
    const tasks = getTasks();
    const labels = getLabels();
    renderTasks(tasks);
    renderLabels(labels);
}
