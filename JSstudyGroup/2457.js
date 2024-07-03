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
  let flowers = data.map((i) => i.split(' ').map(Number));

  const convertDate = (month, day) => {
    return 100 * month + day;
  };

  // 날짜 변환
  flowers = flowers
    .map((i) => {
      const [sm, sd, em, ed] = i;
      return [convertDate(sm, sd), convertDate(em, ed)];
    })
    // 꽃이 피는 시간을 기준으로 오름차순 정렬
    .sort((a, b) => a[0] - b[0]);

  // 3월1일, 11월30일
  const [TARGET_START, TARGET_END] = [convertDate(3, 1), convertDate(11, 30)];

  // 가장 빠른 개화 날짜가 3월1일 이후라면 0 출력
  if (flowers[0][0] > TARGET_START) console.log(0);
  else {
    // 꽃의 개수
    let count = 0;

    // flower배열을 순회하는 인덱스
    let index = 0;

    // 현재 정원에 있는 꽃이 지는 날짜
    let end = TARGET_START;

    // 현재 정원에 있는 꽃이 지는 날짜(end) 보다 먼저 개화한 꽃들 중,
    // 가장 늦게 지는 꽃의 날짜
    let maxEndDate = TARGET_START;

    while (index < flowers.length) {
      // 현재 정원의 꽃이 지는 날짜가 11월 30일을 초과하거나 (=탐색 종료)
      // 현재 꽃의 개화시기가 현재 정원의 꽃이 지는 날짜를 초과한다면 (=빈 공간이 생겨서 끝)
      // break
      if (end > TARGET_END || flowers[index][0] > end) break;

      // flowers[index] 부터 탐색
      for (let i = index; i < flowers.length; i++) {
        const flower = flowers[i];

        // 현재 꽃의 개화시기가 end이하인 꽃들 중에서
        if (flower[0] <= end) {
          // 가장 maxEndDate가 긴 꽃을 판별
          if (maxEndDate < flower[1]) maxEndDate = flower[1];
          index += 1;
        } else break;
      }

      // maxEndDate를 현재 정원의 꽃으로 선택
      end = maxEndDate;
      count += 1;
    }

    // 현재 정원에 있는 꽃이 지는 날짜는 최소 12월1일 이상이어야 한다.
    // 그러므로 11월 30일 이하라면 0 출력
    if (end <= TARGET_END) {
      console.log(0);
    } else {
      console.log(count);
    }
  }
  process.exit();
});
