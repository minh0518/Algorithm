const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const data = [];

rl.on('line', (input) => {
  data.push(input);
}).on('close', () => {
  const [N, S] = data.shift().split(' ').map(Number);
  const arr = data.shift().split(' ').map(Number);

  let start = 0;
  let end = 0;
  let sum = 0;
  const result = [];
  while (start <= end && end < arr.length) {
    sum += arr[end];

    // sum이 S보다 작을때까지 start를 옮김
    // sum과 S가 같아도 옮겨야 한다.
    while (S <= sum) {
      if (sum >= S) result.push(end - start + 1);
      sum -= arr[start];
      start += 1;
    }

    end += 1;
  }

  console.log(result.length ? Math.min(...result) : 0);

  process.exit();
});
