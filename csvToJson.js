
// const body = document.querySelector('body');
let filename = 'cleaned_states'
let input = `${filename}.csv`
let output = `${filename}.json`

const csv = require('./node_modules/csv-parser');
const fs = require('fs');

class State {

  constructor(name) {
    this.info = {
      name: '',
      week1: {
        0: '',
        1: '',
        2: '',
        3: '',
        4: '',
        5:''
      },
      week2: {
        0: '',
        1: '',
        2: '',
        3: '',
        4: '',
        5: ''
      },
      week3: {
        0: '',
        1: '',
        2: '',
        3: '',
        4: '',
        5: ''
      },
      week4: {
        0: '',
        1: '',
        2: '',
        3: '',
        4: ''
      },
      week5: {
        0: '',
        1: '',
        2: '',
        3: '',
        4: '',
        5: ''
      }
    };

    this.info.name = name;
  }

  getInfo() {
    return this.info;
  }
}

const res = [];

let state;

fs.createReadStream(input)
  .pipe(csv())
  .on('data', function (data) {

    if (res.length === 0 || data.State !== state.getInfo().name) {
      state = new State(data.State);
    } else {
      state = res.pop();
    }

    state.getInfo()[data.Week][0] = data['0'];
    state.getInfo()[data.Week][1] = data['1'];
    state.getInfo()[data.Week][2] = data['2'];
    state.getInfo()[data.Week][3] = data['3'];
    state.getInfo()[data.Week][4] = data['4'];
    state.getInfo()[data.Week][5] = data['5'];

    res.push(state);

  }).on('end', () => fs.writeFile(output, JSON.stringify(res), err => console.log(err)));


