const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const data = [];

rl.on('line', (input) => {
  data.push(input);
}).on('close', () => {
  // 문제 종료 조건을 판별하는 함수
  const checkEnd = (board) => {
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[0].length; j++) {
        const value = board[i][j];
        if (value.length <= 2) continue;
        if (value[0] !== 1) return false;
      }
    }
    return true;
  };

  const [N, M, K] = data.shift().split(' ').map(Number);
  const tmpBoard = data.slice(0, N).map((row) => row.split(' ').map(Number));
  const startDir = data[N].split(' ').map(Number);

  // 상어 번호를 키값으로, 방향 우선순위를 담고있는 Map객체
  const dirInfo = new Map();

  let startIndex = N + 1;
  let copyM = M;
  while (copyM--) {
    const info = data.slice(startIndex, startIndex + 4).map((i) => i.split(' ').map(Number));
    dirInfo.set(dirInfo.size + 1, [[], ...info]); // 방항값을 인덱스로 바로 사용하기 위해 앞에 빈 배열 추가
    startIndex += 4;
  }

  // 상어,방향,향기들의 정보를 담고 있는 배열
  // 요소의 값은 [번호,방향,향기] or [번호,향기]
  let board = new Array(N).fill(undefined).map(() => new Array(N).fill(undefined).map(() => []));

  // 초기 상어 세팅
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      const value = tmpBoard[i][j];
      if (value === 0) continue;
      // [번호,방향,향기]
      board[i][j].push(value, startDir[value - 1], K);
    }
  }

  // 1:상 2:하 3:좌 4:우
  // 방향 번호를 인덱스로 사용하기 위해 앞에 0추가
  const [dx, dy] = [
    [0, -1, 1, 0, 0],
    [0, 0, 0, -1, 1],
  ];

  // 초
  let count = 0;
  while (count <= 1000 && !checkEnd(board)) {
    // # 상어 이동

    // 각 while 마다
    // - 상어가 이동한 위치
    // - 기존에 상어가 위치해 있던 곳의 향기 감소
    // 위 2개의 정보를 기록하고 한번에 board에 반영
    const moveInfo = new Array(N).fill(undefined).map(() => new Array(N).fill(undefined).map(() => []));

    for (let i = 0; i < N; i++) {
      for (let j = 0; j < N; j++) {
        const value = board[i][j];

        if (value.length === 0) continue;

        // 상어 이동
        if (value.length === 3) {
          // 현재 좌표에 존재하는 상어 정보
          const [myNumber, myDir, myScent] = value;

          // 상어의 방향 우선순위
          const myDirInfo = dirInfo.get(myNumber)[myDir];

          let emptyFlag = false;

          // 방향 우선순위대로 주변 탐색 시작
          for (let dir of myDirInfo) {
            const nx = i + dx[dir];
            const ny = j + dy[dir];
            if (nx < 0 || nx >= N || ny < 0 || ny >= N) continue;
            const nextCordValue = board[nx][ny];

            // 주변에 빈 공간이 있다면 거기로 이동
            if (nextCordValue.length === 0) {
              // 이동하는 곳으로 이미 다른 상어도 이동해 있다면
              // (동시에 움직이는 것이므로 moveInfo기준으로 판단)
              if (moveInfo[nx][ny].length) {
                const existSharNumber = moveInfo[nx][ny][0];
                if (existSharNumber > myNumber) moveInfo[nx][ny] = [myNumber, dir, myScent]; // 덮어쓰기
              }
              // 아무 상어도 존재하지 않는다면
              if (!moveInfo[nx][ny].length) {
                // [번호,방향,향기]
                moveInfo[nx][ny].push(myNumber, dir, myScent);
              }

              // 기존에 상어가 존재했었던 위치는 [번호,향기-1]
              if (myScent === 1) moveInfo[i][j] = [];
              if (myScent > 1) moveInfo[i][j] = [myNumber, myScent - 1];

              emptyFlag = true;
              break;
            }
          }

          // 주변에 빈 공간이 없으면 자신의 향기로 이동
          if (!emptyFlag) {
            for (let dir of myDirInfo) {
              const nx = i + dx[dir];
              const ny = j + dy[dir];
              if (nx < 0 || nx >= N || ny < 0 || ny >= N) continue;

              const nextCordValue = board[nx][ny];

              if (nextCordValue.length && nextCordValue[0] === myNumber) {
                // 각 상어는 자신의 향기로만 가므로 다른 상어와 겹치는 것은
                // 고려하지 안해도 된다
                moveInfo[nx][ny].push(myNumber, dir, myScent);

                // 기존에 상어가 존재했었던 위치는 [번호,향기-1]
                if (myScent === 1) moveInfo[i][j] = [];
                if (myScent > 1) moveInfo[i][j] = [myNumber, myScent - 1];
                break;
              }
            }
          }
        }
      }
    }

    // # 향기 이동
    for (let i = 0; i < N; i++) {
      for (let j = 0; j < N; j++) {
        // moveInfo에는 상어가 이동한 위치, 기존 위치해 있던 곳의 향기 감소
        // 2개가 반영돼있으므로 이 부분은 패스
        if (moveInfo[i][j].length) continue;

        // 나머지 좌표들에 대해 향기 -1 반영
        const value = board[i][j];
        const [number, scent] = [value[0], value[value.length - 1]];

        if (scent === 1) moveInfo[i][j] = [];
        if (scent > 1) moveInfo[i][j].push(number, scent - 1);
      }
    }

    // 참조값 전달해도 무방 (moveInfo는 매 while마다 새로 생성되므로)
    board = moveInfo;
    count += 1;
  }
  console.log(count > 1000 ? -1 : count);

  process.exit();
});
