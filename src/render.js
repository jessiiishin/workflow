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
    const rect = workspace.getBoundingClientRect();
    dummy.classList.add('widget');
    dummy.textContent = event.dataTransfer.getData('text/plain');

    dummy.style.left = (event.clientX - rect.left) + 'px';
    dummy.style.top = (event.clientY - rect.top) + 'px';

    workspace.appendChild(dummy);
});