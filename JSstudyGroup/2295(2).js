const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const data = [];

rl.on('line', (input) => {
  data.push(input);
}).on('close', () => {
  const N = +data.shift();
  const info = data.map(Number).sort((a, b) => a - b);

  // 투포인터
  // A, X를 인자로 받아서 A+B+C=X가 되는 B,C를 구한다
  const search = (A, X) => {
    let start = 0;
    let end = info.length - 1;

    // 중복 허용이므로 start < end가 아닌 start <= end
    while (start <= end) {
      // 중복 허용이므로 아래 로직은 제거
      //   if (info[start] === A) {
      //     start += 1;
      //     continue;
      //   }
      //   if (info[end] === A) {
      //     end -= 1;
      //     continue;
      //   }

      const sum = A + info[start] + info[end];

      if (sum > X) {
        end -= 1;
      }
      if (sum < X) {
        start += 1;
      }
      if (sum === X) {
        return true;
      }
    }
    return false;
  };

  let result;

  // 중복이 존재하므로 info 길이가 최소 4개(A+B+C=X) 이상일 필요가 없다
  // 1개의 숫자로 A,B,C를 채울 수도 있기 때문
  while (1) {
    // 맨 뒤의 숫자(가장 큰 수)
    const X = info.pop();

    // info중에서 A를 선택한 뒤, 나머지 B,C는 투포인터로 탐색
    for (let i = 0; i < info.length; i++) {
      const A = info[i];
      const isPossible = search(A, X);
      if (isPossible) {
        result = X;
        break;
      }
    }
    if (result) break;
  }

  console.log(result);

  process.exit();
});
