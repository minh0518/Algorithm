const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const data = [];

rl.on('line', (input) => {
  data.push(input);
}).on('close', () => {
  const board = data.map((i) => i.split(''));

  // 5*5 크기의 좌표로 이뤄진 2차원 배열
  const indexBoard = [];
  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 5; j++) {
      indexBoard.push([i, j]);
    }
  }

  // 7명의 좌표값이 서로 연결돼있는지 확인하는 함수
  const checkLinked = (cordArr) => {
    const [dx, dy] = [
      [-1, 1, 0, 0],
      [0, 0, -1, 1],
    ];
    const [startX, startY] = cordArr[0];

    // dfs로 인접한 좌표를 탐색
    const dfs = (x, y, visited) => {
      visited.push([x, y].join(''));

      let visitedCount = 1;

      for (let i = 0; i < 4; i++) {
        const nx = x + dx[i];
        const ny = y + dy[i];

        // 범위 아웃 || 이미 방문
        if (nx < 0 || nx >= 5 || ny < 0 || ny >= 5 || visited.includes([nx, ny].join(''))) continue;
        // 연결된 다음 좌표가 조합으로 구해진 cordArr에 없다면 탐색 x
        if (!cordArr.some((i) => i[0] === nx && i[1] === ny)) continue;
        visitedCount += dfs(nx, ny, visited);
      }
      return visitedCount;
    };

    // cordArr의 좌표에서, dfs로 인접한 좌표를 탐색하며 방문한 좌표들
    const visited = [];
    const visitedCount = dfs(startX, startY, visited);

    // 최종적으로 방문한 길이가 7이어야 7개의 좌표가 모두 연결된 것이다
    if (visitedCount === 7) return true;
    return false;
  };

  let result = 0;
  // 5*5의 사람들 중, 7명으로 이뤄진 조합을 구하는 백트래킹
  const dfsForSevenPeople = (current, index, sCount) => {
    if (current.length === 7) {
      // 구해진 조합에서, 'S'의 개수가 4개 이상 && 서로 연결돼있다면 정답 카운트
      if (sCount >= 4 && checkLinked(current)) result += 1;
      return;
    }

    for (let i = index; i < indexBoard.length; i++) {
      const [x, y] = indexBoard[i];
      current.push([x, y]);
      dfsForSevenPeople(current, i + 1, board[x][y] === 'S' ? sCount + 1 : sCount);
      current.pop();
    }
  };

  // 메인 로직
  dfsForSevenPeople([], 0, 0);
  console.log(result);

  process.exit();
});
