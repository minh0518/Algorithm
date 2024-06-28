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
  const info = data
    .shift()
    .split(' ')
    .map(Number)
    .sort((a, b) => a - b);

  const search = (first, start, end) => {
    let count = 0;
    while (start < end) {
      const sum = first + info[start] + info[end];

      if (sum === 0) {
        // 양 쪽 값이 같다면 조합의 개수만큼
        if (info[start] === info[end]) {
          const n = end - start + 1;
          count += (n * (n - 1)) / 2;
          break;
        }

        // 양 쪽 값이 다르다면, 각 포인터의 값으로부터 중복된 개수만큼 추가
        const startValue = info[start];
        let startMove = 0;
        const endValue = info[end];
        let endMove = 0;

        while (info[start] === startValue) {
          start += 1;
          startMove += 1;
        }
        while (info[end] === endValue) {
          end -= 1;
          endMove += 1;
        }
        count += startMove * endMove;
      }
      if (sum > 0) {
        end -= 1;
      }
      if (sum < 0) {
        start += 1;
      }
    }
    return count;
  };

  let result = 0;
  for (let i = 0; i < N; i++) {
    const first = info[i];
    if (first > 0) break;
    const start = i + 1;
    const end = N - 1;
    result += search(first, start, end);
  }

  console.log(result);

  process.exit();
});
