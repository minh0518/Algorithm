function solution(board) {
  board = board.map((i) => i.split(''));

  const rows = board.length;
  const cols = board[0].length;

  let [dx, dy] = [
    [-1, 1, 0, 0],
    [0, 0, -1, 1],
  ];
  const bfs = (x, y) => {
    let queue = [];

    // x,y,value
    queue.push([x, y, 0]);
    board[x][y] = 'X';

    while (queue.length) {
      const [x, y, value] = queue.shift();

      for (let i = 0; i < 4; i++) {
        let nx = x + dx[i];
        let ny = y + dy[i];

        // 게임판 범위 밖으로 나가거나 D를 만나면 while문 탈출
        // (=직전의 값이 이동가능한 좌표가 됨)
        while (1) {
          if (nx >= 0 && nx < rows && ny >= 0 && ny < cols && board[nx][ny] !== 'D') {
            nx += dx[i];
            ny += dy[i];
          } else break;
        }

        // 한 칸 되돌리기
        nx -= dx[i];
        ny -= dy[i];

        if (board[nx][ny] === 'G') {
          return value + 1;
        }

        // 해당 좌표가 이미 방문이 되어 있다면
        // 이미 보다 최소의 움직임 횟수로 갈 수 있는 경로가 있는 것이다
        // 그러므로 더이상 탐색할 필요가 없다
        if (board[nx][ny] === 'X') continue;

        board[nx][ny] = 'X';
        queue.push([nx, ny, value + 1]);
      }
    }
    return -1;
  };

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (board[i][j] === 'R') return bfs(i, j);
    }
  }
}
console.log(solution(['..R', '...', '...', '..D.', 'DG.']));
