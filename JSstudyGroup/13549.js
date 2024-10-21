const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const data = [];

rl.on('line', (input) => {
  data.push(input);
}).on('close', () => {
  const MAX = 100000;
  const [N, K] = data.shift().split(' ').map(Number);

  const bfs = () => {
    /** 문제에서 방문 가능한 위치는 0~10만 */
    const dp = new Array(MAX + 1).fill(Infinity);
    dp[N] = 0;

    const queue = [];
    queue.push([N, 0]);

    let index = 0;
    while (index < queue.length) {
      const [node, value] = queue[index++];

      // 순간이동
      const double = node * 2;
      if (double <= MAX && dp[double] > value) {
        dp[double] = value;
        queue.push([double, value]);
      }

      // 앞으로
      const foward = node + 1;
      if (foward <= MAX && dp[foward] > value + 1) {
        dp[foward] = value + 1;
        queue.push([foward, value + 1]);
      }

      // 뒤로
      const backward = node - 1;
      // 0번 위치도 문제에서 포함하고 있으므로 0인덱스까지 이동해야 함
      if (backward >= 0 && dp[backward] > value + 1) {
        dp[backward] = value + 1;
        queue.push([backward, value + 1]);
      }
    }

    return dp[K];
  };
  const result = bfs();

  console.log(result);

  process.exit();
});
