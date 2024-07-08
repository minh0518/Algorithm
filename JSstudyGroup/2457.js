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
    return m * 100 + d;
  };
  const N = +data.shift();
  const flowers = data
    .map((i) => {
      const numbers = i.split(' ').map(Number);
      return [convertDate(numbers[0], numbers[1]), convertDate(numbers[2], numbers[3])];
    })
    // 꽃이 피는 시간을 기준으로 오름차순 정렬
    .sort((a, b) => a[0] - b[0]);

  const startDay = convertDate(3, 1);
  const lastDay = convertDate(11, 30);

  // 가장 빠른 개화 날짜가 3월1일 이후라면 0 출력
  if (flowers[0][0] > startDay) {
    console.log(0);
  } else {
    // 현재 정원에 있는 꽃이 지는 날짜
    let end = convertDate(3, 1);

    // 현재 정원에 있는 꽃이 지는 날짜(end) 보다 먼저 개화한 꽃들 중,
    // 가장 늦게 지는 꽃의 날짜
    let maxEndDate = 0;

    let index = 0; // flower배열을 순회하는 인덱스
    let count = 0; // 꽃의 개수

    while (index < flowers.length) {
      // 현재 정원의 꽃이 지는 날짜가 11월 30일을 초과하거나 (=탐색 종료)
      // 현재 꽃의 개화시기가 현재 정원의 꽃이 지는 날짜를 초과한다면 (=빈 공간이 생겨서 끝)
      // break
      if (end > lastDay || end < flowers[index][0]) break;

      // flowers[index] 부터 탐색
      while (index < flowers.length && flowers[index][0] <= end) {
        const current = flowers[index];

        // 현재 꽃의 개화시기가 end이하인 꽃들 중에서 가장 maxEndDate가 긴 꽃을 갱신
        if (current[0] <= end && current[1] > maxEndDate) maxEndDate = current[1];
        if (current[0] > end) break; // 현재 꽃의 개화시기가 end를 초과했다면 더이상 탐색하지 않고 break
        index += 1;
      }

      count += 1;
      end = maxEndDate; // maxEndDate를 현재 정원의 꽃으로 변경
    }

    // 현재 정원에 있는 꽃이 지는 날짜는 최소 12월1일 이상이어야 한다.
    // 그러므로 11월 30일 이하라면 0 출력
    if (end > lastDay) console.log(count);
    else console.log(0);
  }
  process.exit();
});
