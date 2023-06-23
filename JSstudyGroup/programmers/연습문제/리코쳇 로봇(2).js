function solution(board) {
  board = board.map((i) => i.split(''));

  const rol = board.length;
  const col = board[0].length;

  let [dx, dy] = [
    [-1, 1, 0, 0],
    [0, 0, -1, 1],
  ];
  const bfs = (x, y) => {
    let queue = [];

    // x,y,depth
    queue.push([x, y, 0]);

    // 방문 배열
    const visited = new Array(rol).fill().map(() => new Array(col).fill(false));
    visited[x][y] = true;

    // 한번의 움직임당 탐색할 수 있는 시작 좌표들의 갯수들
    let calcLength = queue.length;

    while (queue.length) {
      for (let times = 0; times < calcLength; times++) {
        let [x, y, depth] = queue.shift();

        for (let i = 0; i < 4; i++) {
          let nx = x;
          let ny = y;
          while (1) {
            nx += dx[i];
            ny += dy[i];

            // D를 만나거나 가장자리로 나간다면
            if (nx === -1 || nx === rol || ny === -1 || ny === col || board[nx][ny] === 'D') {
              // 한칸 다시 뒤로 빼줌
              nx -= dx[i];
              ny -= dy[i];
              break;
            }
          }

          if (board[nx][ny] === 'G') {
            // 결국은 G까지 이동해야 하므로
            return depth + 1;
          }

          // 해당 좌표가 이미 방문이 되어 있다면
          // 이미 보다 최소의 움직임 횟수로 갈 수 있는 경로가 있는 것이다
          // 그러므로 더이상 탐색할 필요가 없다
          if (!visited[nx][ny]) {
            // 방문하지 않았다면
            queue.push([nx, ny, depth + 1]);
            visited[nx][ny] = true;
          }
        }
      }

      // 새로 추가된 queue의 길이로 갱신
      calcLength = queue.length;
    }
  };

  let result = -1;
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      if (board[i][j] === 'R') {
        let value = bfs(i, j);
        if (value) result = value;
      }
    }
  }
  return result;
}
