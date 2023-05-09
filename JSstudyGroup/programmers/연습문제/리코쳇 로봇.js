function solution(board) {
  let answer = 0;
  board = board.map((items) => items.split(''));

  const queue = [];
  const rows = board.length; // 가로 길이
  const cols = board[0].length; // 세로 길이

  const [dx, dy] = [
    [-1, 1, 0, 0],
    [0, 0, -1, 1],
  ];

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (board[i][j] === 'R') {
        queue.push([i, j]);
        board[i][j] === 0;
      }
    }
  }

  // 2) q의 길이 만큼 반복
  while (queue.length) {
    // 3) 횟수(answer)를 카운트하기 위해 현재 q의 길이를 고정시킨다.
    const size = queue.length;

    // 4) 고정시킨 길이만큼 반복한다.
    for (let i = 0; i < size; i++) {
      const [x, y] = queue.shift();

      // 5) 상하좌우 한번씩 확인
      for (let j = 0; j < 4; j++) {
        // 6) 다음 이동 위치
        let nx = x + dx[j];
        let ny = y + dy[j];

        // 7) 게임판 범위와 벽(D)를 만나지 않을 경우만 미끄러진다.
        while (nx >= 0 && nx < rows && ny >= 0 && ny < cols && board[nx][ny] !== 'D') {
          nx += dx[j];
          ny += dy[j];
        }

        // 8) 다시 한칸 직전으로 돌아온다 (벽 직전까지 이동가능하므로)
        nx -= dx[j];
        ny -= dy[j];

        // 9) 현재 위치가 도착(G) 지점이면 횟수(answer)를 1증가 후 반환한다.
        if (board[nx][ny] === 'G') return answer + 1;

        // 10) 한번이라도 방문한적이 없을 경우만
        if (board[nx][ny] !== 0) {
          // 11) 방문 표시(O) 후 q에 담는다.
          board[nx][ny] = 0;
          queue.push([nx, ny]);
        }
      }
    }
    answer++;
  }

  return -1;
}

solution(['...D..R', '.D.G...', '....D.D', 'D....D.', '..D....']);
// solution(['.D.R', '....', '.G..', '...D']);
