const solution = (plans) => {
  const queue = plans
    .map((plan) => {
      const [name, time, spend] = plan;
      const [hour, minute] = time.split(':');
      const convertedTime = Number(hour) * 60 + Number(minute);

      return [name, convertedTime, Number(spend)];
    })
    .sort((a, b) => a[1] - b[1]);

  let result = [];
  let first = queue.shift();

  // 첫번째 과제
  let stack = [first];
  // 현재 시각
  let currentTime = first[1];

  while (queue.length) {
    const target = queue.shift();
    const startTime = target[1];

    // 다음 과제까지의 남은 시간
    let timeGap = startTime - currentTime;

    // 현재 queue에서 빼온 target의 시작시간을 현재 시간으로 바꿔놓음으로써
    // 다음번에 currentTime으로 사용
    currentTime = startTime;

    // 스택이 비거나 , timeGap이 0이 될 때까지
    // 즉, timeGap이 남고 stack에 쌓인 과제들이 있다면 계속 반복하는 것이다
    while (stack.length && timeGap > 0) {
      const latest = stack.pop();

      const [latestName, latestStartTime, latestPlayTime] = latest;

      // 과제를 끝낼 수 있다면
      if (latestPlayTime <= timeGap) {
        result.push(latestName);
        timeGap -= latestPlayTime;
        continue;
      }

      // 다 끝낼 수 없다면
      if (latestPlayTime > timeGap) {
        // 최대한 진행한 만큼 빼줌
        latest[2] = latestPlayTime - timeGap; // 최대한 진행한 만큼 playTime에서 빼줌
        timeGap = 0;
        stack.push(latest); // 다 해결한게 아니므로 다시 push
      }
    }

    stack.push(target);
  }

  // queue가 빈 것은 마지막 시간까지 과제를 다 진행한 것이므로
  // stack의 뒤에서부터 push하면 된다
  while (stack.length) {
    result.push(stack.pop()[0]);
  }

  console.log(result);
  return result;
};

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
