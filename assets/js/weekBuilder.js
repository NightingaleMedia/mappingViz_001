import{concerns} from './vis.js'

const parseConcern = (concernNo) => {
    switch (concernNo.charAt(7)) {
        case '1':
            return concerns[0].c1
            break;
        case '2':
            return concerns[0].c2
            break;
        case '3':
            return concerns[0].c3
            break
        case '4':
            return concerns[0].c4
            break
        case '5':
            return concerns[0].c5
        default:
            return '';
    }
}

class weekBuilder {
    constructor(state, i, w) {
        this.header = document.createElement('div');
        this.header.className = "state-header";
        this.header.innerText = state;
        this.container = document.createElement('div');
        this.container.className = 'single-week--state';
        this.container.classList.add(`State-${i}`)
        this.container.classList.add(`Week-${w}`)
    }

    

    
    createConcern(concernNo, width, i, w) {
        this.concern = document.createElement('div');
        this.concern.className = 'single-concern'
        this.concern.classList.add(concernNo)
        this.concern.style.width = width;
        this.concern.addEventListener('mouseover', (e) => {
            let toolTip = document.querySelector('.tool-tip')
            toolTip.innerHTML =
                `<div>${i}<br>${width}</div>
          <div> ${parseConcern(concernNo)} </div>
          <div>Week: ${w+1}</div>
          `;
            toolTip.style.marginTop = `${e.clientY}px`;
            toolTip.style.marginLeft = `${e.clientX}px`;

        })

        this.container.appendChild(this.concern);
        return this;
    }

    addClass(name) {
        this.container.classList.add(name);
        return this;
    }

    render() {
        this.container.appendChild(this.header);
        return this.container;
    }
}

export {weekBuilder}