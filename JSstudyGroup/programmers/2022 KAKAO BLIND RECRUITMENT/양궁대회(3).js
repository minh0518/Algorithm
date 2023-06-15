function solution(n, info) {
  let rionsResult = []; // 라이언이 쏜 화살 중 , 어피치와의 점수차가 가장 큰 경우를 담는 배열
  let maxScoreGap = 0; // 어피치와 라이언의 점수차의 최댓값

  const dfs = (index, rion) => {
    // 라이언이 화살을 다 쐈을 때 (=현재까지 쏜 화살로 점수 비교해야 함)
    if (rion.reduce((a, b) => a + b, 0) === n) {
      let rionScore = 0;
      let apeachScore = 0;
      for (let i = 0; i < info.length; i++) {
        let apeachCount = info[i];
        let rionCount = rion[i];
        if (apeachCount !== 0 || rionCount !== 0) {
          apeachCount < rionCount ? (rionScore += 10 - i) : (apeachScore += 10 - i);
        }
      }

      let scoreGap = Math.abs(rionScore - apeachScore);
      if (rionScore > apeachScore) {
        if (maxScoreGap < scoreGap) {
          // 기존 점수차 보다 더 큰 점수차가 나온다면
          // 최댓값을 갱신하고 , rionsResult의 기존 값을 버리고 아예 새로 추가한다
          maxScoreGap = scoreGap;
          rionsResult = [JSON.parse(JSON.stringify(rion))];
        } else if (maxScoreGap === scoreGap) {
          // 기존 점수차와 같은 점수차가 나온다면 push
          rionsResult.push(JSON.parse(JSON.stringify(rion)));
        }
      }
      return;
    }

    for (let i = index; i < info.length; i++) {
      // 어피치가 맞춘 갯수+1개 까지만 화살을 쏠 수 있으므로
      // rion배열에 값을 추가하고 재귀 호출
      // (더이상 쏠 수 없다면 다음 인덱스에서 재귀 호출)
      if (rion[i] < info[i] + 1) {
        rion[i] += 1;
        dfs(i, rion);
        rion[i] -= 1;
      }
    }
  };

  dfs(0, new Array(11).fill(0));

  if (!rionsResult.length) {
    return [-1];
  }

  let lastIndex = 10;
  rionsResult.sort((a, b) => {
    let aIndex = lastIndex;
    let bIndex = lastIndex;
    while (1) {
      if (a[aIndex] !== b[bIndex]) break;
      aIndex -= 1;
      bIndex -= 1;
    }

    return b[bIndex] - a[aIndex];
  });

  return rionsResult[0];
}

solution(5, [2, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0]);
solution(1, [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
solution(9, [0, 0, 1, 2, 0, 1, 1, 1, 1, 1, 1]);
solution(10, [0, 0, 0, 0, 0, 0, 0, 0, 3, 4, 3]);
