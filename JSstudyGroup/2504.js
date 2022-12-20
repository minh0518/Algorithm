const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const data = [];

rl.on('line', (input) => {
  data.push(input);
}).on('close', () => {
  let str = data.shift().split('');

  //올바른 괄호가 맞는지 확인
  const check = (str) => {
    let stack = [];

    for (let i of str) {
      if (i === '(' || i === '[') {
        stack.push(i);
        continue;
      }

      let lastValueOfStack = stack[stack.length - 1];
      if (i === ')') {
        if (lastValueOfStack === '(') {
          stack.pop();
          continue;
        } else {
          return false;
        }
      }

      if (i === ']') {
        if (lastValueOfStack === '[') {
          stack.pop();
          continue;
        } else {
          return false;
        }
      }
    }

    if (stack.length) {
      return false;
    }

    return true;
  };

  //올바른 괄호가 맞다면 진행
  if (check(str)) {
    let stack = [];
    let index = 0;

    while (index !== str.length) {
      //console.log(stack)

      let letter = str[index];

      if (letter === '(' || letter === '[') {
        stack.push(letter);
        index++;
        continue;
      }

      //계산
      let lastValueOfStack = stack[stack.length - 1];

      let tmpStackForCalc = [];

      if (letter === ')') {
        if (lastValueOfStack === '(') {
          stack.pop();
          stack.push(2);
        }
        if (!isNaN(lastValueOfStack)) {
          for (let i = stack.length - 1; i >= 0; i--) {
            if (stack[i] === '(') {
              let sum = tmpStackForCalc.reduce((a, b) => a + b, 0);
              stack.splice(i);
              stack.push(sum * 2);
              break;
            }
            if (!isNaN(stack[i])) {
              tmpStackForCalc.push(stack[i]);
            }
          }
        }
      }
      if (letter === ']') {
        if (lastValueOfStack === '[') {
          stack.pop();
          stack.push(3);
        }
        if (!isNaN(lastValueOfStack)) {
          for (let i = stack.length - 1; i >= 0; i--) {
            if (stack[i] === '[') {
              let sum = tmpStackForCalc.reduce((a, b) => a + b, 0);
              stack.splice(i);
              stack.push(sum * 3);
              break;
            }
            if (!isNaN(stack[i])) {
              tmpStackForCalc.push(stack[i]);
            }
          }
        }
      }

      index++;
    }

    console.log(stack.reduce((a, b) => a + b, 0));
  } else { 

    // 올바른 괄호가 아니라면 0 출력
    console.log(0);
  }

  //(()[[]])([])
  process.exit();
});
