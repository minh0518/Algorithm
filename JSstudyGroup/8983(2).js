const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const data = [];

rl.on('line', (input) => {
  data.push(input);
}).on('close', () => {
  const [M, N, L] = data.shift().split(' ').map(Number);
  const shooter = data
    .shift()
    .split(' ')
    .map(Number)
    .sort((a, b) => a - b);
  const info = data.map((i) => i.split(' ').map(Number));

  // 목표 인덱스보다 1칸 작은 값
  const getLeftShooterIndex = (a) => {
    let left = 0;
    let right = M - 1;

    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      const shooterCord = shooter[mid];

      if (shooterCord < a) {
        left = mid + 1;
      }
      if (shooterCord > a) {
        right = mid - 1;
      }

      // 세로축으로 동일하다면 바로 리턴
      if (shooterCord === a) {
        return mid;
      }
    }
    return right;
  };

  let count = 0;
  for (let i = 0; i < info.length; i++) {
    const [a, b] = info[i];

    const leftShooterIndex = getLeftShooterIndex(a);

    // 사격하는 곳과 동물이 세로축으로 동일선상에 있다면
    // 세로축이 최단거리가 된다. 그러므로 b <= L 일 경우 카운팅을 바로 한다
    if (shooter[leftShooterIndex] === a && b <= L) {
      count += 1;
      continue;
    }

    // 왼쪽인덱스, 오른쪽 인덱스
    const leftShooterDistance = leftShooterIndex === -1 ? Infinity : Math.abs(shooter[leftShooterIndex] - a) + b;
    const righShootertDistance = leftShooterIndex < M - 1 ? Math.abs(shooter[leftShooterIndex + 1] - a) + b : Infinity;

    // 최소 거리
    const minDistance = Math.min(leftShooterDistance, righShootertDistance);

    // 카운팅
    if (minDistance <= L) count += 1;
  }
  console.log(count);

  process.exit();
});
