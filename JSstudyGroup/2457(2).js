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

  for (let flowerStartDay = 0; flowerStartDay <= 31 * 12; flowerStartDay++) {
    if (calendar[flowerStartDay] === 0) continue;
    const flowerEndDay = calendar[flowerStartDay];

    // 현재 꽃의 개화시기가 end를 넘었다면 새로운 꽃을 선택
    if (end < flowerStartDay) {
      result += 1;
      end = maxEndDate;
    }

    // 현재 꽃에 대한 maxEndDate에 대한 갱신여부 판단 및 갱신
    if (end >= flowerStartDay && flowerEndDay > maxEndDate) {
      maxEndDate = flowerEndDay;
    }

    // 11월 30일을 넘겼다면 break
    if (maxEndDate > END) break;
  }

  if (maxEndDate > END) console.log(result);
  else console.log(0);

  process.exit();
});
