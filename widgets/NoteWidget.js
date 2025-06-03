import { Widget } from './Widget.js';

export class NoteWidget extends Widget {
    constructor () {
        super('note', 'note-widget');
        this.setupNoteUI();
    }

    setupNoteUI() {
        this.area = document.createElement('textarea');
        this.area.classList.add('note-textarea');
        this.area.placeholder = 'start writing here...';
        
        this.frame.appendChild(this.area);
    }
}