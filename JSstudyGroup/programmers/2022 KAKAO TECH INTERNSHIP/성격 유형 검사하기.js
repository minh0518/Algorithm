function solution(survey, choices) {
  const info = new Map([
    ['R', 0],
    ['T', 0],
    ['C', 0],
    ['F', 0],
    ['J', 0],
    ['M', 0],
    ['A', 0],
    ['N', 0],
  ]);

  const compareSet = ['RT', 'CF', 'JM', 'AN'];

  // 점수 계산
  const result = [];
  survey.forEach((i, index) => {
    const [disAgree, agree] = i.split('');

    const currentPick = choices[index];
    // 비동의
    if (currentPick < 4) {
      info.set(disAgree, info.get(disAgree) + 4 - currentPick);
    }
    // 동의
    if (currentPick > 4) {
      info.set(agree, info.get(agree) + currentPick - 4);
    }
  });

  // 정답 출력
  for (let i of compareSet) {
    const [first, second] = i.split('');
    const firstValue = info.get(first);
    const secondValue = info.get(second);

    if (firstValue > secondValue) {
      result.push(first);
    }
    if (firstValue < secondValue) {
      result.push(second);
    }
    if (firstValue === secondValue) {
      // 문자열 순서 적용
      first < second ? result.push(first) : result.push(second);
    }
  }

  return result.join('');
}
