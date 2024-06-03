const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const data = [];

rl.on('line', (input) => {
  data.push(input);
}).on('close', () => {
  const [N, K] = data.shift().split(' ').map(Number);

  // 숫자로 된 말판을 문자열로 변환('w','r','b') +
  // 외부 라인을 'b'로 채우기
  const colorBoard = data.slice(0, N).map((i) => i.split(' ').map(Number));
  for (let i = 0; i < colorBoard.length; i++) {
    let row = colorBoard[i];
    row = row.map((i) => {
      if (i === 0) return 'w';
      if (i === 1) return 'r';
      if (i === 2) return 'b';
    });
    row.push('b');
    row.unshift('b');
    colorBoard[i] = row;
  }
  colorBoard.unshift(new Array(N + 2).fill('b'));
  colorBoard.push(new Array(N + 2).fill('b'));

  // 각 좌표에 존재하는 말들의 정보
  const userBoard = new Array(N + 2).fill(undefined).map(() => new Array(N + 2).fill(undefined).map(() => []));

  // 각 말들의 위치를 순서대로 담고 있는 Map객체
  const userCord = new Map();

  const info = data.slice(N).map((i) => i.split(' ').map(Number));
  for (let i = 0; i < info.length; i++) {
    const [x, y, dir] = info[i];
    userBoard[x][y].push({ user: i + 1, dir: dir - 1 });
    userCord.set(i + 1, { cord: [x, y], dir: dir - 1 });
  }

  const [dx, dy] = [
    [0, 0, -1, 1],
    [1, -1, 0, 0],
  ];
  const reverseDir = (dir) => {
    if (dir < 2) {
      return (dir + 1) % 2;
    }
    if (dir >= 2) {
      return 6 / dir;
    }
  };

  // 메인 로직
  let count = 1;
  let endFlag = false;
  while (count <= 1000) {
    // 1번 말부터 이동
    for (let [user, { cord, dir }] of userCord) {
      const [currentX, currentY] = cord;
      const currentCordInfo = userBoard[currentX][currentY];

      // 현재 좌표에서 움직이는 말들
      let moveTargets;
      for (let i = 0; i < currentCordInfo.length; i++) {
        if (currentCordInfo[i].user === user) {
          moveTargets = currentCordInfo.splice(i);
          break;
        }
      }

      // 이동
      const nx = currentX + dx[dir];
      const ny = currentY + dy[dir];
      const colorValue = colorBoard[nx][ny];

      // 다음 좌표의 색상에 따른 조건부 로직
      if (colorValue === 'w') {
        // 해당 좌표로 이동
        userBoard[nx][ny].push(...moveTargets);

        // 움직였던 모든 말들의 좌표 Map객체 갱신
        // 현재 움직인 말 위에 다른 말이 존재했다면 다같이 움직이게 되므로
        // moveTargets 전체를 순회하며 좌표를 반영한다
        for (let { user, dir } of moveTargets) {
          userCord.set(user, { cord: [nx, ny], dir });
        }
      }
      if (colorValue === 'r') {
        moveTargets.reverse();
        userBoard[nx][ny].push(...moveTargets);

        for (let { user, dir } of moveTargets) {
          userCord.set(user, { cord: [nx, ny], dir });
        }
      }
      if (colorValue === 'b') {
        // 현재 말의 방향을 반대로 변경
        // (현재 말 위의 모든 말이 아닌, 현재 말의 방향만 반대로 한다)
        dir = reverseDir(dir);
        moveTargets[0] = { ...moveTargets[0], dir };

        const reversedNx = currentX + dx[dir];
        const reversedNy = currentY + dy[dir];
        if (colorBoard[reversedNx][reversedNy] === 'b') {
          userBoard[currentX][currentY].push(...moveTargets);

          for (let { user, dir } of moveTargets) {
            userCord.set(user, { cord: [currentX, currentY], dir });
          }
        }

        if (colorBoard[reversedNx][reversedNy] === 'w') {
          userBoard[reversedNx][reversedNy].push(...moveTargets);

          for (let { user, dir } of moveTargets) {
            userCord.set(user, { cord: [reversedNx, reversedNy], dir });
          }
        }
        if (colorBoard[reversedNx][reversedNy] === 'r') {
          moveTargets.reverse();
          userBoard[reversedNx][reversedNy].push(...moveTargets);

          for (let { user, dir } of moveTargets) {
            userCord.set(user, { cord: [reversedNx, reversedNy], dir });
          }
        }
      }

      // 말 1개를 옮길 때마다 게임 종료 여부 판단
      for (let i = 0; i < N + 2; i++) {
        for (let j = 0; j < N + 2; j++) {
          if (userBoard[i][j].length >= 4) {
            endFlag = true;
            i = N;
            break;
          }
        }
      }
      if (endFlag) break;
    }
    if (endFlag) break;
    count += 1;
  }

  if (count > 1000) {
    console.log(-1);
  }
  if (count <= 1000) {
    console.log(count);
  }

  process.exit();
});
