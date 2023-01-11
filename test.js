const { off, mainModule } = require('process');
const readline = require('readline');
const { fileURLToPath } = require('url');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const data = [];

rl.on('line', (input) => {
  data.push(input);
}).on('close', () => {
  let table = {
    1: 'a',
    2: 'b',
    3: 'c',
    4: 'd',
  };

  let arrForKeys = Object.keys(table);
  for (let i of arrForKeys) {
    if (i >= 3) {
      delete table[i];
    }
  }
  console.log(table);

  process.exit();
});

// {
//   1:'a',
//   2:'b',
//   3:'c',
//   4:'d'
// }
// 여기서 3이상부터 다 자르는거 어케?
