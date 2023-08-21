function solution(board) {
  const boardLength = board.length;

  const [dx, dy] = [
    [-1, 1, 0, 0],
    [0, 0, -1, 1],
  ];

  const chargeBoad = new Array(4)
    .fill()
    .map(() =>
      new Array(boardLength)
        .fill()
        .map(() => new Array(boardLength).fill(Infinity)),
    );

  let result = [];
  const bfs = (start) => {
    let [x, y] = start;
    const queue = [];
    queue.push([x, y, 0, 0]);

    while (queue.length) {
      let [x, y, dir, charge] = queue.shift();

      // 정답 좌표에 도달했으면 해당 비용을 result배열에 추가 (바로 정답 리턴하면 안 됨)
      if (x === boardLength - 1 && y === boardLength - 1) result.push(charge);

      for (let i = 0; i < 4; i++) {
        let nx = x + dx[i];
        let ny = y + dy[i];
        let changeFlag = false;
        if (
          nx < boardLength &&
          nx >= 0 &&
          ny < boardLength &&
          ny >= 0 &&
          board[nx][ny] === 0
        ) {
          // 최초 좌표[0,0]일때는 방향 전환x
          if ((x !== 0 || y !== 0) && i !== dir) changeFlag = true;

          let nextCharge = changeFlag ? charge + 600 : charge + 100;

          // 항상 각 좌표에 대해 chargeBoad값과 비교해 가는데 추가로 그 좌표에 도달하는 방향까지 비교
          if (chargeBoad[i][nx][ny] > nextCharge) {
            chargeBoad[i][nx][ny] = nextCharge;
            queue.push([nx, ny, i, nextCharge]);
          }
        }
      }
    }
  };

  bfs([0, 0]);

  return Math.min(...result);
}
