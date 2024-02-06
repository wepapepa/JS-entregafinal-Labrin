document.addEventListener("DOMContentLoaded", () => {
    loadTasks();
}); //DOM

function addTask() { //funcion
    const taskInput = document.getElementById("newTask");//DOM
    const labelSelect = document.getElementById("taskLabel");//DOM
    const tasks = getTasks();

    if (taskInput.value.trim() === "") {
        return; // I abandon the function if its empty
    }

    tasks.push({ content: taskInput.value, done: false, label: labelSelect.value });// if it isnt empty it is added to the list
    saveTasks(tasks);
    renderTasks(tasks);

    taskInput.value = ""; //clean slate
}

function getTasks() {
    const storedTasks = sessionStorage.getItem("tasks");
    return storedTasks ? JSON.parse(storedTasks) : [];
}

function saveTasks(tasks) {
    sessionStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks(tasks) {
    const listElement = document.getElementById("taskList");
    listElement.innerHTML = '';
    tasks.forEach((task, index) => {
        const taskElement = document.createElement("li");
        taskElement.textContent = task.content;

        if (task.label) {
            taskElement.classList.add(task.label);
        }

        taskElement.onclick = () => toggleTaskDone(index);
        if (task.done) {
            taskElement.style.textDecoration = "line-through";
        }

        listElement.appendChild(taskElement);
    });
}

function toggleTaskDone(index) {
    const tasks = getTasks();
    tasks[index].done = !tasks[index].done;
    saveTasks(tasks);
    renderTasks(tasks);
}

function loadTasks() {
    const tasks = getTasks();
    renderTasks(tasks);
}