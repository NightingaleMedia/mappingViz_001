// import * as parser from './assets/papaparse.js';
const c1 = 'rgba(0,155,0)'
const c2 = 'rgba(0,155,0)'
const c3 = 'rgba(160,0,0,0.6)'
const c4 = 'rgba(160,0,0,0.9)'
const c5 = 'rgba(160,0,0,1)'

const wrapper = document.querySelector('#weeks-wrapper');
const toolTip = document.createElement('span');
toolTip.className = "tool-tip";
wrapper.appendChild(toolTip);


const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const parseState = (s) => {

  const numWeeks = 5;

  for (let w = 0; w < numWeeks + 1; w++) {

    let singleWeek = document.createElement('div')
      singleWeek.classList.add('single-week')


    for (let i = 0; i < s.length; i++) {
      let wk = ['week1', 'week2', 'week3', 'week4', 'week5']
      let stateWeek = new weekBuilder('', s[i].info.name, w)
        .createConcern(c1, s[i].info[`${wk[w]}`][1], s[i].info.name, w)
        .createConcern(c2, s[i].info[`${wk[w]}`][2], s[i].info.name, w)
        .createConcern(c3, s[i].info[`${wk[w]}`][3], s[i].info.name, w)
        .createConcern(c4, s[i].info[`${wk[w]}`][4], s[i].info.name, w)
        .createConcern(c5, s[i].info[`${wk[w]}`][5], s[i].info.name, w)
        .render();

      singleWeek.appendChild(stateWeek);
    }

    wrapper.appendChild(singleWeek);  
  }
  
}

fetch('cleaned_states.json')
  .then(results => results.json())
  .then(info => parseState(info))

class weekBuilder {
  constructor(state,i,w) {
    this.header = document.createElement('div');
    this.header.className = "state-header";
    this.header.innerText = state;
    this.container = document.createElement('div');
    this.container.className = 'single-week--state';
    this.container.classList.add(`State-${i}`)
    this.container.classList.add(`Week-${w}`)
  }
  createConcern(color, width, i, w) {
    this.concern = document.createElement('div');
    this.concern.className = 'single-concern'

    this.concern.style.width = width ;
    this.concern.addEventListener('mouseover', (e)=>{
      // console.log(e.clientX)
    
      toolTip.innerHTML = `${i}<br>${width}<br>Week: ${w+1}<p>Level Of Concern</p>`;
      toolTip.style.marginTop = `${e.clientY}px`;
      toolTip.style.marginLeft = `${e.clientX}px`;

      // console.log(`${i}, ${width} Concerned`)
    })
    this.concern.style.backgroundColor = color;
    this.container.appendChild(this.concern);
    return this;
  }
  render() {
    this.container.appendChild(this.header);
    return this.container;
  }
}