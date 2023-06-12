function solution(maps) {
  maps = maps.map((i) => i.split(''));

  const row = maps.length;
  const col = maps[0].length;

  const [dx, dy] = [
    [-1, 1, 0, 0],
    [0, 0, -1, 1],
  ];

  const S = [];
  const L = [];
  const E = [];
  maps.forEach((i, iIndex) => {
    i.forEach((j, jIndex) => {
      if (j === 'S') S.push(iIndex, jIndex);
      if (j === 'L') L.push(iIndex, jIndex);
      if (j === 'E') E.push(iIndex, jIndex);
    });
  });

  const bfs = (index, target, visitedWithValue) => {
    let queue = [];
    const [x, y] = index;
    queue.push([x, y]);

    while (queue.length) {
      const [x, y] = queue.shift();

      for (let i = 0; i < 4; i++) {
        const nx = x + dx[i];
        const ny = y + dy[i];

        if (nx >= row || nx < 0 || ny >= col || ny < 0 || (nx === index[0] && ny === index[1]) || visitedWithValue[nx][ny] || maps[nx][ny] === 'X')
          continue;
        visitedWithValue[nx][ny] = visitedWithValue[x][y] + 1;
        queue.push([nx, ny]);
        if (maps[nx][ny] === target) {
          console.log(visitedWithValue);
          return visitedWithValue[nx][ny];
        }
      }
    }
  };

  const first = bfs(
    S,
    'L',
    new Array(row).fill().map(() => new Array(col).fill(0)),
  );

  const second = bfs(
    L,
    'E',
    new Array(row).fill().map(() => new Array(col).fill(0)),
  );

  let result = -1;
  first && second && (result = first + second);
  return result;
}

solution(['SOOOL', 'XXXXO', 'OOOOO', 'OXXXX', 'OOOOE']);
solution(['LOOXS', 'OOOOX', 'OOOOO', 'OOOOO', 'EOOOO']);
