// import {stateData }from './cleaned_states.js';
const aboutBtn = document.querySelector('#about-section')
const aboutBox = document.querySelector('.about-box')
aboutBtn.addEventListener('click', (e) => {
      console.log(e)
      aboutBox.classList.add('display-about')

        aboutBox.addEventListener('click', () => {
          aboutBox.classList.remove('display-about')
        })
      
      }) 
      
      const setColor = (selector, color) => {
      document.documentElement.style.setProperty(selector, color)
      return color;
    }

    const colorz = (d) => {
      let style = getComputedStyle(document.body)
      return style.getPropertyValue(d)
    }


    const colorPickers = document.querySelectorAll('input'); colorPickers.forEach(input => {
      input.addEventListener('change', () => {
        setColor(input.id, input.value)
      })
      input.value = colorz(`${input.id}`);
    })

    // const c1 = colorz('--concern1');
    // const c1 = setColor(colorz('--concern1'), document.getElementById('concern1--color').value)
    const c2 = colorz('--concern2')
    const c3 = colorz('--concern3')
    const c4 = colorz('--concern4')
    const c5 = colorz('--concern5')

    const wrapper = document.querySelector('#weeks-wrapper');
    const toolTip = document.createElement('span'); toolTip.className = "tool-tip"; wrapper.appendChild(toolTip);


    // const canvas = document.querySelector('canvas');
    // const ctx = canvas.getContext('2d');

    const parseState = (s) => {

      const numWeeks = 5;
      const titleStates = document.createElement('div')
      titleStates.className = 'single-week';

      for (let i = 0; i < s.length; i++) {
        let title = new weekBuilder(s[i].info.name, '', '').addClass('title');
        titleStates.appendChild(title.render());
      }
      wrapper.appendChild(titleStates);
      for (let w = 0; w < numWeeks + 1; w++) {
        let singleWeek = document.createElement('div')
        singleWeek.classList.add('single-week')


        for (let i = 0; i < s.length; i++) {
          let wk = ['week1', 'week2', 'week3', 'week4', 'week5']
          let stateWeek = new weekBuilder('', s[i].info.name, w)
            .createConcern('concern1', s[i].info[`${wk[w]}`][1], s[i].info.name, w)
            .createConcern('concern2', s[i].info[`${wk[w]}`][2], s[i].info.name, w)
            .createConcern('concern3', s[i].info[`${wk[w]}`][3], s[i].info.name, w)
            .createConcern('concern4', s[i].info[`${wk[w]}`][4], s[i].info.name, w)
            .createConcern('concern5', s[i].info[`${wk[w]}`][5], s[i].info.name, w)
            .render();
          singleWeek.appendChild(stateWeek);
        }
        // let titleWeek = document.createElement('div')
        // titleWeek.classList.add('single-week', 'week-title')
        // titleWeek.innerText = `Week ${w +1}`
        // wrapper.appendChild(titleWeek);
        wrapper.appendChild(singleWeek);

      }

    }

    fetch('cleaned_states.json')
    .then(results => results.json())
    .then(info => parseState(info))



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

          toolTip.innerHTML = `${i}<br>${width}<br>Week: ${w+1}<p>Level Of Concern</p>`;
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