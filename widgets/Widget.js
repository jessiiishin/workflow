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
        this.header.addEventListener('mousedown', (e) => this.enableWidgetMove(e));
        
        this.closeBtn.classList.add('w-close-btn');
        this.closeBtn.textContent = 'x';
        this.closeBtn.addEventListener('click', (event) => {
            event.target.parentElement.remove();
        })

        this.frame.append(this.closeBtn, this.header); 
    }

    editHeader() {
        const tempInput = document.createElement('input');
        tempInput.value = this.header.innerHTML;
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
        if (input.value === '' || input.value === null) {
            this.header.textContent = 'untitled'
        } else {
            this.header.textContent = input.value;
        }
        this.frame.removeChild(this.frame.firstChild);
        this.frame.insertBefore(this.header, this.frame.firstChild);
    }

    enableWidgetMove(e) {
        const wspaceRect = this.frame.parentElement.getBoundingClientRect();

        const mouseX = e.clientX - wspaceRect.left;
        const mouseY = e.clientY - wspaceRect.top;

        const iniWidgetX = parseFloat(getComputedStyle(this.frame).left);
        const iniWidgetY = parseFloat(getComputedStyle(this.frame).top);

        this.offsetX = mouseX - iniWidgetX;
        this.offsetY = mouseY - iniWidgetY;

        this.header.classList.add('widget-dragging');

        const movefunc = (e) => this.widgetMove(e);
        const upfunc = () => this.endWidgetMove(movefunc, upfunc);
        document.addEventListener('mousemove', movefunc);
        document.addEventListener('mouseup', upfunc);
    }

    widgetMove(e) {
        const wspaceRect = this.frame.parentElement.getBoundingClientRect();
        const mouseX = e.clientX - wspaceRect.left;
        const mouseY = e.clientY - wspaceRect.top;

        const newX = mouseX - this.offsetX;
        const newY = mouseY - this.offsetY;

        const clampedX = Math.max(0, 
            Math.min(newX, wspaceRect.width - this.frame.offsetWidth)
        );
        const clampedY = Math.max(0,
            Math.min(newY, wspaceRect.height - this.frame.offsetHeight)
        );

        this.frame.style.left = clampedX + 'px';
        this.frame.style.top = clampedY + 'px';
    } 

    endWidgetMove(movefunc, upfunc) {
        document.removeEventListener('mousemove', movefunc);
        document.removeEventListener('mouseup', upfunc);
        this.header.classList.remove('widget-dragging');
    }

}

