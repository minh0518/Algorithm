function solution(board) {
  const ROW = board.length;
  const COL = board[0].length;

  const [dx, dy] = [
    [-1, 1, 0, 0],
    [0, 0, -1, 1],
  ];

  const bfs = () => {
    const queue = [];

    // x,y,value,dir
    queue.push([0, 0, 0, 0]);

    // 비용을 확인하기 위한 3차원 배열 [방향][열][행]
    const visited = new Array(4).fill().map(() => new Array(ROW).fill().map(() => new Array(COL).fill(Infinity)));

    // 시작지점 세팅
    visited.forEach((i) => {
      i[0][0] = 0;
    });

    while (queue.length) {
      const [x, y, currentValue, currentDir] = queue.shift();

      for (let i = 0; i < 4; i++) {
        let nextValue = currentValue;
        const nx = x + dx[i];
        const ny = y + dy[i];
        if (nx < 0 || nx >= ROW || ny < 0 || ny >= COL || board[nx][ny] === 1) continue;

        nextValue += 100;
        // 시작지점 제외, queue에서 뽑은 기존 방향과 다음 좌표로의 방향이 다르다면 500원 추가
        if (!(x === 0 && y === 0) && currentDir !== i) {
          nextValue += 500;
        }

        // visited배열에서 4방향에 대한 비용을 모두 비교
        if (nextValue < visited[i][nx][ny]) {
          visited[i][nx][ny] = nextValue;
          queue.push([nx, ny, nextValue, i]);
        }
      }
    }

    return visited.map((i) => i[ROW - 1][COL - 1]);
  };
  return Math.min(...bfs());
}
