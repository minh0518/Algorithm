function solution(plans) {
  // 23:59를 분 단위의 배열로 표현
  const timeTalbe = new Array(23 * 59 + 59).fill(0);

  plans = plans.map((i) => {
    const [h, m] = i[1].split(':').map(Number);
    const convertedTime = h * 60 + m;

    // 각 과제의 시작 지점을 timeTalbe배열에도 추가
    timeTalbe[convertedTime] = { task: i[0], value: Number(i[2]) };

    return [i[0], convertedTime, Number(i[2])];
  });
  plans.sort((a, b) => a[1] - b[1]);

  const stack = [];
  const result = [];

  //00:00~23:59를 for문으로 반복
  for (let i = 0; i < timeTalbe.length; i++) {
    const currentTime = timeTalbe[i];

    // 현재 시간에 진행해야 하는 과제가 있다면 스택에 push
    // 즉 새로운 과제가 진행되는 것이다
    if (currentTime) {
      stack.push({ task: currentTime.task, value: currentTime.value });
    }

    // 스택에 무언가라도 들어있다면(=현재 시간에 진행 해야 할 과제 or 이전에 남은 과제가 있다면)
    if (stack.length) {
      //가장 위에 있는 과제
      const currentTask = stack[stack.length - 1];

      // 1분당 과제를 진행
      currentTask.value -= 1; // call by reference로 수정
      if (currentTask.value === 0) {
        result.push(stack.pop().task);
      }
    }
  }

  // 위의 for문에서는 23:59까지 시작한 과제들을 전부 스택에 두고
  // 23:59까지 끝난 과제까지 처리하지만
  // 23:59 넘어서 끝나는 과제들이 있을 수 있으므로
  // 최근에 시작했던 순서대로 정답배열에 추가
  // 23:59 부터는 더이상 추가로 진행해야 할 과제가 없는 것이므로
  // 최근에 시작한 것부터 끝내게 되는 것이다
  while (stack.length) {
    result.push(stack.pop().task);
  }

  return result;
}
