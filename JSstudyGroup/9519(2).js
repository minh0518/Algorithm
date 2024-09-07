const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const data = [];

rl.on('line', (input) => {
  data.push(input);
}).on('close', () => {
  const X = +data.shift();
  const str = data.shift().split('');

  // 회전 시뮬레이션
  const rotateIndex = (indexArr) => {
    const newArr = new Array(indexArr.length).fill(0);
    newArr[0] = indexArr[0];

    // 짝수번째 숫자들을 뒤에서 채우기 위한 여백 인덱스
    let indexFromLast = 0;
    // 홀수번째 숫자들을 앞에서 채우기 위한 여백 인덱스
    let indexFromStart = 0;

    // [0]번째는 고정이므로 1부터 시작
    for (let i = 1; i < indexArr.length; i++) {
      const current = indexArr[i];
      const isEven = (i + 1) % 2 === 0; // 현재 짝수번째인지, 홀수번째인지 판별

      if (isEven) {
        newArr[indexArr.length - 1 - indexFromLast] = current;
        indexFromLast += 1;
      }
      if (!isEven) {
        newArr[1 + indexFromStart] = current;
        indexFromStart += 1;
      }
    }
    return newArr;
  };

  // 싸이클 판별 함수
  const getCycle = (length) => {
    const originArr = new Array(length).fill(undefined).map((_, index) => index);
    let indexArr = [...originArr];
    let count = 1;
    while (1) {
      const rotateResult = rotateIndex(indexArr);
      if (rotateResult.join('') === originArr.join('')) return count;
      indexArr = rotateResult;
      count += 1;
    }
  };

  // 메인 로직
  let cycle = X % getCycle(str.length); // 싸이클 판별
  let resultArr = new Array(str.length).fill(undefined).map((_, index) => index);
  while (cycle--) {
    resultArr = rotateIndex(resultArr);
  }
  console.log(resultArr.map((i) => str[i]).join(''));

  process.exit();
});
