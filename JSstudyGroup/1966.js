const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const data = [];

rl.on('line', (input) => {
  data.push(input);
}).on('close', () => {
  let T = +data.shift();

  let reuslt = [];

  for (let i = 0; i < T; i++) {
    let [N, M] = data.shift().split(' ').map(Number);

    let queue = [];
    data
      .shift()
      .split(' ')
      .forEach((i, index) => {
        let obj = {};
        obj[`index`] = index;
        obj[`value`] = Number(i);
        queue.push(obj);
      });

    let count = 0;

    let target = queue[M];

    while (queue.length) {
      let tmpForMax = [...queue];
      tmpForMax.sort((a, b) => {
        return b.value - a.value;
      });

      let maxValue = tmpForMax[0];

      let firstValue = queue.shift();

      if (maxValue.value === firstValue.value) {
        count++;
        if (firstValue.index === target.index) {
          reuslt.push(count);
          break;
        }
      }
      if (maxValue.value !== firstValue.value) {
        queue.push(firstValue);
      }
    }
  }

  console.log(reuslt.join('\n'));
  //3번문서
  // 1 2 3 4

  //2 3 4 1
  //3 4 1 2
  //4 1 2 3 >> 4
  //1 2 3
  //2 3 1
  //3 1 2 >> 3

  process.exit();
});
