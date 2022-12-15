const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const data = [];

rl.on('line', (input) => {
  data.push(input);
}).on('close', () => {
  let N = +data.shift();

  let entrance = new Map();
  let exit = new Map();
  for (let i = 0; i < 2 * N; i++) {
    if (i < N) entrance.set(data.shift(),i+1);
    if (i >= N) exit.set(data.shift(),(i+1)-N);
  }
  // console.log(entrance)
  // console.log(exit)



  
//등수가 1씩 밀린 갯수만큼?
//흐름이끊기면?
  

//1 2 3 4
//2 1 4 3

//1 2 3 4
//1 4 2 3




  process.exit();
});
