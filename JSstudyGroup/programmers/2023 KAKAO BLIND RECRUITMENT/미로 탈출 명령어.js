function solution(n, m, x, y, r, c, k) {
  const board = new Array(n).fill().map(() => new Array(m).fill('.'));
  const start = [x - 1, y - 1];
  const end = [r - 1, c - 1];
  board[x - 1][y - 1] = 'S';
  board[r - 1][c - 1] = 'E';

  // d l r u
  const [dx, dy] = [
    [1, 0, 0, -1],
    [0, -1, 1, 0],
  ];

  const dir = {
    0: 'd',
    1: 'l',
    2: 'r',
    3: 'u',
  };

  const getDistance = (x, y) => {
    return Math.abs(end[0] - x) + Math.abs(end[1] - y);
  };

  const distanceFromStart = getDistance(start[0], start[1]);
  // k번으로 E까지 갈 수 없거나, E에서 남은 이동횟수가 홀수라면 불가능
  if (distanceFromStart > k || (k - distanceFromStart) % 2 === 1) {
    return 'impossible';
  }

  let answer = 'z';
  const dfs = (x, y, depth, traceLog) => {
    const distanceFromNow = getDistance(x, y);

    // 현재 좌표로부터 최단거리로 남은 곳으로 목적지에 도착을 해도
    // k번을 초과하기 때문에 불가능하다
    if (k < depth + distanceFromNow) {
      return;
    }
    if (depth === k && board[x][y] === 'E') {
      if (answer > traceLog) answer = traceLog;
      return;
    }

    for (let i = 0; i < 4; i++) {
      const nx = x + dx[i];
      const ny = y + dy[i];

      // *사전순으로도 빠른 경우에만 재귀 호출
      if (nx < 0 || nx >= n || ny < 0 || ny >= m || traceLog > answer) continue;

      dfs(nx, ny, depth + 1, traceLog + dir[i]);
    }
  };

  dfs(start[0], start[1], 0, '');

  return answer;
}
