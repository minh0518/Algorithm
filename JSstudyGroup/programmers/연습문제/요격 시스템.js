const solution = (targets) => {
  // 요격 가능한 구간이 끝나는 시점을 기준으로 오름차순으로 정렬
  targets.sort((a, b) => {
    if (a[1] === b[1]) {
      return a[0] - b[0];
    }
    return a[1] - b[1];
  });

  let result = 0;
  let end = targets[0][1];
  result += 1;

  for (let i = 1; i < targets.length; i++) {
    if (targets[i][0] >= end) {
      // 현재 요격 가능한 구간보다 오른쪽에 있기 때문에 새로운 요격 시스템 추가
      end = targets[i][1];
      result += 1;
    }
  }

  return result;
};

solution([
  [4, 5],
  [4, 8],
  [10, 14],
  [11, 13],
  [5, 12],
  [3, 7],
  [1, 4],
]);
