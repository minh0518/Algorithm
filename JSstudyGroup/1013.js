const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const data = [];

rl.on('line', (input) => {
  data.push(input);
}).on('close', () => {
  let T = +data.shift();
  let str = data.map((i) => i.split('').map(Number));

  const checkPattern = (targetStr, index) => {
    if (targetStr.slice(index, index + 2).join('') === '01') {
      return 1;
    }
    if (targetStr.slice(index, index + 3).join('') === '100') {
      return 2;
    }

    return false;
  };

  const calc = (targetStr) => {
    for (let i = 0; i < targetStr.length; i++) {

      // 01이라면 '문자열의 맨 처음부터 현재 발견한 01까지' 자르고
      // 다시 i=0부터 시작
      if (checkPattern(targetStr, i) === 1) {
        targetStr = targetStr.slice(i + 2);
        i = -1; // 다음 for문을 0으로 맞추기 위해
        continue;
      }
      if (checkPattern(targetStr, i) === 2) {

        // 100이지만 문자열 맨 마지막이 100인 경우는 NO
        if (i === targetStr.length - 3) {
          break;

          // 여기서 break하면 targetStr에 값이 남아있는상태로 for문이 끝나므로
          // NO를 출력할 수 있다
        }

        // '문자열의 맨 처음부터 현재 발견한 01까지' 자름
        targetStr = targetStr.slice(i + 3);

        // targetStr를 잘랐으므로 targetStr의 j는 0부터 시작해야 한다
        for (let j = 0; j < targetStr.length; j++) {

          // 1이 나왔을 때
          if (targetStr[j] === 1) {

            // 끝까지 111.. 로만 되어 있으면 YES
            if (!targetStr.slice(j).join('').includes('0')) {
              return [];
            }

            // 1이 나왔고 다음에 패턴(01 or 100)이 존재한다면
            if (checkPattern(targetStr, j + 1)) {

              // 인덱스 j + 1 부터 패턴이 시작이므로
              // i = j해주고 break해주면 다음 for문에서 i는 j+1의 값이 됨
              i = j;
              break;
            }

            // 1이 나왔고 다음에 패턴01이 아닌 0이 있으면 그건 NO
            // 0110001 0 01 >> 저 0때문에 NO가 된다
            if (targetStr[j + 1] === 0) {
              i = targetStr.length;
              break;

              // 이중 for문을 탈출하게 되는데 
              // 단지 NO를 출력해야 하므로 targetStr배열에는 
              // 값들이 남아있게 된다
            }

            // targetStr[j]가 1이 나왔고 계속해서 111..인 경우는
            // 다음 for문을 돌면서 패턴이나 0 이 나올때까지 반복하게 된다
          }
        }
      } else {
        // 맨 처음 000.. 이 나오면 NO
        break;
      }
    }

    return targetStr;
  };

  let answer = [];
  for (let i = 0; i < T; i++) {
    let targetStr = str[i];

    let result = calc(targetStr);

    // result배열에 남은게 있으면 NO 출력
    if (result.length) {
      answer.push('NO');
    } else {
      answer.push('YES');
    }
  }

  console.log(answer.join('\n'));

  process.exit();
});

//(100+1+ | 01)+