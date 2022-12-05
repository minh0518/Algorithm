const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const data = [];

rl.on('line', (input) => {
  data.push(input);
}).on('close', () => {
  let [M, N] = data.shift().split(' ').map(Number);
  let map = data.map((i) => {
    return i.split(' ').map(Number);
  });

  let [dx, dy] = [
    [-1, 1, 0, 0],
    [0, 0, -1, 1],
  ];

  const bfs = () => {
    let queue = [];
    for (let i = 0; i < N; i++) {
      for (let j = 0; j < M; j++) {
        if (map[i][j] === 1) queue.push([i, j]);
      }
    }

    let count = 0;
    let index=0
    while (1) { //queue의 길이를 줄일 수 없으므로 while은 무한반복으로
      let cycle = queue.length;
      let changeFlag = false;
      
      for (let i = index; i < cycle; i++) {
        const [x, y] = queue[i]
        for (let j = 0; j < 4; j++) {
          let nx = x + dx[j];
          let ny = y + dy[j];

          if (nx < 0 || ny < 0 || nx >= N || ny >= M) continue;
          if (map[nx][ny] === 0) {
            queue.push([nx, ny]);
            map[nx][ny] = 1; //방문처리
            changeFlag = true;
          }
        }
      }
 
      if (!changeFlag) return count; //while문 탈출
      count += 1
      index=cycle //위의 for문에서 index를 cycle-1까지 진행했으므로
                  //그 다음부터 탐색 시작
    }
  };

  let answer = bfs();

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      if (map[i][j] === 0) {
        answer = -1;
      }
    }
  }

  console.log(answer);

  process.exit();
});
