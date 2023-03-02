const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const data = [];

rl.on('line', (input) => {
  data.push(input);
}).on('close', () => {
  let [N, K] = data.shift().split(' ').map(Number);

  let arr = new Array(N).fill().map((i, index) => index + 1);
  let visited = new Array(N).fill(false);
  let result = [];

  let index = K - 1;
  result.push(arr[index]);
  visited[index] = true;

	// 모두 방문하면 끝
  while (visited.filter((i) => !i).length) {

		// 방문하지 않은 K자리 뒤의 숫자를 골라야 하므로
    // 다음 인덱스로 계속 이동하며 방문하지 않았던 수가 K번이 되면
    // 그때 while문을 탈출
    let falseCount = 0;
    while (falseCount !== K) {
      index += 1;
      if (visited[index % arr.length]) {
        continue;
      }
      falseCount += 1;
    }
    visited[index % arr.length] = true;
    result.push(arr[index % arr.length]);
  }

  result = `<${result.join(', ')}>`;

  console.log(result);

  process.exit();
});

// 1 2 3 4 5 6 7
// 1 2 (3) 4 5 6 7  
// 1 2 (3) 4 5 (6) 7 
// 1 (2) (3) 4 5 (6) 7  
// 1 (2) (3) 4 5 (6) (7) 
// 1 (2) (3) 4 (5) (6) (7) 
// (1) (2) (3) 4 (5) (6) (7) 
// (1) (2) (3) (4) (5) (6) (7) 