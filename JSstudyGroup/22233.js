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

  let keywords = new Map();
  for (let i = 0; i < N; i++) {
    keywords.set(data[i], true);
  }

  let answer = new Set();
  let result = [];
  let memo=[]
  for(let i=N; i<N+M; i++){
    memo.push(data[i].split(','))
  }  

  for (let i = 0; i < M; i++) {
    let arr = memo[i];
    for (let j = 0; j < arr.length; j++)
      if (keywords.has(arr[j])) {
        answer.add(arr[j]);
      }
    result.push(keywords.size - answer.size);
  }

  console.log(result.join('\n'));

  process.exit();
});
