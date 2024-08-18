function solution(maps) {
  const N = maps.length;
  const M = maps[0].length;

  const [dy, dx] = [
    [-1, 1, 0, 0],
    [0, 0, -1, 1],
  ];

  const visited = new Array(N).fill(undefined).map(() => new Array(M).fill(0));
  visited[0][0] = 1;

  const bfs = () => {
    const queue = [];
    queue.push([0, 0, 1]); // y,x,value

    while (queue.length) {
      const [y, x, value] = queue.shift();

      for (let i = 0; i < 4; i++) {
        const ny = y + dy[i];
        const nx = x + dx[i];
        const nextValue = value + 1;
        if (
          ny >= N ||
          ny < 0 ||
          nx >= M ||
          nx < 0 ||
          maps[ny][nx] === 0 ||
          (visited[ny][nx] !== 0 && visited[ny][nx] <= nextValue)
        )
          continue;
        visited[ny][nx] = nextValue;
        queue.push([ny, nx, nextValue]);
      }
    }
    return visited[N - 1][M - 1];
  };
  const result = bfs();
  return result === 0 ? -1 : result;
}
