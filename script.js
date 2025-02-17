const taskInput = document.getElementById('task-input');
const addTaskButton = document.getElementById('add-task-btn');
const incompleteTasksList = document.getElementById('incomplete-tasks');
const completedTasksList = document.getElementById('completed-tasks');


let incompleteTasks = JSON.parse(localStorage.getItem('incompleteTasks')) || [];
let completedTasks = JSON.parse(localStorage.getItem('completedTasks')) || [];


function renderTasks() {
    incompleteTasksList.innerHTML = '';
    completedTasksList.innerHTML = '';

    incompleteTasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${task}</span>
            <div>
                <button onclick="completeTask(${index})">Complete</button>
                <button onclick="deleteTask(${index}, 'incomplete')">Delete</button>
            </div>
        `;
        incompleteTasksList.appendChild(li);
    });

    completedTasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span class="completed">${task}</span>
            <div>
                <button onclick="deleteTask(${index}, 'completed')">Delete</button>
            </div>
        `;
        completedTasksList.appendChild(li);
    });
}


function addTask() {
    const task = taskInput.value.trim();
    if (task) {
        incompleteTasks.push(task);
        taskInput.value = '';
        saveTasks();
        renderTasks();
    }
}


function completeTask(index) {
    const task = incompleteTasks.splice(index, 1);
    completedTasks.push(task[0]);
    saveTasks();
    renderTasks();
}


function deleteTask(index, category) {
    if (category === 'incomplete') {
        incompleteTasks.splice(index, 1);
    } else if (category === 'completed') {
        completedTasks.splice(index, 1);
    }
    saveTasks();
    renderTasks();
}


function saveTasks() {
    localStorage.setItem('incompleteTasks', JSON.stringify(incompleteTasks));
    localStorage.setItem('completedTasks', JSON.stringify(completedTasks));
}


addTaskButton.addEventListener('click', addTask);


renderTasks();
