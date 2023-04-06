const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const data = [];

rl.on('line', (input) => {
  data.push(input);
}).on('close', () => {
  let [N, M, R] = data.shift().split(' ').map(Number);
  let arr = data.map((i) => i.split(' ').map(Number));

  let minValue = Math.min(N, M);

  const rotate = (arr) => {
		
		// 새로운 배열
    let newArr = new Array(N).fill().map(() => new Array(M));

    for (let depth = 0; depth < Math.floor(minValue / 2); depth++) {
      let rowEnd = N - 1 - depth; // depth:시작 인덱스 , rowEnd:행의 끝 인덱스

      let colEnd = M - 1 - depth; // depth:시작 인덱스 , rowEnd:열의 끝 인덱스

      for (let i = depth; i <= rowEnd - 1; i++) {

        //왼쪽
        newArr[i + 1][depth] = arr[i][depth];

        //오른쪽
        newArr[i][colEnd] = arr[i + 1][colEnd];
      }

      for (let i = depth; i <= colEnd - 1; i++) {
        
        //위쪽
        newArr[depth][i] = arr[depth][i + 1];

        //아래쪽
        newArr[rowEnd][i + 1] = arr[rowEnd][i];
      }
    }

    return newArr;
  };

  let result = arr;
  for (let i = 0; i < R; i++) {

		// 매 회전의 결과값을 다음 회전에 사용
    let next = rotate(result);
    result = next;
  }

  console.log(result.map((i) => i.join(' ')).join('\n'));

  process.exit();
});