import { Widget } from './Widget.js';

export class TodoWidget extends Widget {
    constructor () {
        super('todo list', 'todo-widget');
        this.setupTodoUI();
    }

    setupTodoUI() {
        this.taskList = document.createElement('ul');
        this.doneList = document.createElement('ul');
        this.input = document.createElement('input');

        this.input.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                this.addNewTask(this.input.value);
                this.input.value = '';
            }
        });

        this.frame.append(this.taskList, this.input, this.doneList);
    }

    addNewTask(taskText, isDone = false) {
        const newTask = document.createElement('li');
        const textSpan = document.createElement('span');
        textSpan.textContent = taskText;

        const checkbox = this.createCheckBox(newTask);
        checkbox.checked = isDone;
        newTask.appendChild(checkbox);

        newTask.appendChild(textSpan);
        newTask.addEventListener('dblclick', () => this.editTask(newTask, textSpan));
        
        const delBtn = this.createDelBtn();
        newTask.appendChild(delBtn);

        if (isDone) {
            this.doneList.appendChild(newTask);
        } else {
            this.taskList.appendChild(newTask);
        }

        this.saveTasks();
    }

    /**
     * Helper function that creates a checkbox for the task
     * @param {li} task 
     * @returns checkbox
     */
    createCheckBox(task) {
        const checkbox = document.createElement('input');
        checkbox.setAttribute('type', 'checkbox');

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
        delBtn.textContent = 'x';
        delBtn.addEventListener('click', (event) => {
            event.target.parentElement.remove();
            this.saveTasks();
        });

        return delBtn;
    }

    
}