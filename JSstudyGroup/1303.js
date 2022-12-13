const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const data = [];

rl.on('line', (input) => {
  data.push(input);
}).on('close', () => {
  let [N, M] = data.shift().split(' ').map(Number);

  let warZone = data.map((i) => i.split(''));

  let scoreForBlue = [];
  let scoreForWhite = [];

  let [dx, dy] = [
    [-1, 1, 0, 0],
    [0, 0, -1, 1],
  ];

  const dfsForBlue = (x, y) => {
    let count = 1;
    warZone[x][y] = 'X';
    for (let i = 0; i < 4; i++) {
      let nx = x + dx[i];
      let ny = y + dy[i];

      if (nx >= 0 && nx < M && ny >= 0 && ny < N && warZone[nx][ny] === 'B') {
        count += dfsForBlue(nx, ny);
      }
    }
    return count;
  };

  const dfsForWhite = (x, y) => {
    let count = 1;
    warZone[x][y] = 'X'; // 방문처리
    for (let i = 0; i < 4; i++) {
      let nx = x + dx[i];
      let ny = y + dy[i];

      if (nx >= 0 && nx < M && ny >= 0 && ny < N && warZone[nx][ny] === 'W') {
        count += dfsForWhite(nx, ny);
      }
    }
    return count;
  };

  for (let i = 0; i < M; i++) {
    for (let j = 0; j < N; j++) {
      if (warZone[i][j] === 'B') {
        let score=dfsForBlue(i, j)
        scoreForBlue.push(score*score);
      }
      if (warZone[i][j] === 'W') {
        let score=dfsForWhite(i, j)
        scoreForWhite.push(score*score);
      }
    }
  }

  console.log(`${scoreForWhite.reduce((a,b)=>a+b,0)} ${scoreForBlue.reduce((a,b)=>a+b,0)}`)
  

  process.exit();
});
