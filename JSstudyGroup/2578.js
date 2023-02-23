const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const data = [];

rl.on('line', (input) => {
  data.push(input);
}).on('close', () => {
  let graph = data.slice(0, 5).map((i) => i.split(' ').map(Number));

  let numbers = data.slice(5).map((i) => i.split(' ').map(Number));
  numbers = numbers.reduce((a, b) => {
    return a.concat(b);
  });

  const findBingo = (graph) => {
    let count = 0;

    // 행
    for (let i = 0; i < 5; i++) {
      if (graph[i].join('') === 'xxxxx') count += 1;
    }

    // 열
    for (let i = 0; i < 5; i++) {
      let colsArr = [];
      for (let j = 0; j < 5; j++) {
        colsArr.push(graph[j][i]);
      }
      if (colsArr.join('') === 'xxxxx') count += 1;
    }

    // 대각선
    let startFromleftTop = [];
    let startFromrightTop = [];
    for (let i = 0; i < 5; i++) {
      startFromleftTop.push(graph[i][i]);
      startFromrightTop.push(graph[i][5 - 1 - i]);
    }
    if (startFromleftTop.join('') === 'xxxxx') count += 1;
    if (startFromrightTop.join('') === 'xxxxx') count += 1;

    return count;
  };

  let result = 0;
  for (let i = 0; i < numbers.length; i++) {
    result += 1;

    let number = numbers[i];
    for (let j = 0; j < 5; j++) {
      let eachLineofGraph = graph[j];

      let index = eachLineofGraph.indexOf(number);
      if (index !== -1) {
        graph[j][index] = 'x';
      }
    }

    let bingoCount = findBingo(graph);
    if (bingoCount >= 3) {
      break;
    }
  }

  console.log(result);

  process.exit();
});
