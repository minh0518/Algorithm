function solution(plans) {
  let answer = [];

  plans = plans.map(([name, start, playtime]) => {
    const [hh, mm] = start.split(':').map(Number);

    return { name, start: hh * 60 + mm, playtime: Number(playtime) };
  });

  console.log(plans);
  // [
  //   { name: 'science', start: 760, playtime: 50 },
  //   { name: 'music', start: 740, playtime: 40 },
  //   { name: 'history', start: 840, playtime: 30 },
  //   { name: 'computer', start: 750, playtime: 100 },
  // ];

  // 24시간을 분 단위의 배열로 표현
  // 크기가 1440인 배열
  const timeLine = Array(24 * 60).fill(null);

  // 각 과제의 시작 지점을 체크
  plans.forEach((v) => {
    timeLine[v.start] = v;
  });

  // 과제들이 담기는 곳 (현재 진행 , 남은 과제 모두 포함)
  const stack = [];

  //00:00~23:59를 이중 for문으로 반복
  for (let h = 0; h < 24; h++) {
    for (let m = 0; m < 60; m++) {
      // 이 로직에서 사용되고 있는 분 단위로 환산
      const time = h * 60 + m;

      const plan = timeLine[time];
      // 현재 시간에 진행해야 하는 과제가 있다면 스택에 push
      // 즉 새로운 과제가 진행되는 것이다
      if (plan) {
        stack.push(plan);
      }

      // 스택에 무언가라도 들어있다면(=현재 시간에 진행 해야 할 과제 or 이전에 남은 과제가 있다면)
      if (stack.length) {
        //가장 위에 있는 과제
        const top = stack[stack.length - 1];

        // 1분씩 줄여나가는데 1분 줄이면 과제가 끝난다면
        if (!(top.playtime - 1)) {
          answer.push(top.name); // 정답에 추가
          stack.pop(); // 제거
        } else {
          top.playtime--; // for문은 1분씩 진행되므로 1분씩 차감
        }
      }
    }
  }

  // 23:59 넘어서 끝나는 과제들이 있을 수 있으므로
  // 이건 늦게 시작한 순서대로 정답배열에 추가
  // 23:59 부터는 더이상 추가로 진행해야 할 과제가 없는 것이므로
  // 최근에 시작한 것부터 끝내게 되는 것이다
  while (stack.length) {
    const top = stack.pop();

    answer.push(top.name);
  }

  return answer;
}
// solution([
//   ['korean', '11:40', '30'],
//   ['english', '12:10', '20'],
//   ['math', '12:30', '40'],
// ]);
solution([
  ['science', '12:40', '50'],
  ['music', '12:20', '40'],
  ['history', '14:00', '30'],
  ['computer', '12:30', '100'],
]);
// solution([
//   ['aaa', '12:00', '20'],
//   ['bbb', '12:10', '30'],
//   ['ccc', '12:40', '10'],
// ]);
