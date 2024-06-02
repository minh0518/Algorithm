function solution(routes) {
  routes.sort((a, b) => {
    if (a[1] === b[1]) {
      return a[0] - b[0];
    }
    return a[1] - b[1];
  });

  // 첫번째 구간의 끝나는 지점부터 시작
  let end = routes[0][1];

  // 맨 마지막 구간의 카메라도 카운트하기 위해
  // 그냥 처음부터 1로 시작
  let count = 1;

  for (let i = 1; i < routes.length; i++) {
    const [currentFrom, cuurentTo] = routes[i];
    if (end < currentFrom) {
      count += 1;
      end = cuurentTo;
    }
  }

  return count;
}
