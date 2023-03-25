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
  let M = +data.shift();
  let ingredients = data.shift().split(' ').map(Number);

  let count = 0;
  for (let i = 0; i < ingredients.length; i++) {
    for (let j = i + 1; j < ingredients.length; j++) {
      if (ingredients[i] + ingredients[j] === M) count += 1;
    }
  }
  console.log(count);
  process.exit();
});
