function solution(maps) {
  const [row, col] = [maps.length, maps[0].length];

  maps = maps.map((i) =>
    i.split('').map((i) => {
      if (!isNaN(i)) return Number(i);
      return i;
    }),
  );

  const [dx, dy] = [
    [-1, 1, 0, 0],
    [0, 0, -1, 1],
  ];

  const dfs = (x, y) => {
    let count = maps[x][y];
    maps[x][y] = 'X';
    for (let i = 0; i < 4; i++) {
      const nx = x + dx[i];
      const ny = y + dy[i];

      if (!(nx < row && nx >= 0 && ny < col && ny >= 0 && maps[nx][ny] !== 'X')) continue;
      count += dfs(nx, ny);
    }
    return count;
  };

  const result = [];
  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      const value = maps[i][j];
      if (value === 'X') continue;
      result.push(dfs(i, j));
    }
  }

  return result.length ? result.sort((a, b) => a - b) : [-1];
}
