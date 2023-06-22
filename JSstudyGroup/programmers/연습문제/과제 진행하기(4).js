function solution(plans) {
  plans = plans.map((i) => {
    let [min, sec] = i[1].split(':').map(Number);
    return [i[0], min * 60 + sec, Number(i[2])];
  });
  plans.sort((a, b) => a[1] - b[1]);
  console.log(plans);

  let stack = [];
  let current = plans[0][1];
  let result = [];
  for (let i = 0; i < plans.length; i++) {
    if (i === plans.length - 1) {
      result.push(plans[i][0]);
      break;
    }
    let [name, start, playTime] = plans[i];
    let [nextName, nextStart, nextPlayTime] = plans[i + 1];

    // 현재 과제를 다 못끝낼 경우
    if (current + playTime > nextStart) {
      // 과목, 남은시간
      stack.push([name, current + playTime - nextStart]);
      current = nextStart;
      continue;
    }

    // 현재 과제가 정확히 다음 과제의 시작시간과 맞춰서 끝날 경우
    if (current + playTime === nextStart) {
      current = nextStart;
      result.push(name);
      continue;
    }

    // 현재 과제를 끝내고 다음 과제 시작까지 시간이 남을 경우
    if (current + playTime < nextStart) {
      current += playTime;
      result.push(name);

      // 다음 과제 시작까지 남은 시간을 미리 구해놓음
      let leftTimeforNext = nextStart - current;

      // stack에 쌓인 과제들을 가능한 데까지(스택이 비거나 더이상 남은 시간이 없거나) 처리
      while (stack.length && leftTimeforNext) {
        let [leftName, leftTime] = stack.pop();

        // 해당 과제를 다 끝낼수 없을 경우
        if (leftTime > leftTimeforNext) {
          current += leftTimeforNext; // current = nextStart; 과 동일
          leftTime -= leftTimeforNext;
          stack.push([leftName, leftTime]);
          break;
        }

        // 해당 과제를 다 끝낼수 있을 경우
        leftTimeforNext -= leftTime;
        result.push(leftName);
      }
      current = nextStart; // stack에 있는 과제를 다 끝냈는데 아직
      // 다음 과제 시작시간까지 시간이 남는 경우가 있을 수 있으므로
      // 반드시 다음 과제 시작시간으로 갱신 필수!
    }
  }

  while (stack.length) {
    let [leftName, leftTime] = stack.pop();
    result.push(leftName);
  }
  return result;
}
