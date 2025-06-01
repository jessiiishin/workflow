import { TimerWidget } from '../widgets/TimerWidget.js';
import { TodoWidget } from '../widgets/TodoWidget.js';
import { NoteWidget } from '../widgets/NoteWidget.js';

// buttons
const timerBtn = document.getElementById("timerBtn");
const noteBtn = document.getElementById("noteBtn");
const todoBtn = document.getElementById("todoBtn");

const workspace = document.getElementById('workspace');

prepButton(timerBtn);
prepButton(noteBtn);
prepButton(todoBtn);

function prepButton(wbutton) {
    wbutton.addEventListener('dragstart', (event) => {
        event.dataTransfer.setData('text/plain', wbutton.textContent);
    });
}

workspace.addEventListener('dragover', (event) => {
    event.preventDefault();
});

workspace.addEventListener('drop', (event) => {
    const rect = workspace.getBoundingClientRect();
    const type = event.dataTransfer.getData('text/plain');
    
    let newWidget;

    switch (type) {
        case 'timer':
            newWidget = new TimerWidget();
            break;
        case 'todo':
            newWidget = new TodoWidget();
            break;
        case 'note':
            newWidget = new NoteWidget();
            break;
        default:
            break;
    }

    const frame = newWidget.frame;

    frame.style.left = (event.clientX - rect.left) + 'px';
    frame.style.top = (event.clientY - rect.top) + 'px';

    newWidget.render(workspace);
});