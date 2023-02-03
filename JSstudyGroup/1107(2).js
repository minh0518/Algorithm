const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const data = [];

rl.on('line', (input) => {
  data.push(input);
}).on('close', () => {
  let N = data.shift().split('').map(Number);

  let M = +data.shift();

  let disable = [];
  if (M !== 0) {
    disable = data.shift().split(' ').map(Number);
  }

  let possibleNum = new Array(10).fill().map((_, index) => index);
  possibleNum = possibleNum.filter((i) => {
    return !disable.includes(i);
  });

  const checkCount = (num) => {
    let totalCount = (num + '').length + Math.abs(Number(N.join('')) - num);
    return totalCount;
  };

  let min = 999999;
  let valueFromHundred = Math.abs(Number(N.join('')) - 100);

  const dfs = (index, currentArr) => {
    if (index >= N.length - 1) {
      
      // N이 한자리 수일 경우, currentArr가 undefined인 상태에서
      // 바로이 로직이 실행되기 때문에 막아야 함
      if (currentArr.length) {
        let result = checkCount(Number(currentArr.join('')));
        if (result < min) {
          min = result;
        }

        if (index === N.length + 1) return;
      }
    }

    for (let i = 0; i < possibleNum.length; i++) {
      currentArr.push(possibleNum[i]);
      console.log(currentArr);
      dfs(index + 1, currentArr);
      currentArr.pop(); // 백트래킹을 위해 pop()
    }
  };

  dfs(0, []);

  console.log(Math.min(min, valueFromHundred));

  process.exit();
});