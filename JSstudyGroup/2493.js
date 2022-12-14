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
    stack.push([towers[i - 1], i]); //���� ���� �־���

    while (stack.length) {
      if (stack[stack.length - 1][0] < towers[i]) { 
        
        // ���ÿ� �ִ� �� ���� ���� Ÿ���� ũ�� ���ÿ��� pop
        stack.pop();
      } else {
        break;
      }
    }

    if (!stack.length) result.push(0);
    else {

      // ���ÿ� ���� ���� �ִٸ� ���� �ֱٿ� push�� ���� ����迭�� push
      result.push(stack[stack.length - 1][1]);
    }
  }

  console.log(result.join(' '));

  //6 9 5 7 4
  process.exit();
});
