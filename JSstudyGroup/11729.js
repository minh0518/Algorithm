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

  let result = [];
  const move = (n, start, end) => {

  //1개를 옮길때만 실제 옮긴 것이므로 체크
    if (n === 1) {
      result.push([start, end]);
      return;
    }

    //1~n-1개를 start에서 나머지(목표하는 곳 말고)로 옮긴다
    //console.log(`1단계 재귀 호출 ${n - 1} ${start} ${6 - start - end}`)
    move(n - 1, start, 6 - start - end);  // 1단계

    //맨 아래 있던 것을 목표하고자 하는 곳 맨 아래로 이동
    //console.log(`탈출 , 2단계 ${n} ${start} ${end}`)
    result.push([start, end]);  // 2단계

    //1~n-1개를 나머지에서 목표하고자 했던 곳으로 옮긴다
    //console.log(`3단계 재귀 호출 ${n - 1} ${6 - start - end} ${end}`)
    move(n - 1, 6 - start - end, end);  // 3단계
  };

  
  //console.log(`시작 ${N} ${1} ${3}`)
  move(N, 1, 3);
  console.log(result.length)
  console.log(result.map(i=>i.join(' ')).join('\n'))
  

  process.exit();
});

//1~n-1번째가 쌓아져있는 원판 묶음을 임시위치(6-cur-next)로 옮기고, 

//n번째 원판을 원하는 위치(next)로 옮기고,

//다시 원판 묶음을 임시위치에서 원하는 위치(next)에 옮겨야 한다.

// 이 과정에서 1~n-1번째 원판 묶음을 임시 위치로 옮길 때에는 

// 다시 1~n-2번째 원판 묶음부터 .... 이런 식으로 재귀적으로 움직인다