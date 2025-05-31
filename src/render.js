// buttons
const timerBtn = document.getElementById("timerBtn");
const notesBtn = document.getElementById("noteBtn");
const settingsBtn = document.getElementById("todoBtn");

const workspace = document.getElementById('workspace');

workspace.addEventListener("dragover", (event) => {
    event.preventDefault();
})