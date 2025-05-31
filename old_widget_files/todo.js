const taskList = document.getElementById('taskList');
const doneList = document.getElementById('doneList');
const input = document.getElementById('taskInput');

input.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        addNewTask(input.value);
        input.value = '';
    }
});

/**
 * Adds a new task list object, creating checkbox, delete button
 * @param {li} taskText 
 */
function addNewTask(taskText, isDone = false) {
    const newTask = document.createElement('li');
    const textSpan = document.createElement('span');
    textSpan.textContent = taskText;

    const checkbox = createCheckBox(newTask);
    checkbox.checked = isDone;
    newTask.appendChild(checkbox);

    newTask.appendChild(textSpan);
    newTask.addEventListener('dblclick', () => editTask(newTask, textSpan));
    
    const delBtn = createDelBtn();
    newTask.appendChild(delBtn);

    if (isDone) {
        doneList.appendChild(newTask);
    } else {
        taskList.appendChild(newTask);
    }

    saveTasks();
}

/**
 * Helper function that creates a checkbox for the task
 * @param {li} task 
 * @returns checkbox
 */
function createCheckBox(task) {
    const checkbox = document.createElement('input');
    checkbox.setAttribute('type', 'checkbox');

    checkbox.addEventListener('change', () => {
        if (checkbox.checked) {
            markAsComplete(task);
        } else {
            markAsNotComplete(task);
        }
    });

    return checkbox;
}

/**
 * Creates a button that deletes the task
 * @returns button for deleting task
 */
function createDelBtn() {
    const delBtn = document.createElement('button');
    delBtn.textContent = 'x';
    delBtn.addEventListener('click', (event) => {
        event.target.parentElement.remove();
        saveTasks();
    });

    return delBtn;
}

/**
 * Allows the task list object to be edited, becoming an input.
 * @param {li} task 
 * @param {span} textSpan 
 */
function editTask(task, textSpan) {
    const repInput = document.createElement('input');
    repInput.value = textSpan.textContent;

    task.removeChild(textSpan);
    task.insertBefore(repInput, task.firstChild.nextSibling);

    repInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            replaceInputWithText(textSpan, task, repInput);
            saveTasks();
        }
    });

    repInput.addEventListener('blur', () => {
        replaceInputWithText(textSpan, task, repInput);
        saveTasks();
    });

    repInput.focus();
}

/**
 * Replaces the textspan with an input object and inserts it into the task
 * list object
 * @param {span} textSpan 
 * @param {li} newTask 
 * @param {input} repInput 
 */
function replaceInputWithText(textSpan, newTask, repInput) {
    textSpan.textContent = repInput.value;
    newTask.removeChild(repInput);
    newTask.insertBefore(textSpan, newTask.firstChild.nextSibling);
}

/**
 * Moves the task from taskList to doneList
 * @param {li} doneTask 
 */
function markAsComplete(doneTask) {
    taskList.removeChild(doneTask);
    doneList.appendChild(doneTask);

    saveTasks();
}

/**
 * Moves the task from doneList to taskList
 * @param {li} undoneTask 
 */
function markAsNotComplete(undoneTask) {
    doneList.removeChild(undoneTask);
    taskList.appendChild(undoneTask);

    saveTasks();
}

/**
 * Saves the current list of tasks in local file
 */
function saveTasks() {
    const taskArr = [];

    [...taskList.children].forEach((task) => {
        const span = task.querySelector('span');
        taskArr.push({
            text: span.textContent,
            done: task.firstChild.checked
        });
    });
    
    [...doneList.children].forEach((task) => {
        const span = task.querySelector('span');
        taskArr.push({
            text: span.textContent,
            done: task.firstChild.checked
        });
    });

    localStorage.setItem('tasklist', JSON.stringify(taskArr));
}

/**
 * Loads locally saved tasks
 */
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasklist') || '[]');

    tasks.forEach(task => addNewTask(task.text, task.done));
}

window.addEventListener('DOMContentLoaded', loadTasks);