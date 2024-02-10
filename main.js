document.addEventListener("DOMContentLoaded", () => {
    loadTasksAndLabels();
});

function addTask() {
    const taskInput = document.getElementById("newTask");
    const labelSelect = document.getElementById("taskLabel");
    const tasks = getTasks();
    const labels = getLabels(); // Cambiado para mejorar la consistencia en los nombres

    if (taskInput.value.trim() === "") {
        return; // Abandonar la función si está vacío
    }

    tasks.push({ content: taskInput.value, done: false });
    labels.push({ label: labelSelect.value }); // Agregar la etiqueta a la lista de etiquetas

    saveTasks(tasks);
    saveLabels(labels); // Guardar las etiquetas separadamente
    renderTasks(tasks);
    renderLabels(labels);

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
