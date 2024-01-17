function solution(plans) {
  plans = plans.map((i) => {
    const [h, m] = i[1].split(':').map(Number);
    const convertedTime = h * 60 + m;
    return [i[0], convertedTime, Number(i[2])];
  });
  plans.sort((a, b) => a[1] - b[1]);

  const stack = [];
  const result = [];

  for (let i = 1; i < plans.length; i++) {
    let [cTask, cStart, cValue] = plans[i - 1];
    let [nTask, nStart, nValue] = plans[i];

    const cEnd = cStart + cValue;

    // 현재 과제를 하고 남은 시간이 있을 때
    if (nStart > cEnd) {
      result.push(cTask);
      let leftTimeForN = nStart - cEnd;

      while (stack.length && leftTimeForN > 0) {
        let [lTask, lLeftTime] = stack.at(-1);
        if (lLeftTime > leftTimeForN) {
          lLeftTime -= leftTimeForN;
          leftTimeForN = 0;
          stack[stack.length - 1][1] = lLeftTime;
        }
        if (lLeftTime <= leftTimeForN) {
          leftTimeForN -= lLeftTime;
          result.push(stack.pop()[0]);
        }
      }
    }

    // 현재 과제를 끝내기 전에 다음 과제를 할 시간이 왔을 때
    if (nStart < cEnd) {
      const leftTime = cEnd - nStart;
      stack.push([cTask, leftTime]);
    }
    // 다음 과제 시작 시간에 딱 맞춰서 현재 과제를 끝냈을 때
    if (nStart === cEnd) {
      result.push(cTask);
    }

    if (i === plans.length - 1) {
      result.push(nTask);
    }
  }

  while (stack.length) {
    result.push(stack.pop()[0]);
  }

  console.log(stack);
  console.log(result);

  return result;
}
