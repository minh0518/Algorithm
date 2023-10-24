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

    info.sort((a, b) => {
      return a[0] - b[0];
    });

    let count = 0;
    // 최소 인터뷰 컷
    let minimumInterviewCut = info[0][1];
    for (let i = 1; i < info.length; i++) {
      const currentInterview = info[i][1];

      // 최소 인터뷰 컷보다 낮은 등수들은 제거
      if (minimumInterviewCut < currentInterview) {
        count += 1;
      }
      // 최소 인터뷰 컷보다 높다면 이걸 최소 인터뷰 컷으로
      // (이 문제는 '단 한명이라도' 점수가 높은 사람이 있으면 탈락이므로)
      if (minimumInterviewCut > currentInterview) {
        minimumInterviewCut = currentInterview;
      }
    }

    result.push(N - count);

    index += N + 1;
  }

  console.log(result.join('\n'));

  process.exit();
});
