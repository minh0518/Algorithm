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
  let numbers = data.shift().split(' ').map(Number);

	// numbers 배열을 그대로 사용하기 보다 DP배열을 따로 사용
  let DP = new Array(N).fill(0);

  DP[0] = numbers[0];

  for (let i = 1; i < N; i++) {

		// 누적값은 따로 DP에 저장하고 numbers배열의 i 값만 사용
    DP[i] = Math.max(DP[i - 1] + numbers[i], numbers[i]);
  }

  console.log(Math.max(...DP));

  process.exit();
});

// (10 -4 3 1 5 6 -35)+ 12
//  12