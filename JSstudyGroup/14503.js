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

  let [r, c, d] = data.shift().split(' ').map(Number);

  let map = data.map((i) => i.split(' ').map(Number));

  let visited = new Array(N).fill().map(() => new Array(M).fill(false));

  let count = 0;

  let [dx, dy] = [
    [-1, 0, 1, 0],
    [0, 1, 0, -1],
  ];

  let queue = [[r, c, d]];

  while (queue.length) {
    let [x, y, r] = queue.shift();


    //해당 위치 청소
    if (
      x >= 0 &&
      x < N &&
      y >= 0 &&
      y < M &&
      map[x][y] === 0 &&
      !visited[x][y]
    ) {
      count += 1;
      visited[x][y] = true;
    }


    //여기서 push되는게 없으면 while 종료
    for (let i = 0; i < 4; i++) {
      if (r === 0) r = 3;
      else r -= 1;

      let nx = x + dx[r];
      let ny = y + dy[r];

      //2-1
      if (
        nx >= 0 &&
        nx < N &&
        ny >= 0 &&
        ny < M &&
        map[nx][ny] === 0 &&
        !visited[nx][ny]
      ) {
        queue.push([nx, ny, r]);
        break;
      }

      //3일때가 한바퀴를 다 돌면서 갈 수 있는지 확인한 것이고
      //위에 if문에 안 걸리게 된다면 여기서 2-3 2-4 진행
      if (i === 3) {
        let reverseR;
        if (r >= 2) reverseR = r - 2;
        else reverseR = r + 2;

        let reverseX = x + dx[reverseR];
        let reverseY = y + dy[reverseR];

        //후진 가능
        if (
          reverseX >= 0 &&
          reverseX < N &&
          reverseY >= 0 &&
          reverseY < M &&
          map[reverseX][reverseY] === 0
        ) {
          queue.push([reverseX, reverseY, r]);
          break;
        }

        //후진 불가능
        else break
      }
    }
//어차피 위에 조건들에 안 걸리게 되면 2-2가 자동으로 진행(=회전만 하고 다음while문 진행)
  }

  console.log(count);

  process.exit();
});


//왼쪽 방향 이동
//0 > -1+4 =3    북일때 서
//1 > 0      동일때 북
//2 > 1
//3 > 2

//뒤로가기
//0 > 2 북일 때 남
//1 > 3 서일 때 동
//2 > 0 남일 때 북
//3 > 1 동일 때 서

// 1.현재 위치 청소
// 2.현재 방향을 기준으로 왼쪽부터 탐색함
//   1.청소 안한곳이 있으면 그 방향으로 회전후, 전진해서 청소 (다시 1번 반복)
//   2.왼쪽청소 못하면 그 방향으로 회전만 함 (다시 2번 반복)
//   3.네 방향 다 청소되어있고 벽이라면 방향만 유지하고 후진 (다시 2번 반복)
//   4.네 방향 다 청소되어있고 벽이고 뒤에 벽이어서 후진도 안되면 끝