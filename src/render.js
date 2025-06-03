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

const firstWidget = new TimerWidget();
firstWidget.render(workspace);

function prepButton(wbutton) {
    wbutton.addEventListener('dragstart', (event) => {
        event.dataTransfer.setData('text/plain', wbutton.textContent);
    });

    wbutton.addEventListener('click', () => {
        decideWidget(wbutton.textContent, '0px', '0px');
    });
}

workspace.addEventListener('dragover', (event) => {
    event.preventDefault();
});

workspace.addEventListener('drop', (event) => {
    const rect = workspace.getBoundingClientRect();
    const type = event.dataTransfer.getData('text/plain');
    const x = (event.clientX - rect.left);
    const y = (event.clientY - rect.top);

    const clampedX = Math.max(0, 
            Math.min(x, rect.width - 245)
    );
    const clampedY = Math.max(0,
            Math.min(y, rect.height - 245)
    );

    decideWidget(type, clampedX + 'px', clampedY + 'px');
});

function decideWidget(type, x, y) {
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

    frame.style.left = x;
    frame.style.top = y;

    newWidget.render(workspace);
}

function clearWorkspace() {
    
}