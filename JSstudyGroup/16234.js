const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const data = [];

rl.on('line', (input) => {
  data.push(input);
}).on('close', () => {
  let [N, L, R] = data.shift().split(' ').map(Number);
  let map = data.map((i) => i.split(' ').map(Number));

  let [dx, dy] = [
    [-1, 1, 0, 0],
    [0, 0, -1, 1],
  ];

  // dfs로 서로 연결 가능한 나라를 찾는다
  const findConnectable = (queue) => {
    let visited = new Array(N).fill().map(() => new Array(N).fill(false));

    const dfs = (index) => {
      let [x, y] = index;
      visited[x][y] = true;

      for (let dir = 0; dir < 4; dir++) {
        let nx = x + dx[dir];
        let ny = y + dy[dir];

        if (nx >= 0 && nx < N && ny >= 0 && ny < N) {
          let sub = Math.abs(map[x][y] - map[nx][ny]);

          if (sub >= L && sub <= R && !visited[nx][ny]) {
            queue[queue.length - 1].push([nx, ny]);
            dfs([nx, ny]);
          }
        }
      }
    };

    for (let i = 0; i < N; i++) {
      for (let j = 0; j < N; j++) {
        if (!visited[i][j]) {
          queue.push([[i, j]]);
          dfs([i, j]);
        }
      }
    }
  };

  let count = 0;


  // 메인 로직
  while (1) {
    let queue = [];
    findConnectable(queue); // 일부러 참조값을 전달
    // console.log(queue)

    // 연결될 수 있는 나라들이 하나도 없을때 자기 자신만 리턴이 되므로
    // 필터링을 해서 break
    queue = queue.filter((i) => {
      return i.length > 1;
    });
    if (!queue.length) break;


    while (queue.length) { 
      let linkInfo = queue.shift();

      let sum = 0;
      linkInfo.forEach((i) => {
        sum += map[i[0]][i[1]];
      });

      let avg = Math.floor(sum / linkInfo.length);

      linkInfo.forEach((i) => {
        map[i[0]][i[1]] = avg;
      });
    }

    count += 1;
  }

  console.log(count);

  process.exit();
});
