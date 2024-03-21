function solution(targets) {
  targets.sort((a, b) => {
    if (a[1] === b[1]) {
      return a[0] - b[0];
    }
    return a[1] - b[1];
  });

  let count = 0;
  for (let i = 0; i < targets.length; i++) {
    const [currentFrom, currentTo] = targets[i];
    count += 1;

    for (let j = i + 1; j < targets.length; j++) {
      const [from, to] = targets[j];

      // 다음 i는 마지막으로 끊긴 j부터 시작
      i = j - 1;
      if (from < currentTo) {
        if (j === targets.length - 1) {
          // 예외적으로, 마지막 요소까지 요격기 가능하다면
          // 그땐 바로 i의 for문까지 끝내야함. 안 그러면 i문에서 한번 더 돌게 된다
          i = j;
          break;
        }
        continue;
      }

      // from >= currentTo 일 경우
      break;
    }
  }

  return count;
}
