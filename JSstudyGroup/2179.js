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
  const copyStrList = [...data];
  const strList = data.sort();

  // 각 단어의 인덱스를 가지고 있는 Map
  const copyStrInfo = new Map();
  for (let i = 0; i < N; i++) {
    copyStrInfo.set(copyStrList[i], i);
  }

  // 전체 통틀어서 동일한 문자열의 갯수의 최댓값
  let maxCount = 0;
  const result = [];
  for (let i = 0; i < N - 1; i++) {
    let current = strList[i];

    // current를 기반으로 같은 문자열의 길이가 있을 경우
    // [동일한 문자열 갯수, current와next중 작은 인덱스,current와next중 큰 인덱스]
    // 형태로 추가가 됨
    let currentResult = [];

    for (let j = i + 1; j < N; j++) {
      let next = strList[j];
      if (current[0] !== next[0]) break;

      const sliceLength = Math.min(current.length, next.length);
      const slicedCurrent = current.slice(0, sliceLength);
      const slicedNext = next.slice(0, sliceLength);

      // 현재 current와 next에서 동일한 문자열의 갯수
      let count = 0;
      for (let k = 0; k < sliceLength; k++) {
        if (slicedCurrent[k] === slicedNext[k]) {
          count += 1;
        }
        if (slicedCurrent[k] !== slicedNext[k]) break;
      }

      const currentRealIndex = copyStrInfo.get(current);
      const nextRealIndex = copyStrInfo.get(next);
      if (count === 0) continue;

      // 실제 current인덱스와 실제 next인덱스 중
      // 더 작은 인덱스를 [1] , 큰 인덱스를 [2]에 넣음
      // 나중에 sort할때 인덱스를 기준으로 정렬해야 하므로
      // (문제에서 첫번째 문자열 인덱스가 가장 낮은 경우를 사용하고
      // 그것마저 같다면 두번째 문자열 인덱스가 가장 낮은 경우를 사용하라 했기 때문 )
      if (maxCount < count) {
        maxCount = count;
        if (currentRealIndex > nextRealIndex) {
          currentResult = [[count, nextRealIndex, currentRealIndex]];
        } else {
          currentResult = [[count, currentRealIndex, nextRealIndex]];
        }
      } else if (maxCount === count) {
        if (currentRealIndex > nextRealIndex) {
          currentResult.push([count, nextRealIndex, currentRealIndex]);
        } else {
          currentResult.push([count, currentRealIndex, nextRealIndex]);
        }
      }
    }

    if (!currentResult.length) continue;

    // currentResult 정렬해서 가장 current와 next 중에서
    // 같은 문자열 갯수가 크고 , 첫번째 문자열의 인덱스가 낮고 두번째 인덱스가 낮은
    // 것으로 정렬
    currentResult.sort((a, b) => {
      if (a[0] === b[0]) {
        if (a[1] === b[1]) return a[2] - b[2];
        return a[1] - b[1];
      }
      return b[0] - a[0];
    });

    result.push([currentResult[0][0], currentResult[0][1], currentResult[0][2]]);
  }

  // current를 기준으로 currentResult의 값들을 담아왔으므로
  // 전체적으로 한 번 더 정렬
  result.sort((a, b) => {
    if (a[0] === b[0]) {
      if (a[1] === b[1]) return a[2] - b[2];
      return a[1] - b[1];
    }
    return b[0] - a[0];
  });

  console.log([copyStrList[result[0][1]], copyStrList[result[0][2]]].join('\n'));

  process.exit();
});
