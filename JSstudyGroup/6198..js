const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const data = [];

rl.on('line', (input) => {
  data.push(input);
}).on('close', () => {
  const N = +data.shift();
  const buildings = data.map(Number);

  const stack = [buildings[0]];
  let count = 0;
  for (let i = 1; i < buildings.length; i++) {
    const currentBuilding = buildings[i];

    // 스택의 맨 마지막 값이 현재 빌딩의 높이보다 높을 때까지 pop()
    while (stack.at(-1) <= currentBuilding) {
      stack.pop();
    }

    // 스택의 길이만큼 count를 더해주고
    count += stack.length;
    // 현재 빌딩의 높이를 stack에 push
    stack.push(currentBuilding);
  }
  console.log(count);

  process.exit();
});
