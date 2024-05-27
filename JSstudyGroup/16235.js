const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const data = [];

rl.on('line', (input) => {
  data.push(input);
}).on('close', () => {
  // 배열 크기, 나무의 수, 최종년도
  let [N, M, K] = data.shift().split(' ').map(Number);
  const addInfo = data.slice(0, N).map((row) => row.split(' ').map(Number));
  const trees = data.slice(N).map((row) =>
    row
      .split(' ')
      .map(Number)
      .map((i, index) => {
        if (index === 2) return i;
        return i - 1; // 배열 인덱스 사용
      }),
  );

  const fuelBoard = new Array(N).fill(undefined).map(() => new Array(N).fill(5));

  // 각 1x1크기의 좌표에도 여러개의 나무가 심을 수 있으므로
  // 3차원 배열로 사용
  const treeBoard = new Array(N).fill(undefined).map(() => new Array(N).fill(undefined).map(() => []));

  for (let [row, col, age] of trees) {
    treeBoard[row][col].push(age);
  }

  // 봄에 죽은 나무들 정보
  // 여름이 지나면 바로 초기화
  let deadAtSpring = [];

  const spring = () => {
    for (let i = 0; i < N; i++) {
      for (let j = 0; j < N; j++) {
        const trees = treeBoard[i][j];
        if (!trees.length) continue;

        trees.sort((a, b) => a - b);

        for (let treeIndex = 0; treeIndex < trees.length; treeIndex++) {
          const tree = trees[treeIndex];
          if (fuelBoard[i][j] >= tree) {
            fuelBoard[i][j] -= tree;
            trees[treeIndex] += 1;
          } else {
            // i,j좌표에 죽는 나무 나이들(배열형태)
            deadAtSpring.push([i, j, trees.splice(treeIndex)]);
            break;
          }
        }
      }
    }
  };

  const summer = () => {
    for (let [row, col, trees] of deadAtSpring) {
      for (let age of trees) {
        const plus = Math.floor(age / 2);
        fuelBoard[row][col] += plus;
      }
    }
    deadAtSpring = [];
  };

  const fall = () => {
    const [dx, dy] = [
      [-1, -1, 0, 1, 1, 1, 0, -1],
      [0, 1, 1, 1, 0, -1, -1, -1],
    ];

    for (let i = 0; i < N; i++) {
      for (let j = 0; j < N; j++) {
        const trees = treeBoard[i][j];
        if (!trees.length) continue;
        for (let treeIndex = 0; treeIndex < trees.length; treeIndex++) {
          const tree = trees[treeIndex];
          if (tree % 5 !== 0) continue;

          for (let dir = 0; dir < 8; dir++) {
            const nx = i + dx[dir];
            const ny = j + dy[dir];
            if (nx < 0 || nx >= N || ny < 0 || ny >= N) continue;
            treeBoard[nx][ny].push(1);
          }
        }
      }
    }
  };

  const winter = () => {
    for (let i = 0; i < N; i++) {
      for (let j = 0; j < N; j++) {
        fuelBoard[i][j] += addInfo[i][j];
      }
    }
  };

  while (K--) {
    spring();
    summer();
    fall();
    winter();
  }

  // 최종 나무 개수 카운트
  let count = 0;
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      const value = treeBoard[i][j];
      count += value.length;
    }
  }
  console.log(count);

  process.exit();
});

// 봄
// 현재 칸에서 어린 나무부터 자신의 나이만큼 양분먹고 +1 , 안되면 사망

// 여름
// 봄에 죽은 나무/2 가 양분으로 변함

// 가을
// 5의 배수의 나이가 된 나무의 주위 8칸으로 나이가1인 나무를 번식

// 겨울
// 각 칸마다 양분이 추가
