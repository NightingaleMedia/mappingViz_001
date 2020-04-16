// import * as parser from './assets/papaparse.js';

const body = document.querySelector('body');
let file = new FileReader();
file.readAsText('cities.json')



Papa.parse(file, {
   header: true,
   dynamicTyping: true,
   complete: function(results) {
     data = results;
   }
 });


console.log()

const displayData = (cityData) => {
  // console.log(cityData)
  cityData.forEach((state) =>{
    let box = new weekBuilder()
    .createConcern('red', `${state.weeks[0].concerns[0]}%`)
    .createConcern('orange', `${state.weeks[0].concerns[1]}%`)
    .createConcern('yellow', `${state.weeks[0].concerns[2]}%`)
    .createConcern('green', `${state.weeks[0].concerns[3]}%`)
    .createConcern('blue', `${state.weeks[0].concerns[0].concern5}%`);
    // body.appendChild(box.render());
  })
}



fetch('other.json')
.then(results => results.json())
.then(cities => displayData(cities))

class weekBuilder {
  constructor(){
    this.container = document.createElement('div');
    this.container.className = 'single-week';

  }
  createConcern(color, width){
    this.concern = document.createElement('div');
    this.concern.className = 'single-concern'
    this.concern.style.width = width;
    this.concern.style.backgroundColor = color;
    this.container.appendChild(this.concern);
    return this;
  }
  render(){
    return this.container;
  }
}
