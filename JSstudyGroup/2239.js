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

  const findZero = () => {
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (puzzle[i][j] === 0) return true;
      }
    }
    return false;
  };

  let answer;

  const findZeroIndex = () => {
    let index = [];

    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (puzzle[i][j] === 0) index.push([i, j]);
      }
    }
    return index;
  };
  let zeroIndex = findZeroIndex();

  const dfs = (index) => {

    if (!findZero()) {
      answer = ((puzzle.map((i) => i.join('')).join('\n')));
      console.log(answer)
      process.exit();
      
    }

    for (let i = index; i < zeroIndex.length; i++) {
      let [x, y] = zeroIndex[i];

      if (puzzle[x][y] !== 0) continue;
      //if (puzzle[x][y] !== 0) dfs(i+1);

      let NextNumbers = findPossibleNumber(x, y);

      if (!NextNumbers.length) {
        return;
      }

      for (let num of NextNumbers) {
        puzzle[x][y] = num;
        dfs(i + 1);
      }
      puzzle[x][y] = 0;
      return;
    }
  };

  dfs(0);

  console.log(answer.join('\n'));

 
});