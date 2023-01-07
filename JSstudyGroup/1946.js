const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const data = [];

rl.on('line', (input) => {
  data.push(input);
}).on('close', () => {
  const calc = (rank) => {
    rank.sort((a, b) => a[0] - b[0]);

    let top = rank[0][1];
    let count = 1;
    for (let i = 1; i < rank.length; i++) {
      if (rank[i][1] < top) {
        count++;
        top = rank[i][1];
      }
    }

    return count;
  };
  // [ 3, 6 ]이 [ 1, 4 ]를 이긴다면 어차피 [ 1, 4 ]는 [ 2, 5 ]를 이긴 놈이므로
  // [ 3, 6 ]은 [ 2, 5 ]랑 비교를 할 필요도 없다
    
  // [ 3, 6 ]이 [ 1, 4 ]한테 진다면 바로 탈락이니까 [ 2, 5 ]랑 비교를 할 필요도 없다

  let T = +data.shift();

  let answer = [];

  //0~5 (+5)
  //6~13 (+7)
  //14~17 (+3)
  let index = 0;
  for (let i = 0; i < T; i++) {
    [N, ...rank] = data.slice(index, index + Number(data[index]) + 1);

    rank = rank.map((i) => {
      return i.split(' ').map(Number);
    });

    answer.push(calc(rank));

    index += Number(data[index]) + 1;
  }

  console.log(answer.join('\n'));

  process.exit();
});

// 3 6

// 7 3 w l
// 4 2 w l
// 1 4 l l
// 5 7
// 2 5
// 6 1

// 7 3

// 3 6 l w
// 4 2 l l
// 1 4
// 5 7
// 2 5
// 6 1
