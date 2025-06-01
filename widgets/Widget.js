class Widget {
    constructor (title, type) {
        this.frame = document.createElement('div');
        this.header = document.createElement('h1');
        this.closeBtn = document.createElement('button');

        setupBaseUI(title, type);
    }

    render(container) {
        container.appendChild(this.frame);
    }

    setupCloseBtn() {
        this.closeBtn.classList.add('w-close-btn');
        this.closeBtn.addEventListener('click', (event) => {
            event.target.parentElement.remove();
        })
    }

    setupBaseUI(title, type) {
        this.frame.classList.add('widget');
        this.frame.classList.add(type);
        this.header.textContent = title;
        this.header.classList.add('widget-header');

        this.header.addEventListener('dblclick', () => this.editHeader());
        
        this.frame.append(this.header, this.closeBtn);
        setupCloseBtn();
    }

    editHeader() {
        const tempInput = document.createElement('input');
    }


}

