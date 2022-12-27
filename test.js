const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const data = [];

rl.on('line', (input) => {
  data.push(input);
}).on('close', () => {
  let arr = [
    [1, 2],
    [3, 4],
    [5, 6],
  ];

  let result = arr.filter((i) => {
    let tmp = i.join('');
    return tmp !== '12' && tmp !== '56';
  });
  console.log(result); //[ [ 3, 4 ] ]

  process.exit();
});
