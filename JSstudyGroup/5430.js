const { off, mainModule } = require('process');
const readline = require('readline');
const { fileURLToPath } = require('url');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const data = [];

rl.on('line', (input) => {
  data.push(input);
}).on('close', () => {
  let T = +data.shift();

  let index = 0;

  let answer = [];

  for (let i = 0; i < T; i++) {
    let [command, n, arr] = data.slice(index, index + 3);

    arr = eval(arr);

    let direction = true;
    let errorFlag = false;

    for (let str of command) {
      if (str === 'D' && !arr.length) {
        answer.push('error');
        errorFlag = true;
        break;
      }

      if (str === 'D' && arr.length) {
        if (direction) {
          arr.shift();
        }
        if (!direction) {
          arr.pop();
        }
      }

      if (str === 'R' && arr.length) {
        direction = !direction;
      }
    }



		// 정답생성

		// 만약 빈 arr인데 D가 나온 경우 error를 답에 넣고
		// errorFlag를 통해 바로 넘어감
		// 굳이 이렇게 하는 이유가 arr가 빈 배열인 경우가 정답이 될 수도
    // 있으므로 arr.length로 걸러내면 정답이 되는 빈 배열도 걸러지기 때문
    if (errorFlag) {
      index += 3;
      continue;
    }

    if (!direction) {
      answer.push(`[${arr.reverse()}]`);
    } else {
      answer.push(`[${arr}]`);
    }

    index += 3;
  }

  console.log(answer.join('\n'));

  process.exit();
});