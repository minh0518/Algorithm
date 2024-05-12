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
  const arr = data.shift().split(' ').map(Number);

  // 메모리 초과를 방지하기 위한 배열
  const visited = new Array(N).fill(false);

  let result = 0;
  let first = 0;
  let second = 0;

  while (first < arr.length) {
    while (second < arr.length) {
      // 현재 second 위치의 값이 이미 기존 배열에 들어있는 값이라면 break
      if (visited[arr[second]]) break;

      // 현재 second 위치의 값이 기존 배열에 중복된 값이 없다면 추가
      visited[arr[second]] = true; // 방문처리
      second += 1;
    }

    result += second - first;
    visited[arr[first]] = false; // 방문처리 제거
    first += 1;
  }

  console.log(result);
  process.exit();
});
