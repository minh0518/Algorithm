const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const data = [];

rl.on('line', (input) => {
  data.push(input);
}).on('close', () => {
  let puzzle = data.map((i) => i.split('').map(Number));

  const existNumOnSquare = (x, y) => {
    let visited = [];

    let rowStart = Math.floor(x / 3) * 3;
    let colStart = Math.floor(y / 3) * 3;

    let rowEnd = rowStart + 3;
    let colEnd = colStart + 3;

    for (let i = rowStart; i < rowEnd; i++) {
      for (let j = colStart; j < colEnd; j++) {
        let value = puzzle[i][j];
        if (value === 0) continue;
        visited.push(value);
      }
    }

    return visited;
  };

  const findPossibleNumber = (x, y) => {
    let result = new Array(9).fill().map((_, i) => i + 1);

    let exist = [];

    for (let i = 0; i < 9; i++) {
      let value = puzzle[x][i];
      if (value !== 0) {
        exist.push(value);
      }
    }
    for (let i = 0; i < 9; i++) {
      let value = puzzle[i][y];
      if (value !== 0) {
        exist.push(value);
      }
    }

    result = result.filter((i) => {
      return !exist.includes(i);
    });

    let checkSquareResult = existNumOnSquare(x, y);

    //result는 현재 십자가로 가능한 값
    //checksquare는 3x3에 현재 있는 값들
    result = result.filter((i) => {
      return !checkSquareResult.includes(i);
    });

    return result;
  };


  //메인 로직
  function dfs(puzzle) {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {

        if (puzzle[row][col] !== 0) continue; // 0이 아니면 패스

        // 해당 좌표에서 스도쿠로 가능한 값을 받아옴
        let numbers = findPossibleNumber(row, col); 
        
        // 그 값들을 순회하면서 0의 좌표에 차례대로 넣어줌
        for (let i of numbers) {
          puzzle[row][col] = i;
          if (dfs(puzzle)) return true; 
          //dfs가 true면 바로 true를 리턴하고 해당 재귀 종료
          //dfs가 false면 다음 숫자를 집어넣고 재귀 실행
        }
        puzzle[row][col] = 0;
        return false;
      }
    }

    return true;
  }

  dfs(puzzle);

  console.log(puzzle.map((i) => i.join('')).join('\n'));

  process.exit();
});