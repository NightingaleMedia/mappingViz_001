//original order was:
//1. CONCERNED , 2. SLIGHTLY CONCERNED,3. SOMEWHAT ANXIOUS, 4.TOTALLY FINE, 5. VERY ANXIOUS
// new order
//4. , 2. , 1. , 3. , 5. 
import {weekBuilder} from './weekBuilder.js'
import {stateData} from './cleaned_states.js'

const concerns = ['Totally Fine','Slightly Concerned','Concerned','Somewhat Anxious','Very Anxious']

// import {stateData }from './cleaned_states.js';
const aboutBtn = document.querySelector('#about-section')
const aboutBox = document.querySelector('.about-box')


aboutBtn.addEventListener('click', (e) => {

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
const colorPickers = document.querySelectorAll('input');
colorPickers.forEach(input => {
  input.addEventListener('change', () => {
    setColor(input.id, input.value)
  })
  input.value = colorz(`${input.id}`);
})


const wrapper = document.querySelector('#weeks-wrapper');
const toolTip = document.createElement('span');
toolTip.className = "tool-tip";
wrapper.appendChild(toolTip);

const parseState = (s) => {

  console.log(s[0].info['week1'])

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
        .createConcern('concern3', s[i].info[`${wk[w]}`][4], s[i].info.name, w)
        .createConcern('concern4', s[i].info[`${wk[w]}`][3], s[i].info.name, w)
        .createConcern('concern5', s[i].info[`${wk[w]}`][5], s[i].info.name, w)
        .render();
      singleWeek.appendChild(stateWeek);
    }
    wrapper.appendChild(singleWeek);
  }
}

// fetch('cleaned_states.json')
//   .then(results => results.json())
//   .then(info => parseState(info))

parseState(stateData);

export{concerns}