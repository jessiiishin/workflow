
const taskList = document.getElementById('taskList');
const doneList = document.getElementById('doneList');
const input = document.getElementById('taskInput');
let taskArr = [];

input.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        addNewTask(input.value);
        input.value = '';
    }
});

function addNewTask(taskText) {
    const newTask = document.createElement('li');
    newTask.textContent = taskText;
    
    const checkbox = document.createElement('input');
    checkbox.setAttribute('type', 'checkbox');
    checkbox.addEventListener('click', () => checkbox.check());
    newTask.prepend(checkbox);

    taskList.appendChild(newTask);
}

function markAsComplete(doneTask) {
    taskList.removeChild(doneTask);
    doneList.appendChild(doneTask);
}
