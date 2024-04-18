const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const data = [];

rl.on('line', (input) => {
  data.push(input);
}).on('close', () => {
  const [N, M, K] = data.shift().split(' ').map(Number);
  const board = data.slice(0, N).map((i) => i.split(' ').map(Number));
  const rotateInfo = data.slice(N).map((i) => i.split(' ').map(Number));
  const visitedArr = new Array(K).fill(false);

  const rotate = (copyBoard, rotateInfo) => {
    // 순열로 생성된 이동 정보를 순회하며 회전을 진행
    for (let [r, c, s] of rotateInfo) {
      const from = [r - s - 1, c - s - 1];
      const to = [r + s - 1, c + s - 1];

      // 차이가 아닌 갯수를 파악해야 하므로 +1
      const minLength = Math.min(to[0] - from[0] + 1, to[1] - from[1] + 1);

      const maxDepth = Math.floor(minLength / 2);
      let depth = 0;

      // depth <= maxDepth가 맞긴 한데, 사실 마지막 depth에서는 아무런 동작도 하지 않으므로
      while (depth < maxDepth) {
        let startRow = from[0] + depth;
        let startCol = from[1] + depth;
        let endRow = to[0] - depth;
        let endCol = to[1] - depth;

        const topRight = copyBoard[startRow][endCol];

        // 위
        for (let i = endCol; i >= startCol + 1; i--) {
          copyBoard[startRow][i] = copyBoard[startRow][i - 1];
        }

        // 왼
        for (let i = startRow; i <= endRow - 1; i++) {
          copyBoard[i][startCol] = copyBoard[i + 1][startCol];
        }

        // 아래
        for (let i = startCol; i <= endCol - 1; i++) {
          copyBoard[endRow][i] = copyBoard[endRow][i + 1];
        }

        // 오
        for (let i = endRow; i >= startRow + 2; i--) {
          copyBoard[i][endCol] = copyBoard[i - 1][endCol];
        }
        copyBoard[startRow + 1][endCol] = topRight;
        depth += 1;
      }
    }

    return Math.min(
      ...copyBoard.map((row) => {
        return row.reduce((acc, value) => acc + value);
      }),
    );
  };

  let minValue = Infinity;
  const dfs = (current) => {
    if (current.length === rotateInfo.length) {
      const value = rotate(JSON.parse(JSON.stringify(board)), current);
      if (minValue > value) minValue = value;
      return;
    }
    for (let i = 0; i < rotateInfo.length; i++) {
      if (visitedArr[i]) continue;
      current.push(rotateInfo[i]);
      visitedArr[i] = true;
      dfs(current);
      current.pop();
      visitedArr[i] = false;
    }
  };

  dfs([]);
  console.log(minValue);

  process.exit();
});
