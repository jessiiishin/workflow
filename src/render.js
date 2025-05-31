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
        const type = event.dataTransfer.setData('text/plain', wbutton.textContent);
    });
}

workspace.addEventListener('dragover', (event) => {
    event.preventDefault();
});

workspace.addEventListener('drop', (event) => {
    const dummy = document.createElement('div');
    dummy.textContent = event.dataTransfer.getData('text/plain');
    workspace.appendChild(dummy);
});

