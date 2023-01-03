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

  let operators = data.shift().split(' ').map(Number);

  let min = 1000000000;
  let max = -1000000000;

  const dfs = (index, value) => {

    const originalValue = value;
    //백트래킹으로 다시 돌아가서 원래 값으로 바꿀 때 사용

    if (index === N - 1) {
      //연산을 모두 했으면 최대 최소 비교
      if (value > max) max = value;
      if (value < min) min = value;
      return;
    }

    for (let i = 0; i < 4; i++) {
      if (operators[i] > 0) {
        switch (i) {
          case 0:
            value += numbers[index + 1];
            break;
          case 1:
            value -= numbers[index + 1];
            break;
          case 2:
            value *= numbers[index + 1];
            break;
          case 3:
            if (value >= 0) {
              value = Math.floor(value / numbers[index + 1]);
            } else {
              value = -(Math.floor((-1 * value) / numbers[index + 1]))
            }
            break;
        }

        operators[i]--;
        dfs(index + 1, value);
        value = originalValue;
        operators[i]++;
      }
    }
  };

  dfs(0, numbers[0]);
  console.log(`${max}\n${min}`);

  process.exit();
});

//연산자 우선순위 무시하고 앞에서부터 진행
//나눗셈은 정수정답만
//음수를 양수로 나누면 양수로 바꿔서 나눗셈을 하고 그 몫에 음수를 붙인다