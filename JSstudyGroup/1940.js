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
  let ingredients = data
    .shift()
    .split(' ')
    .map(Number)
    .sort((a, b) => a - b);

  // 미리 sort를 해 놓았으므로
  // 이제 start를 늘리면 덧셈 결과가 커지고
  // end를 줄이면 덧셈 결과가 작아진다
  let start = 0;
  let end = ingredients.length - 1;

  let count = 0;
  while (start < end) {
    let sum = ingredients[start] + ingredients[end];

    if (sum === M) {
      count += 1;
      start += 1;
      continue;
    }

    // sum이 더 크니까 합을 줄여야 함
    if (sum > M) {
      end -= 1;
      continue;
    }

    // sum이 더 작으니까 합을 늘려야 함
    if (sum < M) {
      start += 1;
      continue;
    }
  }

  console.log(count);

  process.exit();
});
