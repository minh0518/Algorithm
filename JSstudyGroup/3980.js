const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const data = [];

rl.on('line', (input) => {
  data.push(input);
}).on('close', () => {
  let N = +data.shift();

	// 각 테스트케이스에 맞게 11줄짜리 배열을 가져오기 위해 사용
  let startIndex = 0;
  let result = [];

  for (let i = 0; i < N; i++) {
    let info = data
      .slice(startIndex, startIndex + 11)
      .map((i) => i.split(' ').map(Number));

    let squad = new Array(11).fill(0);

    let allSquadResult = [];

    const dfs = (index) => {
      if (index === 11) {
        allSquadResult.push(squad.reduce((a, b) => a + b, 0));
        return;
      }

      let player = [...info[index]];

      for (let i = 0; i < player.length; i++) {
        let stat = player[i];
        if (stat !== 0 && squad[i] === 0) {
          squad[i] = stat;
          dfs(index + 1);
          squad[i] = 0;
        }
      }
    };

    dfs(0);
    startIndex += 11;
    result.push(Math.max(...allSquadResult));
  }

  console.log(result.join('\n'));

  process.exit();
});