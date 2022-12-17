const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const data = [];

rl.on('line', (input) => {
  data.push(input);
}).on('close', () => {
  const getCombinations = function (arr, selectNumber) {
    const results = [];
    if (selectNumber === 1) return arr.map((el) => [el]);

    arr.forEach((fixed, index, origin) => {
      const rest = origin.slice(index + 1);

      const combinations = getCombinations(rest, selectNumber - 1);

      const attached = combinations.map((el) => [fixed, ...el]);

      results.push(...attached);
    });

    return results;
  };

  for (let i = 2; i <= 3; i++) {
    console.log(getCombinations([1, 2, 4, 7], i));
  }

  // 1 2 4 7 (2~3개)
  // 5 9

  process.exit();
});
