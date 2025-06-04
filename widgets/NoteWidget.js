import { Widget } from './Widget.js';

export class NoteWidget extends Widget {
    constructor (savedData = {}) {
        super('note', 'note');
        
        this.setupNoteUI(savedData.text);
    }

    setupNoteUI(text = '') {
        this.area = document.createElement('textarea');
        this.area.classList.add('note-textarea');
        this.area.placeholder = 'start writing here...';
        this.area.value = text;
        
        this.frame.appendChild(this.area);
    }

    serialize() {
        return {
            type: this.type,
            title: this.header.textContent,
            position: {
                left: this.frame.style.left,
                top: this.frame.style.top
            },
            data: {
                text: this.area.value
            }
        }
    }
}