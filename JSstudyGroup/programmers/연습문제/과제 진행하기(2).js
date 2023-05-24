function solution(plans) {
  plans = plans.map((v) => {
    const splitStart = v[1].split(':').map(Number);

    return [v[0], splitStart[0] * 60 + splitStart[1], +v[2]];
  });

  plans.sort((a, b) => a[1] - b[1]);

  console.log(plans);
  // [
  //   [ 'music', 740, 40 ],
  //   [ 'computer', 750, 100 ],
  //   [ 'science', 760, 50 ],
  //   [ 'history', 840, 30 ]
  // ]

  const result = [];
  const stack = []; // [과목, 남은 시간]

  for (let i = 0; i < plans.length - 1; i++) {
    const [name, start, playTime] = plans[i];

    // 현재 과제의 시작시간+playtime이 다음 과제 시작시간과 같다면 (=딱 맞아 떨어진다면)
    // 정답배열에 추가
    if (start + playTime === plans[i + 1][1]) {
      result.push(name);
    } else if (start + playTime > plans[i + 1][1]) {
      // 다음 과제 시작 시간까지 못 끝낸다면

      // 해당 과목의 남은 시간을 구하고
      const restTime = playTime - (plans[i + 1][1] - start);

      // 스택에 담아둔다
      stack.push([name, restTime]);
    } else if (start + playTime < plans[i + 1][1]) {
      // 해당 과제를 끝내고 시간이 남는다면

      // 우선 현재 과제는 완료했으니까 정답배열에 추가
      result.push(name);

      // 다음 과목 시작 전까지의 남은 시간을 구하고
      let restTime = plans[i + 1][1] - (start + playTime);

      // 남은 시간이 0이 되거나 , 스택에 남은 과제들이 없어질 때까지
      while (restTime !== 0 && stack.length) {
        // 스택에 있는 과제를 꺼냄
        const [qName, qPlayTime] = stack.pop();

        if (qPlayTime <= restTime) {
          // 남은 시간보다 스택에서 꺼낸 과제의 playtime이 더 적거나 같다면
          // 남은 시간안에 해당 과제를 끝낼수 있다는 것이다
          result.push(qName);
          restTime -= qPlayTime;
        } else if (qPlayTime > restTime) {
          // 남은 시간안에 해당 과제를 끝낼수 없다면 그냥 남은 시간만큼 playtime만큼
          // 빼주고 다시 push해준다
          stack.push([qName, qPlayTime - restTime]);
          break;
        }
      }
    }
  }

  // 위의 로직에서 plans.length - 2까지 진행했으므로 마지막 과제는 처리하지 못한다
  // 맨 마지막에 진행되는 과제는 그냥 바로 끝낼 수 있으므로 push
  result.push(plans[plans.length - 1][0]);

  // 맨 마지막 과제가 끝나고 나서 나머지 스택에 있던 과제들을 역순으로 죄다 마무리
  while (stack.length) {
    result.push(stack.pop()[0]);
  }

  return result;
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
