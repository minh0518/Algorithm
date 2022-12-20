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

  let target = data.splice(N - 1).map((i) => i.split(' ').map(Number));

  let nodes = data.map((i) => i.split(' ').map(Number));

  let graph = new Array(N + 1).fill().map(() => []);

  for (let i of nodes) {
    let [start, end, distance] = i;
    graph[start].push(end);
    graph[end].push(start);
  }

  let visited = new Array(N + 1).fill(false);

  let log = [];

  const dfs = (node) => {
    log.push(node);
    visited[node] = true;

    for (let i of graph[node]) {
      if (!visited[i]) {
        dfs(i);
      }
    }
  };

  let result = [];

  for (let i of target) {
    let tmp = [];
    dfs(i[0]);

    for (let j = 1; j < log.length; j++) {
      //console.log(log);
      // if (log[j] !== i[1]) {
      //   tmp.push([i[0], log[j]]);
      // } else {
      //   tmp.push([i[0], log[j]]);
      //   break;
      // }
      if (log[j] !== i[1]) {
        tmp.push([log[j - 1], log[j]]);
      } else {
        tmp.push([log[j - 1], log[j]]);
        break;
      }
    }
    

    // [ [ 1, 2 ] ]
    // [ [ 3, 4 ], [ 3, 1 ], [ 3, 2 ] ]
    let sum = [];

    for (let j = 0; j < tmp.length; j++) {
      // console.log(tmp[j])
      let [start, end] = tmp[j];
      for (let k = 0; k < nodes.length; k++) {
        let nodeInfo = nodes[k];

        if (
          (nodeInfo[0] === start || nodeInfo[1] === start) &&
          (nodeInfo[0] === end || nodeInfo[1] === end)
        ) {
          sum.push(nodeInfo[2]);
        }
      }
    }

    result.push(sum.reduce((a,b)=>a+b,0))

    log = [];

    visited = new Array(N + 1).fill(false);
  }

  console.log(result.join('\n'))

  // [1,2]
  // [[3,4], [3,1], [3,2]]

  process.exit();
});
//4개의 노드

// 2 1
// 4 3
// 1 4
// 2 (2) 1 (3) 4 (2) 3

// 1 : [ 2, 4 ]
// 2 : [ 1 ]
// 3 : [ 4 ]
// 4 : [ 3, 1 ]

// 1: [[2,2] [4,3]]
// 2: [[1,2]]
// 3: [[4,2]]
// 4: [[1,3] [3,2]]
