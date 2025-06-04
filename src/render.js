import { TimerWidget } from '../widgets/TimerWidget.js';
import { TodoWidget } from '../widgets/TodoWidget.js';
import { NoteWidget } from '../widgets/NoteWidget.js';

window.electronAPI.onSaveBeforeQuit(() => {
    saveWidgets();
});

// workspace
const workspace = document.getElementById('workspace');

// buttons
const timerBtn = document.getElementById("timerBtn");
const noteBtn = document.getElementById("noteBtn");
const todoBtn = document.getElementById("todoBtn");
const clearBtn = document.getElementById('clearBtn');

// setup ui
setupMainUI();

function setupMainUI() {
    prepButton(timerBtn);
    prepButton(noteBtn);
    prepButton(todoBtn);

    clearBtn.addEventListener('click', () => clearWorkspace());

    prepWorkspace();

    loadWidgets();
    
    if ([...workspace.children].length === 0) {
        firstTimeLoad();
    }

    saveWidgets();
}

function firstTimeLoad() {
    const firstWidget = new TimerWidget();
    firstWidget.render(workspace);
}

function prepButton(wbutton) {
    wbutton.addEventListener('dragstart', (event) => {
        event.dataTransfer.setData('text/plain', wbutton.textContent);
    });

    wbutton.addEventListener('click', () => {
        decideWidget(wbutton.textContent, '0px', '0px');
    });
}

function prepWorkspace() {
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
}

function decideWidget(type, x = '0px', y = '0px', title = '', data) {
    let newWidget;

    switch (type) {
        case 'timer':
            newWidget = new TimerWidget(data);
            break;
        case 'todo':
            newWidget = new TodoWidget(data);
            break;
        case 'note':
            newWidget = new NoteWidget(data);
            break;
        default:
            console.log('invalid or undefined');
            return;
    }

    newWidget.render(workspace);

    const frame = newWidget.frame;

    frame.style.left = x;
    frame.style.top = y;

    if (title !== '') {
        newWidget.header.textContent = title;
    }    
}

function clearWorkspace() {
    const children = workspace.children;
    [...children].forEach((child) => {
        workspace.removeChild(child);
    })
}

function saveWidgets() {
    const widgets = [...workspace.children];
    const widgetData = [];

    widgets.forEach(widget => {
        if (widget.instance && typeof widget.instance.serialize === 'function') {
            widgetData.push(widget.instance.serialize());
        }
    });

    localStorage.setItem('widgets', JSON.stringify(widgetData));
}

function loadWidgets() {
    const saved = localStorage.getItem('widgets');
    if (!saved) return;

    const widgetData = JSON.parse(saved);
    
    widgetData.forEach(wdata => {
        decideWidget(wdata.type, 
            wdata.position.left, 
            wdata.position.top, 
            wdata.title,
            wdata.data
        );
    });
}