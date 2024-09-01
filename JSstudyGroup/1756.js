const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const data = [];

rl.on('line', (input) => {
  data.push(input);
}).on('close', () => {
  const [D, N] = data.shift().split(' ').map(Number);
  const ovens = data.shift().split(' ').map(Number);
  const pizzas = data.shift().split(' ').map(Number);

  // left인덱스 (도우가 쌓이게 되면, 다음 도우는 무조건 그 위부터 쌓여야 하므로 left최솟값을 지정)
  let minimumLeftIndex = 0;
  const result = [];

  const lowerBound = (target, arr) => {
    let left = minimumLeftIndex;
    let right = arr.length - 1;

    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      const midValue = arr[mid];

      if (midValue < target) {
        left = mid + 1;
      }
      if (midValue >= target) {
        right = mid - 1;
      }
    }
    minimumLeftIndex = left + 1;
    return left;
  };

  /** 메인로직 */
  // 오븐 순서별로 쌓일 수 있는 도우의 너비를 담는 배열
  const ovensForAvailableSpace = [];
  let maximum = Infinity;
  for (const oven of ovens) {
    if (oven < maximum) maximum = oven;
    ovensForAvailableSpace.push(maximum);
  }
  ovensForAvailableSpace.reverse();

  let overflow = false;
  for (let pizza of pizzas) {
    const index = lowerBound(pizza, ovensForAvailableSpace);

    // 현재 도우가 오븐에 쌓일 수 없다면 break
    if (index >= D) {
      overflow = true;
      break;
    }
    result.push(index);
  }

  console.log(overflow ? 0 : D - result.at(-1));

  process.exit();
});
