const solution = (plans) => {
  plans.forEach((i) => {
    let [h, m] = i[1].split(':').map(Number);

    i[1] = h * 60 + m;
    i[2] = Number(i[2]);
  });

  plans.sort((a, b) => a[1] - b[1]);

  let stack = [];
  let current = plans[0][1]; // 현재 시간
  let result = [];

  for (let i = 0; i < plans.length; i++) {
    if (i === plans.length - 1) {
      // 마지막 과제는 그냥 push하고 for문 종료
      result.push(plans[i][0]);
      break;
    }

    let [name, start, playtime] = plans[i];
    let [nextName, nextStart, nextPlaytime] = plans[i + 1];

    // 시간에 딱 맞춰서 현재 과제를 완료
    if (current + playtime === nextStart) {
      current = nextStart; // 현재 시간 업데이트
      result.push(name);
      continue;
    }

    // 시간이 남을 때
    if (current + playtime < nextStart) {
      current += playtime; // 현재 시간 업데이트
      result.push(name);

      // 스택에 남은 과제가 있고 , 다음 과제 시간이 될 때까지 반복
      while (stack.length && current < nextStart) {
        let leftTask = stack.pop();
        let leftTimeForNext = nextStart - current; // 현재시간으로부터 다음 과제 시간까지의 간격을 구함

        // 남은 과제 수행이 가능할 경우
        if (leftTimeForNext >= leftTask[2]) {
          result.push(leftTask[0]); // leftTask[0] >> 과제 이름
          current += leftTask[2]; // leftTask[2] >> 과제 playtime , 현재 시간 업데이트
          continue;
        }

        // 남은 과제 수행이 불가능할 경우
        if (leftTimeForNext < leftTask[2]) {
          leftTask[2] -= leftTimeForNext; // 가능한 만큼만 진행하고 다시 push
          stack.push(leftTask);
          break;
        }
      }
      // 만약 스택에 있는 남은 과제들도 모두 끝냈을 때
      // 현재 시간을 다음 시작 시간으로 바꿔줘야 한다
      // 시간이 남더라도 각 과제는 무조건 지정된 시간부터 시작해야 하기 때문이다
      // 안 그러면 매 for문마다 사용하는 current + playtime의 값이 꼬이게 된다
      // (4번째 테스크 케이스가 그 예시이다)
      current = nextStart;

      continue;
    }

    // 현재 과제를 완료 할 시간이 부족할 때
    if (current + playtime > nextStart) {
      plans[i][2] -= nextStart - current; // 가능한 만큼만 진행하고 다시 push
      stack.push(plans[i]);
      current = nextStart; // 현재 시간 업데이트
      continue;
    }
  }
  // 맨 마지막 과제가 끝나고 나서 나머지 스택에 있던 과제들을 역순으로 한꺼번에 마무리
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
// solution([
//   ['science', '12:40', '50'],
//   ['music', '12:20', '40'],
//   ['history', '14:00', '30'],
//   ['computer', '12:30', '100'],
// ]);

// solution([
//   ['aaa', '12:00', '20'],
//   ['bbb', '12:10', '30'],
//   ['ccc', '12:40', '10'],
// ]);

// b a d c
solution([
  ['A', '12:00', '30'],
  ['B', '12:10', '20'],
  ['C', '15:00', '40'],
  ['D', '15:10', '30'],
]);
