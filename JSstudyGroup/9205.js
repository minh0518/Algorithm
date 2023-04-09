const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const data = [];

rl.on('line', (input) => {
  data.push(input);
}).on('close', () => {
  let T = +data.shift();
  let result = [];
  const solution = () => {
    let storeCount = +data.shift();
    let home = data.shift().split(' ').map(Number);
    let store = data.splice(0, storeCount + 1).map((i) => i.split(' ').map(Number));
    let festival = store[store.length - 1];

    // 편의점 정보는 최초에 주어진 정보에서 불변하고
    // 아래 로직에서 매 while문 마다 고정적으로 0부터 store.length까지 for문을 돌게 되므로
    // 인덱스 형태로 사용한다
    let visited = new Array(storeCount).fill(false);

    if (storeCount === 0) {
      let distance = Math.abs(home[0] - festival[0]) + Math.abs(home[1] - festival[1]);
      if (distance <= 1000) {
        result.push('happy');
        return;
      }
      result.push('sad');
      return;
    }

    let next = [home];
    while (next.length) {
      let current = next.shift();

      for (let i = 0; i < store.length; i++) {
        if (visited[i]) continue;

        let distance = Math.abs(current[0] - store[i][0]) + Math.abs(current[1] - store[i][1]);

        if (distance <= 1000) {
          if (store[i].join('') === festival.join('')) {
            result.push('happy');
            return;
          }
          // 1000미터 이내의 도달가능한 곳에 대해서만 방문처리 및 다음 방문 좌표로 push
          visited[i] = true;
          next.push(store[i]);
        }
      }
    }

    result.push('sad');
  };

  while (T--) {
    solution();
  }

  console.log(result.join('\n'));
  process.exit();
});

// 맥주 20개
// 50미터당 1개
// >> 1000이 최대
// d=|x1-y1| + |x2-y2|
