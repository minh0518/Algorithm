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

				// 3개의 구역으로 쪼갬
        let [start, middle, end] = [
          targetArr.slice(0, i),
          targetArr.slice(i, j),
          targetArr.slice(j),
        ];

				// 덧셈 
        let sum =
          Number(start.join('')) +
          Number(middle.join('')) +
          Number(end.join(''));
        let sumArr = ('' + sum).split('').map(Number);

        // 덧셈의 결과가 1자리일 때
        if (sumArr.length === 1) {
          if (Number(sumArr.join('')) % 2) {
            count += 1;
          }

          // 정답 배열에 최종 count를 push
          result.push(count);
        }

        // 덧셈의 결과가 2자리일 때
        if (sumArr.length === 2) {
          let copySumArr = [...sumArr];

          // 1의자리가 될 때까지 반복
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

          // 정답 배열에 최종 count를 push
          result.push(count);
        }

        // 덧셈의 결과가 3자리 일 때
        if (sumArr.length >= 3) {

          // 덧셈한 결과에 대해 홀수 갯수를 찾음
          sumArr.forEach((i) => {
            if (i % 2 === 1) count += 1;
          });

          // 덧셈이 3자리이므로 재귀 호출(count변수를 들고 호출해야 함)
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

  // 숫자 길이가 2일때
  if (targetArr.length === 2) {
    let count = 0;
    let copySumArr = [...targetArr];
    
    while (copySumArr.length !== 1) {

      // 1의자리가 될 때까지 반복
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

  // 숫자 길이가 1일때
  if (targetArr.length === 1) {
    let count = 0;
    if (Number(targetArr.join('')) % 2) {
      count += 1;
    }
    console.log(`${count} ${count}`);
  }

  process.exit();
});