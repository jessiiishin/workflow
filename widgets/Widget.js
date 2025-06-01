export class Widget {
    constructor (title, type) {
        this.frame = document.createElement('div');
        this.header = document.createElement('h3');
        this.closeBtn = document.createElement('button');
        
        this.setupBaseUI(title, type);
    }

    render(container) {
        container.appendChild(this.frame);
    }

    setupBaseUI(title, type) {
        this.frame.classList.add('widget');
        this.frame.classList.add(type);
        this.header.textContent = title;
        this.header.classList.add('widget-header');
        this.header.addEventListener('dblclick', () => this.editHeader());
        
        this.closeBtn.classList.add('w-close-btn');
        this.closeBtn.addEventListener('click', (event) => {
            event.target.parentElement.remove();
        })

        this.frame.append(this.header, this.closeBtn); 
    }

    editHeader() {
        const tempInput = document.createElement('input');
        tempInput.value = this.header.texContent;
        tempInput.classList.add('header-edit-mode');
        this.frame.removeChild(this.header);
        this.frame.insertBefore(tempInput, this.frame.firstChild);
        
        tempInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                this.finishEdit(tempInput);
            }
        })

        tempInput.addEventListener('blur', () => this.finishEdit(tempInput));

        tempInput.focus();
        tempInput.select();
    }

    finishEdit(input) {
        this.header.textContent = input.value;
        this.frame.removeChild(this.frame.firstChild);
        this.frame.insertBefore(this.header, this.frame.firstChild);
    }

}

