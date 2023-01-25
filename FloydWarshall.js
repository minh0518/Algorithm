const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const data = [];

rl.on('line', (input) => {
  data.push(input);
}).on('close', () => {
  let INF = Infinity;

  let N = 4; // 노드의 수
  let M = 7; // 전체 간선의 갯수

  // '1 2 4' >> 1에서 2로가는데 비용은 4
  let edge = ['1 2 4', '2 1 3', '1 4 6', '2 3 7', '3 1 5', '3 4 4', '4 3 2'];

  let graph = new Array(N + 1).fill().map(() => new Array(N + 1).fill(INF));

  //console.log(graph)

  //자기자신으로 가는 비용은 0으로 초기화(그래프 대각선)
  //0행0열은 안 쓰는 것이므로 버림 (인덱스와 노드번호 일치를 위해)
  for (let i = 1; i < N + 1; i++) {
    for (let j = 1; j < N + 1; j++) {
      if (i === j) graph[i][j] = 0;
    }
  }

  //console.log(graph)

  //각 간선의 비용으로 업데이트
  for (let i = 0; i < M; i++) {
    let [a, b, c] = edge[i].split(' ').map(Number);

    graph[a][b] = c;		
    // 만약 무방향이라면 graph[b][a] = c;도 해줘야 했겠지만
    // 여기선 애초에 양방향이므로 x
  }

  //console.log(graph)

  //플로이드 와샬 알고리즘 수행(k노드 적용)
  for (let k = 1; k < N + 1; k++) {
    for (let a = 1; a < N + 1; a++) {
      for (let b = 1; b < N + 1; b++) {
        graph[a][b] = Math.min(graph[a][b], graph[a][k] + graph[k][b]);
      }
    }
  }

  console.log(graph);

  process.exit();
});
