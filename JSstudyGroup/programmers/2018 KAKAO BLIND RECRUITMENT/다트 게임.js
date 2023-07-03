function solution(dartResult) {
  dartResult = dartResult.split('');

  const multipleInfo = {
    S: 1,
    D: 2,
    T: 3,
  };

  let dartResultArr = [];
  for (let i = 0; i < dartResult.length; i++) {
    let value = dartResult[i];

    // 숫자 단위로 끊어야 하므로
    if (!isNaN(value)) {
      // 각 점수 정보를 배열 단위로 저장
      dartResultArr.push([]);

      // 10같이 숫자가 연속된 경우가 있으므로
      while (1) {
        i += 1;
        if (isNaN(dartResult[i])) {
          // i+1를 한 결과가 문자열이라면 break
          i -= 1; // 인덱스 원상복구
          break;
        }
        value += dartResult[i];
        // 숫자가 연속해서 나온 경우 value값에 이어붙임
      }
    }
    dartResultArr[dartResultArr.length - 1].push(value);
  }
  console.log(dartResultArr);

  let totalScore = [];
  for (let dart of dartResultArr) {
    let score = Number(dart.shift());
    let multiple = dart.shift();

    let option;
    if (dart.length) {
      option = dart.shift();
    }

    score **= multipleInfo[multiple];
    if (option === '*') {
      score *= 2;
      if (totalScore.length) totalScore[totalScore.length - 1] = totalScore[totalScore.length - 1] * 2;
    }
    if (option === '#') {
      score *= -1;
    }
    totalScore.push(score);
  }

  return totalScore.reduce((a, b) => a + b);
}
