// 24.2.14
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
  const populationBoard = data.map((i) => i.split(' ').map(Number));

  // 시작점 d1,d2를 기반으로 결과 도출
  const check = (x, y, d1, d2) => {
    // [1번 선거구 인원,2번 선거구 인원, .. ,5번 선거구 인원]
    const score = new Array(5).fill(0);

    const board = new Array(N).fill().map(() => new Array(N).fill(0));

    // 5번 선거구 좌표
    const fifthSectioncords = [];

    // 문제에서 주어진 조건 그대로 5번 선거구의 경계선을 구함
    let firstLine = 0;
    while (firstLine <= d1) {
      fifthSectioncords.push([x + firstLine, y - firstLine]);
      firstLine += 1;
    }

    let secondLine = 0;
    while (secondLine <= d2) {
      fifthSectioncords.push([x + secondLine, y + secondLine]);
      secondLine += 1;
    }

    let thirdLine = 0;
    while (thirdLine <= d2) {
      fifthSectioncords.push([x + d1 + thirdLine, y - d1 + thirdLine]);
      thirdLine += 1;
    }

    let forthLine = 0;
    while (forthLine <= d1) {
      fifthSectioncords.push([x + d2 + forthLine, y + d2 - forthLine]);
      forthLine += 1;
    }

    // 테두리 기록
    for (let i of fifthSectioncords) {
      board[i[0]][i[1]] = 5;
    }

    // 테두리를 기반으로 내부 공간도 5번 선거구로 기록 및 인원 계산
    for (let i = 0; i < N; i++) {
      const row = board[i];
      if (!row.includes(5)) continue;
      // 현재 열에서 5번이 1개뿐이면 그 부분만 인원 계산
      if (row.filter((col) => col === 5).length === 1) {
        score[4] += populationBoard[i][row.indexOf(5)];
        continue;
      }

      // 5번이 2개라면 시작점부터 끝점까지 전부 5로 채우고 인원 계산
      const from = row.indexOf(5);
      const to = row.lastIndexOf(5);
      for (let j = from; j <= to; j++) {
        board[i][j] = 5;
        score[4] += populationBoard[i][j];
      }
    }

    // 5번 선거구에 포함되지 않은 구역 (r, c)의 선거구 번호를 문제에서 주어진 기준으로 구한다
    for (let r = 0; r < N; r++) {
      // 1번, 3번의 경우 5번을 뚫고 나가지 않게 하기 위해 각 행마다 조건을 추가
      let firstStop = false;
      let thirdStop = false;

      for (let c = 0; c < N; c++) {
        if (r < x + d1 && c <= y) {
          if (board[r][c] === 0 && !firstStop) {
            board[r][c] = 1;
            score[0] += populationBoard[r][c];
          } else {
            // 5번을 만났다면 현재 행에서는 더이상 추가x
            firstStop = true;
          }
        }

        if (r <= x + d2 && y < c && c <= N) {
          if (board[r][c] === 0) {
            board[r][c] = 2;
            score[1] += populationBoard[r][c];
          }
        }

        if (x + d1 <= r && r <= N && c < y - d1 + d2) {
          if (board[r][c] === 0 && !thirdStop) {
            board[r][c] = 3;
            score[2] += populationBoard[r][c];
          } else {
            // 5번을 만났다면 현재 행에서는 더이상 추가x
            thirdStop = true;
          }
        }

        if (x + d2 < r && r <= N && y - d1 + d2 <= c && c <= N) {
          if (board[r][c] === 0) {
            board[r][c] = 4;
            score[3] += populationBoard[r][c];
          }
        }
      }
    }

    // 인구가 가장 많은 선거구와 가장 적은 선거구의 인구 차이 반환
    score.sort((a, b) => a - b);
    return score[score.length - 1] - score[0];
  };

  // 메인 로직
  const result = [];
  // d1과 d2가 가질 수 있는 최대 길이
  const maxD = Math.floor(N / 2);

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      // 시작점 조건 (N-2까지인데 배열 인덱스이므로 N-3)
      if (j === 0 || j === N - 1 || i > N - 3) continue;

      // d1 d2 완전탐색
      for (let d1 = 1; d1 <= maxD; d1++) {
        for (let d2 = 1; d2 <= maxD; d2++) {
          // 현재 시작점에 따른 d1 d2의 조건 적용 - 문제에서 언급
          if (i + d1 + d2 < N && j - d1 >= 0 && j + d2 < N) {
            result.push(check(i, j, d1, d2));
          }
        }
      }
    }
  }

  // 최솟값 도출
  console.log(Math.min(...result));
  process.exit();
});
