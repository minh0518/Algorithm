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
  let index = 0;
  const result = [];
  while (T--) {
    const N = +data[index];
    const info = data.slice(index + 1, index + 1 + N).map((i) => i.split(' ').map(Number));
    info.sort((a, b) => a[0] - b[0]);

    // 최소 인터뷰 컷 점수
    let cutLine = info[0][1];

    let minusCount = 0;

    for (let i = 1; i < info.length; i++) {
      // 최소 커트라인 갱신
      if (cutLine > info[i][1]) {
        cutLine = info[i][1];
        continue;
      }
      // 최소 인터뷰 커트라인보다 등수가 낮다면 탈락
      minusCount += 1;
    }
    result.push(N - minusCount);

    index += N + 1;
  }
  console.log(result.join('\n'));

  process.exit();
});
