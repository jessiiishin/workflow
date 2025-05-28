
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
    const textSpan = document.createElement('span');
    textSpan.textContent = taskText;
    newTask.appendChild(textSpan);

    newTask.addEventListener('dblclick', () => editTask(newTask, textSpan));
    
    const checkbox = createCheckBox(newTask);
    const delBtn = createDelBtn();
    
    newTask.appendChild(delBtn);
    newTask.prepend(checkbox);

    taskList.appendChild(newTask);
}

function markAsComplete(doneTask) {
    taskList.removeChild(doneTask);
    doneList.appendChild(doneTask);
}

function markAsNotComplete(undoneTask) {
    doneList.removeChild(undoneTask);
    taskList.appendChild(undoneTask);
}

function replaceInputWithText(textSpan, newTask, repInput) {
    textSpan.textContent = repInput.value;
    newTask.removeChild(repInput);
    newTask.insertBefore(textSpan, newTask.firstChild.nextSibling);
}

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

function createDelBtn() {
    const delBtn = document.createElement('button');
    delBtn.textContent = 'x';
    delBtn.addEventListener('click', (event) => {
        event.target.parentElement.remove();
    });

    return delBtn;
}

function editTask(task, textSpan) {
    const repInput = document.createElement('input');
    repInput.value = textSpan.textContent;

    task.removeChild(textSpan);
    task.insertBefore(repInput, task.firstChild.nextSibling);

    repInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            replaceInputWithText(textSpan, task, repInput);
        }
    });

    repInput.addEventListener('blur', () => {
        replaceInputWithText(textSpan, task, repInput);
    });

    repInput.focus();
}