const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const data = [];

rl.on('line', (input) => {
  data.push(input);
}).on('close', () => {
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
    //0의 갯수
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

  process.exit();
});

// 정답
// 23
// 3
// 9

// '####'
// '##.#'
// '.#.#'

// '.#.'
// '#..'
// '.#.'

// '.....####'
// '..#...###'
// '.#.##..##'
// '..#..#...'
// '..#...#..'
// '...###...'
