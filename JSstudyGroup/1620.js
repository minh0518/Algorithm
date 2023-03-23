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

  let mapForNumber = new Map();
  let mapForString = new Map();

  let info = data.slice(0, N);

  for (let i = 0; i < info.length; i++) {
    mapForNumber.set(i + 1, info[i]);
    mapForString.set(info[i], i + 1); // 반대로 된 것을 하나 더 만듦
  }

  let questions = data.slice(N);

  let result = [];
  for (let i of questions) {
    let question = i;
    if (!isNaN(question)) { // 질문 유형이 숫자인 경우
      result.push(mapForNumber.get(Number(question)));
    }
    if (isNaN(question)) { // 질문 유형이 문자열인 경우
      result.push(mapForString.get(question));
    }
  }

  console.log(result.join('\n'));
  process.exit();
});