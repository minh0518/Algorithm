const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const data = [];

rl.on('line', (input) => {
  data.push(input);
}).on('close', () => {
  const [N, d, k, c] = data.shift().split(' ').map(Number);

  const table = data.map(Number);
  table.push(...table.slice(0, k - 1));

  // 초기 범위에 대한 초깃값들 세팅
  let first = 0;
  let second = k - 1;
  const visited = new Array(d + 1).fill(0);
  let count = 0;

  for (let i = 0; i < k; i++) {
    const value = table[i];
    if (visited[value]) {
      visited[value] += 1;
      continue;
    }
    visited[value] = 1;
    count += 1;
  }

  const maxValue = [];
  maxValue.push(visited[c] ? count : count + 1);

  // 슬라이딩 윈도우
  while (second < table.length) {
    // first부분 제거 및 카운팅
    visited[table[first]] -= 1;
    if (!visited[table[first]]) count -= 1;

    // 이동
    first += 1;
    second += 1;

    // 이동 후, second부분 추가 및 카운팅
    if (second < table.length && !visited[table[second]]) count += 1;
    visited[table[second]] += 1;

    maxValue.push(visited[c] ? count : count + 1);
  }

  console.log(Math.max(...maxValue));

  process.exit();
});
