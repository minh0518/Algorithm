const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const data = [];

rl.on('line', (input) => {
  data.push(input);
}).on('close', () => {
  const convertDate = (m, d) => {
    return (m - 1) * 31 + d;
  };

  const N = +data[0];

  //1월1일은 [1]부터 시작이므로 +1
  const calendar = Array(31 * 12 + 1).fill(0);
  for (let i = 1; i <= N; i++) {
    const [a, b, c, d] = data[i].split(' ').map(Number);
    const start = convertDate(a, b);
    const end = convertDate(c, d);
    // 기존에 있던 끝나는 날짜보다 더 길다면 갱신
    if (end > calendar[start]) calendar[start] = end;
  }

  const [START, END] = [convertDate(3, 1), convertDate(11, 30)];

  // 현재 정원의 꽃이 지는 날짜
  let end = START;

  // 현재 정원의 꽃이 지는 날짜(end) 보다 먼저 개화한 꽃들 중,
  // 가장 늦게 지는 날짜
  let maxEndDate = START;

  let result = 1;

  // 탐색 진행

  // calendar배열을 순회하는 인덱스
  let startDay = 0;
  while (startDay <= 31 * 12) {
    // 1.
    // 현재 end이전에 개화를 하는 꽃들 중에서
    // 가장 늦게 지는 꽃의 날짜를 maxEndDate로 갱신
    while (startDay <= 31 * 12) {
      if (calendar[startDay] !== 0) {
        // 꽃의 구간일 경우에만 연산 진행

        if (startDay > end) break; // 개화시기가 end를 초과하면 break
        if (calendar[startDay] > maxEndDate) maxEndDate = calendar[startDay];
      }
      startDay += 1;
    }

    // 2.
    // maxEndDate가 11월30일을 초과하거나 ||
    // 현재 꽃의 개화 시기가 maxEndDate를 초과하면 (=공백 발생) break
    if (maxEndDate > END || startDay > maxEndDate) break;

    result += 1;
    end = maxEndDate; // 다음 end로 갱신
  }

  if (maxEndDate <= END) console.log(0);
  else console.log(result);

  process.exit();
});
