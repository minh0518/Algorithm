const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const data = [];

rl.on('line', (input) => {
  data.push(input);
}).on('close', () => {
  const [r, c, k] = data.shift().split(' ').map(Number);
  let arr = data.map((row) => row.split(' ').map(Number));

  const convretRowCol = (arr) => {
    const result = [];
    const rowLength = arr.length;
    const colLength = arr[0].length;

    for (let j = 0; j < colLength; j++) {
      result.push([]);
      for (let i = 0; i < rowLength; i++) {
        if (arr[i][j] === undefined) continue;
        result[result.length - 1].push(arr[i][j]);
      }
    }

    return result;
  };

  const getR = (arr) => {
    let maxLegnth = 0;
    for (let i = 0; i < arr.length; i++) {
      const info = new Map();
      const row = arr[i].filter((i) => i !== 0);
      for (let j = 0; j < row.length; j++) {
        const col = row[j];
        info.set(col, info.has(col) ? info.get(col) + 1 : 1);
      }
      const sorted = [...info].sort((a, b) => {
        if (a[1] === b[1]) return a[0] - b[0];
        return a[1] - b[1];
      });

      arr[i] = sorted.flat();
      if (maxLegnth < arr[i].length) maxLegnth = arr[i].length;
    }

    arr = arr.map((row) => {
      if (row.length === maxLegnth) return row;
      return [...row, ...new Array(maxLegnth - row.length).fill(0)];
    });

    return arr;
  };

  let time = 0;

  // (r,c에 해당하는 범위만큼 커지지 않았거나 || k가 아닐 경우) && 100초를 초과하지 않았다면
  while ((arr.length < r - 1 || arr[0].length < c - 1 || arr[r - 1][c - 1] !== k) && time <= 100) {
    const rowLength = arr.length;
    const colLength = arr[0].length;

    // R 연산
    if (rowLength >= colLength) {
      arr = getR(arr);
    }
    // C 연산
    else {
      arr = convretRowCol(arr);
      arr = getR(arr);
      arr = convretRowCol(arr);
    }

    time += 1;
  }

  // 100초 동안 늘려도 arr이 r,c를 커버할 정도로 커지지 않는 경우가 있으므로
  // 여기서도 예외 처리를 해줘야 한다
  if (arr.length >= r && arr[0].length >= c && arr[r - 1][c - 1] === k) {
    console.log(time);
  } else {
    console.log(-1);
  }

  process.exit();
});
