const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const data = [];

rl.on('line', (input) => {
  data.push(input);
}).on('close', () => {
  let N = data.shift().split('').map(Number);

  let result = [];

  let count = 0;
  const dfs = (targetArr, firstCount) => {
    for (let i = 1; i <= targetArr.length - 2; i++) {
      for (let j = i + 1; j <= targetArr.length - 1; j++) {
        let count = firstCount;

        let [start, middle, end] = [
          targetArr.slice(0, i),
          targetArr.slice(i, j),
          targetArr.slice(j),
        ];

        let sum =
          Number(start.join('')) +
          Number(middle.join('')) +
          Number(end.join(''));
        let sumArr = ('' + sum).split('').map(Number);

        if (sumArr.length === 1) {
          if (Number(sumArr.join('')) % 2) {
            count += 1;
          }
          result.push(count);
        }
        if (sumArr.length === 2) {
          let copySumArr = [...sumArr];
          while (copySumArr.length !== 1) {
            copySumArr.forEach((i) => {
              if (i % 2 === 1) count += 1;
            });

            copySumArr = (copySumArr.reduce((a, b) => a + b, 0) + '')
              .split('')
              .map(Number);
          }

          if (Number(copySumArr.join('')) % 2) {
            count += 1;
          }
          result.push(count);
        }

        if (sumArr.length >= 3) {
          sumArr.forEach((i) => {
            if (i % 2 === 1) count += 1;
          });
          dfs(sumArr, count);
        }
      }
    }
  };

  let targetArr = [...N];
  if (targetArr.length >= 3) {
    let firstCount = 0;
    targetArr.forEach((i) => {
      if (i % 2 === 1) firstCount += 1;
    });
    dfs(targetArr, firstCount);

    console.log(`${Math.min(...result)} ${Math.max(...result)}`);
  }

  if (targetArr.length === 2) {
    let count = 0;
    let copySumArr = [...targetArr];
    while (copySumArr.length !== 1) {
      copySumArr.forEach((i) => {
        if (i % 2 === 1) count += 1;
      });

      copySumArr = (copySumArr.reduce((a, b) => a + b, 0) + '')
        .split('')
        .map(Number);
    }

    if (Number(copySumArr.join('')) % 2) {
      count += 1;
    }

    console.log(`${count} ${count}`);
  }

  if (targetArr.length === 1) {
    let count = 0;
    if (Number(targetArr.join('')) % 2) {
      count += 1;
    }
    console.log(`${count} ${count}`);
  }

  process.exit();
});