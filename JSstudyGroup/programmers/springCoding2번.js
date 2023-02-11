// # 로 둘러쌓인 너비를 구하는 것이다
// # 과 그 안에 감싸진 . 까지 구해야 한다
// 가장자리는 둘러쌓인 것이 아니다

// '.....####'
// '..#...###'
// '.#.##..##'
// '..#..#...'
// '..#...#..'
// '...###...'

// '.#.'
// '#..'
// '.#.' 


// '####'
// '##.#'
// '.#.#'
// >> 이 경우 .들은 결국 둘러쌓이지 않았으므로 너비로 인정되지 않는다


function solution(grid) {
  grid = grid.map((i) => i.split(''));

  let width = grid[0].length;
  let height = grid.length;

  let visited = new Array(height).fill().map(() => new Array(width).fill(0));

  let [dx, dy] = [
    [-1, 1, 0, 0],
    [0, 0, -1, 1],
  ];
  const dfs = (x, y) => {
    visited[x][y] = 1;

    for (let i = 0; i < 8; i++) {
      let nx = x + dx[i];
      let ny = y + dy[i];

      if (
        nx < height &&
        nx >= 0 &&
        ny < width &&
        ny >= 0 &&
        visited[nx][ny] === 0
      ) {
        if (grid[nx][ny] === '.') {
          dfs(nx, ny);
        }
      }
    }
  };
  for (let i = 0; i < width; i++) {
    if (grid[0][i] === '.' && visited[0][i] === 0) dfs(0, i);
    if (grid[height - 1][i] === '.' && visited[height - 1][i] === 0)
      dfs(height - 1, i);
  }

  for (let i = 0; i < height; i++) {
    if (grid[i][0] === '.' && visited[i][0] === 0) dfs(i, 0);
    if (grid[i][width - 1] === '.' && visited[i][width - 1] === 0)
      dfs(i, width - 1);
  }

  //console.log(visited.map((i) => i.join('')));

  let answer = 0;

  //0의 갯수 count === 넓이
  visited.map((i) => {
    answer += i.filter((number) => {
      return number !== 1;
    }).length;
  });
  console.log(answer);
}

// 가장자리의 . 에 대해서 dfs
solution([
  '.....####',
  '..#...###',
  '.#.##..##',
  '..#..#...',
  '..#...#..',
  '...###...',
]);
solution(['.#.', '#..', '.#.']);
solution(['####', '##.#', '.#.#']);

// 정답
// 23
// 3
// 9
