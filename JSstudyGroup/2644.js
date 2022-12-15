const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const data = [];

rl.on('line', (input) => {
  data.push(input);
}).on('close', () => {
  let n = +data.shift();

  let target = data.shift().split(' ').map(Number);

  let m = +data.shift();

  let family = data.map((i) => i.split(' ').map(Number));

  let graph = new Array(n + 1).fill().map(() => []);

	//그래프 생성
  for (let i = 0; i < family.length; i++) {
    let [parent, child] = family[i];
    graph[parent].push(child);
    graph[child].push(parent);
  }

  let visited = new Array(n + 1).fill(false);

  let traceLog = [];

  const dfs = (index, depth) => {
    visited[index] = true;
    traceLog.push([index, depth]);

    for (let i = 0; i < graph[index].length; i++) {
      let next = graph[index][i];
      if (!visited[next]) {
        dfs(next, depth + 1);
      }
    }

    return;
  };
  dfs(target[0], 0);

  //console.log(traceLog);

  let answer = -1;
  for (let i of traceLog) {
    if (i[0] === target[1]) {
      answer = i[1];
    }
  }

  console.log(answer);

  process.exit();
});

// 할아버지
// 아버지  형제들
// 나

//아버지의 형제들하고 내가 3촌인 이유는
//'형제들 - 할아버지 - 아버지' 이렇게 할아버지를 거쳐서 내려오기 때문인듯

//         1                 4
//     2        3         5     6
//  7  8  9