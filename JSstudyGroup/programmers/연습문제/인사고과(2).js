function solution(scores) {
  const targetStr = scores[0].join('');

  scores.sort((a, b) => {
    if (a[0] === b[0]) {
      return a[1] - b[1];
    }
    return b[0] - a[0];
  });

  // 완호의 점수
  let targetScore;

  // 최종 인센티브를 받는 사원의 점수들
  const finalCandidateScores = [];

  // 첫번째 값 담기
  finalCandidateScores.push(scores[0].reduce((a, b) => a + b));
  if (scores[0].join('') === targetStr) targetScore = scores[0].reduce((a, b) => a + b);

  // 데드라인 생성
  let deadline = scores[0][1];

  // 사원 배열을 순회하며 탐색 진행
  for (let i = 1; i < scores.length; i++) {
    const [score1, score2] = scores[i];
    if (score2 >= deadline) {
      const scoreStr = scores[i].join('');
      const scoreSum = score1 + score2;
      if (scoreStr === targetStr) targetScore = scoreSum;
      deadline = score2;
      finalCandidateScores.push(scoreSum);
    }
  }

  if (targetScore === undefined) return -1;

  finalCandidateScores.sort((a, b) => b - a);

  // 완호 점수의 첫번째 인덱스가 동석차를 반영한 등수가 된다
  const resultIndex = finalCandidateScores.indexOf(targetScore);

  return resultIndex === -1 ? -1 : resultIndex + 1;
}
