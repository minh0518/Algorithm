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

  const result = [];

  const getResult = (str) => {
    let start = 0;
    let end = str.length - 1;

    let isRemoved = false;
    while (start < end) {
      const startStr = str[start];
      const endStr = str[end];

      if (startStr !== endStr) {
        if (isRemoved) {
          return 2;
        }
        if (end - start === 1) {
          isRemoved = true;
          break;
        }

        // start 다음좌표 ~ end까지
        const slicedFromStart = str.slice(start + 1, end + 1);
        // end 이전좌표 ~ start까지
        const slicedFromEnd = str.slice(start, end);

        let index = 0;
        while (index < Math.floor(slicedFromStart.length / 2)) {
          // slicedFromStart와 slicedFromEnd 둘 다 index를 기준으로한 양 끝 값이
          // 서로 다른 값이 나올때까지 index를 증가(점점 비교 범위를 조여간다)
          if (
            slicedFromStart[index] === slicedFromStart[slicedFromStart.length - (index + 1)] &&
            slicedFromEnd[index] === slicedFromEnd[slicedFromEnd.length - (index + 1)]
          ) {
            index += 1;
            continue;
          }

          // 만약 slicedFromStart와 slicedFromEnd 둘 다 index를 기준으로 한 양 끝 값이
          // 다르다면 2를 리턴
          if (
            slicedFromStart[index] !== slicedFromStart[slicedFromStart.length - (index + 1)] &&
            slicedFromEnd[index] !== slicedFromEnd[slicedFromEnd.length - (index + 1)]
          ) {
            return 2;
          }

          // slicedFromStart와 slicedFromEnd 둘 다 index를 기준으로 한 양 끝 값이
          // 둘 중 하나만 같다면, 같은 배열의 방향으로 진행
          if (slicedFromEnd[index] === slicedFromEnd[slicedFromEnd.length - (index + 1)]) {
            end -= 1;
            isRemoved = true;
            break;
          }
          if (slicedFromStart[index] === slicedFromStart[slicedFromStart.length - (index + 1)]) {
            start += 1;
            isRemoved = true;
            break;
          }
        }
      }

      start += 1;
      end -= 1;
    }
    if (isRemoved) return 1;
    return 0;
  };
  while (T--) {
    const str = data.shift().split('');
    result.push(getResult(str));
  }
  console.log(result.join('\n'));

  process.exit();
});
