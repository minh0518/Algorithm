const solution = (scores) => {
  let target = [...scores[0]];
  let targetSum = target[0] + target[1];

  // 근무태도점수는 내림차순, 동일할 경우 동료평가점수 오름차순
  scores.sort((a, b) => {
    if (a[0] === b[0]) {
      return a[1] - b[1];
    }
    return b[0] - a[0];
  });

  let answer = 1;
  let maxScore = 0;

  for (let i of scores) {
    // 동료 평가 점수가 작을때만 고려 (문제에서 같은 경우는 탈락이 아니라고 했으므로)
    if (i[1] < maxScore) {
      if (i.join('') === target.join('')) {
        return -1;
      }
    }

    if (i[1] >= maxScore) {
      maxScore = Math.max(maxScore, i[1]);

      // 끝까지 탐색하면서 완호보다 총 합이 큰 사람 수 만큼 +1
      if (i[0] + i[1] > targetSum) {
        answer += 1;
      }
    }
  }

  return answer;
};

// [근무 태도 점수 , 동료 평가 점수]
solution([
  [2, 2],
  [1, 4],
  [3, 2],
  [3, 2],
  [2, 1],
]);
