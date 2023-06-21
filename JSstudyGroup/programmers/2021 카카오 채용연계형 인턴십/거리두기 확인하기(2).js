function solution(places) {
  const calc = (info) => {
    console.log(info);
    let [dx, dy] = [
      [-1, 1, 0, 0],
      [0, 0, -1, 1],
    ];
    info = info.map((i) => i.split(''));

    const bfs = (startX, startY) => {
      const visited = new Array(info.length).fill().map(() => new Array(info[0].length).fill(false));
      let queue = [[startX, startY, 0]];
      visited[startX][startY] = true;

      while (queue.length) {
        let [x, y, depth] = queue.shift();

        // 깊이가 2인 곳까지 왔는데 지금까지 P가 발견되지 않은 것이므로 true를 리턴
        // 왜냐하면 어차피 여기서 이제 연결된 모든 곳들은 depth가 3이 되는데
        // 그건 P가 나와도 거리두기를 지킨 것이기 때문이다
        if (depth >= 2) return true;
        // continue를 안하고 바로 return을 때려버려도 괜찮다
        // 왜냐하면 bfs특성상 depth가 1인 좌표들을 한번에 모두 push하고,
        // depth가 2인 좌표들을 한번에 모두 push하고, ... 이런 식이기 때문에 특정 depth가 나오는순간
        // 그 다음은 무조건 그 이상인 depth만 나오기 때문

        for (let i = 0; i < 4; i++) {
          let nx = x + dx[i];
          let ny = y + dy[i];

          if (nx >= 0 && nx < 5 && ny >= 0 && ny < 5 && !visited[nx][ny]) {
            if (info[nx][ny] === 'O') {
              visited[nx][ny] = true;
              queue.push([nx, ny, depth + 1]);
            }
            // 어차피 depth가 2보다 크다면 위에서 걸려졌으므로 여기서 걸린거면 무조건 거리 내에 있는 것이다
            if (info[nx][ny] === 'P') {
              console.log(startX, startY, nx, ny);
              return false;
            }
          }
        }
      }
      // 이동을 하면서 depth가 2가 되기도 전에 while문들 탈출하는 경우가 있으므로
      // 여기도 처리를 해줘야 함 (EX) P 상하좌우로 X만 있는 경우)
      return true;
    };

    for (let i = 0; i < info.length; i++) {
      for (let j = 0; j < info[i].length; j++) {
        if (info[i][j] === 'P' && !bfs(i, j)) {
          // 하나라도 지키지 않았다면 바로 false 리턴
          return false;
        }
      }
    }
    return true;
  };

  let result = [];
  for (let i of places) {
    calc(i) ? result.push(1) : result.push(0);
  }
  return result;
}
