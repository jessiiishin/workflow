import { Widget } from './Widget.js';

export class TodoWidget extends Widget {
    constructor () {
        super('todo list', 'todo-widget');
        this.setupTodoUI();
        // this.loadTasks();
    }

    setupTodoUI() {
        this.taskList = document.createElement('ul');
        this.doneList = document.createElement('ul');
        this.input = document.createElement('input');

        this.taskList.classList.add('todo-task-list');
        this.doneList.classList.add('todo-task-list');
        this.input.classList.add('todo-input');

        this.input.placeholder = 'write a task...'
        this.input.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                this.addNewTask(this.input.value);
                this.taskList.removeChild(this.input);
                this.input.value = '';
                this.taskList.appendChild(this.input);
            }
        });

        this.taskList.appendChild(this.input);

        this.frame.append(this.taskList, this.doneList);
    }

    addNewTask(taskText, isDone = false) {
        const newTask = document.createElement('li');
        const textSpan = document.createElement('span');
        textSpan.textContent = taskText;
        textSpan.classList.add('todo-text');

        const checkbox = this.createCheckBox(newTask);
        checkbox.checked = isDone;
        newTask.appendChild(checkbox);

        newTask.appendChild(textSpan);
        newTask.addEventListener('dblclick', () => this.editTask(newTask, textSpan));
        
        const delBtn = this.createDelBtn();
        newTask.appendChild(delBtn);

        if (isDone) {
            this.doneList.appendChild(newTask);
            newTask.firstChild.nextSibling.classList.add('task-done');
        } else {
            this.taskList.appendChild(newTask);
        }

        this.taskList.removeChild(this.input);
        this.input.value = '';
        this.taskList.appendChild(this.input);

        // this.saveTasks();
    }

    /**
     * Helper function that creates a checkbox for the task
     * @param {li} task 
     * @returns checkbox
     */
    createCheckBox(task) {
        const checkbox = document.createElement('input');
        checkbox.setAttribute('type', 'checkbox');
        checkbox.classList.add('todo-checkbox');

        checkbox.addEventListener('change', () => {
            if (checkbox.checked) {
                this.markAsComplete(task);
            } else {
                this.markAsNotComplete(task);
            }
        });

        return checkbox;
    }

    /**
     * Creates a button that deletes the task
     * @returns button for deleting task
     */
    createDelBtn() {
        const delBtn = document.createElement('button');
        delBtn.classList.add('todo-delete-button');
        delBtn.textContent = 'x';
        delBtn.addEventListener('click', (event) => {
            event.target.parentElement.remove();
            // this.saveTasks();
        });

        return delBtn;
    }

    /**
     * Allows the task list object to be edited, becoming an input.
     * @param {li} task 
     * @param {span} textSpan 
     */
    editTask(task, textSpan) {
        const repInput = document.createElement('input');
        repInput.value = textSpan.textContent;

        task.removeChild(textSpan);
        task.insertBefore(repInput, task.firstChild.nextSibling);

        repInput.classList.add('todo-edit-task');
        repInput.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                this.replaceInputWithText(textSpan, task, repInput);
                // this.saveTasks();
            }
        });

        repInput.addEventListener('blur', () => {
            this.replaceInputWithText(textSpan, task, repInput);
            // this.saveTasks();
        });

        repInput.focus();
        repInput.select();
    }

    /**
     * Replaces the textspan with an input object and inserts it into the task
     * list object
     * @param {span} textSpan 
     * @param {li} newTask 
     * @param {input} repInput 
     */
    replaceInputWithText(textSpan, newTask, repInput) {
        textSpan.textContent = repInput.value;
        textSpan.classList.add('todo-text');
        newTask.removeChild(repInput);
        newTask.insertBefore(textSpan, newTask.firstChild.nextSibling);
    }

    /**
     * Moves the task from taskList to doneList
     * @param {li} doneTask 
     */
    markAsComplete(doneTask) {
        doneTask.firstChild.nextSibling.classList.add('task-done');
        this.taskList.removeChild(doneTask);
        this.doneList.appendChild(doneTask);

        // this.saveTasks();
    }

    /**
     * Moves the task from doneList to taskList
     * @param {li} undoneTask 
     */
    markAsNotComplete(undoneTask) {
        doneTask.firstChild.nextSibling.classList.remove('task-done');
        this.doneList.removeChild(undoneTask);
        this.taskList.appendChild(undoneTask);

        // this.saveTasks();
    }

    /**
     * Saves the current list of tasks in local file
     */
    saveTasks() {
        const taskArr = [];

        [...this.taskList.children].forEach((task) => {
            const span = task.querySelector('span');
            taskArr.push({
                text: span.textContent,
                done: task.firstChild.checked
            });
        });
        
        [...this.doneList.children].forEach((task) => {
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
    loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasklist') || '[]');

        tasks.forEach(task => this.addNewTask(task.text, task.done));
    }

    
}