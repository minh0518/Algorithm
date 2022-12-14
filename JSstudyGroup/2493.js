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

  let towers = data.shift().split(' ').map(Number);

  let stack = [];

  let result = [0];

  for (let i = 1; i < towers.length; i++) {
    stack.push([towers[i - 1], i]); //이전 값을 넣어줌

    while (stack.length) {
      if (stack[stack.length - 1][0] < towers[i]) { 
        
        // 스택에 있는 것 보다 현재 타워가 크면 스택에서 pop
        stack.pop();
      } else {
        break;
      }
    }

    if (!stack.length) result.push(0);
    else {

      // 스택에 값이 남아 있다면 가장 최근에 push된 것을 정답배열에 push
      result.push(stack[stack.length - 1][1]);
    }
  }

  console.log(result.join(' '));

  //6 9 5 7 4
  process.exit();
});
