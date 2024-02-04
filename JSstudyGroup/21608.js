// 24.2.4
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
  let count = N * N;

  const board = new Array(N).fill().map(() => new Array(N).fill(0));

  const [dx, dy] = [
    [-1, 1, 0, 0],
    [0, 0, -1, 1],
  ];

  // 현재 좌표를 기준으로 주변에 좋아하는 사람의 갯수 반환
  const getAroundLikeCount = (x, y, likeArr) => {
    let count = 0;
    for (let i = 0; i < 4; i++) {
      const nx = x + dx[i];
      const ny = y + dy[i];
      if (nx < 0 || nx >= N || ny < 0 || ny >= N) continue;
      if (!likeArr.includes(board[nx][ny])) continue;

      count += 1;
    }

    return count;
  };

  // 존재하는 모든 0의 좌표에서 주변에 인접한 0의 갯수가 가장 많은 것을 반환
  // 그마저도 동일하다면 3번 조건을 적용해서 반환
  const getAroundBlankCordForAll = () => {
    let info = [];
    let maxValue = 0;
    for (let i = 0; i < N; i++) {
      for (let j = 0; j < N; j++) {
        const value = board[i][j];
        if (value !== 0) continue; // 0의 좌표에 대해서만 주변에 인접한 0의 갯수를 찾아야 함

        let count = 0;
        for (let dir = 0; dir < 4; dir++) {
          const nx = i + dx[dir];
          const ny = j + dy[dir];
          if (nx < 0 || nx >= N || ny < 0 || ny >= N) continue;
          if (board[nx][ny] === 0) count += 1;
        }

        if (count > maxValue) {
          maxValue = count;
          info = []; // 최댓값이 나온것이라면 새로 갱신
          info.push([i, j, count]);
        } else if (count === maxValue) {
          info.push([i, j, count]); // 최댓값과 동일하다면 이어서 추가
        }
      }
    }

    if (info.length === 1) {
      const [x, y] = info[0];
      return [x, y];
    }

    // 3번 조건
    info.sort((a, b) => {
      if (a[0] === b[0]) {
        return a[1] - b[1];
      }
      return a[0] - b[0];
    });
    const [x, y] = info[0];
    return [x, y];
  };

  // 1번 조건의 좋아하는 사람들이 가장 많이 인접한 좌표들 중,
  // 인접한 0의 갯수가 가장 많은 좌표를 반환
  // 그마저도 동일하다면 3번 조건을 적용해서 반환
  const getAroundBlankCordForLiked = (likedInfo) => {
    let info = [];
    let maxValue = 0;

    for (let i of likedInfo) {
      const [x, y] = i;

      let count = 0;
      for (let dir = 0; dir < 4; dir++) {
        const nx = x + dx[dir];
        const ny = y + dy[dir];
        if (nx < 0 || nx >= N || ny < 0 || ny >= N) continue;
        if (board[nx][ny] === 0) count += 1;
      }

      if (count > maxValue) {
        maxValue = count;
        info = []; // 최댓값이 나온것이라면 새로 갱신
        info.push([x, y, count]);
      } else if (count === maxValue) {
        info.push([x, y, count]); // 최댓값과 동일하다면 이어서 추가
      }
    }

    if (info.length === 1) {
      const [x, y] = info[0];
      return [x, y];
    }

    // 3번 조건
    info.sort((a, b) => {
      if (a[0] === b[0]) {
        return a[1] - b[1];
      }
      return a[0] - b[0];
    });
    const [x, y] = info[0];
    return [x, y];
  };

  // 메인 로직
  const likeInfoMap = new Map(); // 추후 점수 계산용
  while (count--) {
    const arr = data.shift().split(' ').map(Number);
    const [target, like] = [arr.shift(), [...arr]];
    likeInfoMap.set(target, like);

    let likedInfo = [];
    let maxValue = 0;
    for (let i = 0; i < N; i++) {
      for (let j = 0; j < N; j++) {
        const value = board[i][j];

        if (value !== 0) continue;
        const count = getAroundLikeCount(i, j, like);
        if (count > 0) {
          if (maxValue < count) {
            maxValue = count;
            likedInfo = []; // 최댓값이 나온것이라면 새로 갱신
            likedInfo.push([i, j, count]);
          } else if (maxValue === count) {
            likedInfo.push([i, j, count]); // 최댓값과 동일하다면 이어서 추가
          }
        }
      }
    }

    // 주변에 좋아하는 사람이 아예 없을 때
    // 전체 좌표를 기준으로 2,3번 조건 진행
    if (likedInfo.length === 0) {
      const [x, y] = getAroundBlankCordForAll();
      board[x][y] = target;
      continue;
    }

    // 인접한 칸에 좋아하는 사람이 가장 많은 경우가 1개
    if (likedInfo.length === 1) {
      const [x, y] = likedInfo[0];
      board[x][y] = target;
      continue;
    }

    // 인접한 칸에 좋아하는 사람이 가장 많은 경우가 여러개
    // 해당 좌표들에 한해서 2,3번 조건 진행
    if (likedInfo.length !== 1) {
      const [x, y] = getAroundBlankCordForLiked(likedInfo);
      board[x][y] = target;
    }
  }

  // 점수 계산
  let result = 0;
  const scoreInfo = {
    0: 0,
    1: 1,
    2: 10,
    3: 100,
    4: 1000,
  };

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      let aoundLikeCount = 0;
      const value = board[i][j];
      const likeArr = likeInfoMap.get(value);

      for (let dir = 0; dir < 4; dir++) {
        const nx = i + dx[dir];
        const ny = j + dy[dir];
        if (nx < 0 || nx >= N || ny < 0 || ny >= N) continue;
        if (likeArr.includes(board[nx][ny])) aoundLikeCount += 1;
      }

      result += scoreInfo[`${aoundLikeCount}`];
    }
  }
  console.log(result);

  process.exit();
});
