const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const data = [];

rl.on('line', (input) => {
  data.push(input);
}).on('close', () => {
  let [N, d, k, c] = data.shift().split(' ').map(Number);
  let table = data.map(Number);
  table = table.concat(table.slice(0, k));

  let check = new Array(d + 1).fill(0);
  let kind = 0;

  check[c] += 1; 
  kind += 1;

  let result = 0;
  for (let i = 0; i < k; i++) {
    if (check[table[i]] === 0) {
      kind += 1;
    }
    check[table[i]] += 1;
  }

  result = kind;

  for (let i = 0; i < table.length - k; i++) {
    let start = table[i];
    let end = table[i + k];

    // start부분을 자르고
    check[start] -= 1;
    if (check[start] === 0) {
      kind -= 1;
    }

    // end부분을 늘린다
    check[end] += 1;
    if (check[end] === 1) {
      kind += 1;
    }
    result = Math.max(result, kind);

  }
  console.log(result);

  process.exit();
});