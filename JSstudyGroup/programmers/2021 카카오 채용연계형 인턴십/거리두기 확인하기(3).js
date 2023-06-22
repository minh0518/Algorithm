function solution(places) {
  const calc = (place) => {
    place = place.map((i) => i.split(''));

    const [dx, dy] = [
      [-1, 1, 0, 0],
      [0, 0, -1, 1],
    ];

    const dfs = (x, y, depth, visited) => {
      if (depth === 2) {
        return true;
      }

      visited[x][y] = true;
      for (let i = 0; i < 4; i++) {
        let nx = x + dx[i];
        let ny = y + dy[i];

        if (nx >= 0 && nx < 5 && ny >= 0 && ny < 5 && !visited[nx][ny]) {
          // 다음 좌표 (depth+1) 에 O이 있는 경우
          if (place[nx][ny] === 'O' && !dfs(nx, ny, depth + 1, visited)) return false;
          // 다음 좌표 (depth+1) 에 P가 있는 경우
          // 여기서 발견된 P는
          // (현재 depth가 0이었다면)depth가 1이거나
          // (현재 depth가 1이었다면)depth가 2가 된다 즉, 거리두기를 위반한 것이다
          // (depth가 2가 되면 계속 재귀를 리턴하므로)
          if (place[nx][ny] === 'P') return false;
        }
      }
      return true; // 2거리 내에 P를 발견하지 않았을 경우 if문에서 재귀를 탈출하다가
      // 가장 상위 최종적으로 true를 리턴
    };

    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 5; j++) {
        if (
          place[i][j] === 'P' &&
          !dfs(
            i,
            j,
            0,
            new Array(5).fill().map(() => new Array(5).fill(false)),
          )
        ) {
          return false;
        }
      }
    }
    return true;
  };

  let result = [];
  while (places.length) {
    let place = places.shift();
    calc(place) ? result.push(1) : result.push(0);
  }

  console.log(result);
  return result;
}
