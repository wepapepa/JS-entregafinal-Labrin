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

function saveTasks(tasks) {
    sessionStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks(tasks) {
    const tasks = getTasks();
    const container = document.getElementById("tasksContainer");
    container.innerHTML = ''; //clean container

    Object.keys(tasks).forEach(label =>{
        const labelElement = document.createElement("h3");
        labelElement.textContent = label || "Sin label";
        container.appendChild(labelElement);

        const listElement = document.createElement("ul");
        tasks[label].forEach((tasks, index) => {
            const taskElement = document.createElement("li");
            taskElement.textContent = task.content;
            taskElement.onclick = () => toggleTaskDone(label, index);
            if (task.done) {
                taskElement.style.textDecoration = "line-through";
            }
            listElement.appendChild(taskElement);
        });
        container.appendChild(listElement);
    });
}


function toggleTaskDone(index) {
    const tasks = getTasks();
    tasks[label][index].done = !tasks[label][index].done;
    saveTasks(tasks);
    renderTasks();
}

function loadTasks() {
    renderTasks();
}
