const solution = (survey, choices) => {
  const info = {};
  const compareSet = ['RT', 'CF', 'JM', 'AN'];

  survey.forEach((i) => {
    // 초기 점수판 info 객체 세팅
    let categories = i.split('');
    info[categories[0]] ? '' : (info[categories[0]] = 0);
    info[categories[1]] ? '' : (info[categories[1]] = 0);
  });

  // 선택지를 기반으로 점수 갱신
  for (let i = 0; i < choices.length; i++) {
    let choice = choices[i];

    // 비동의
    if (choice <= 3) {
      // 1,2,3 을 선택하면 각각 3,2,1
      let score = 4 - choice;
      info[survey[i][0]] += score;
    }

    // 동의
    if (choice >= 5) {
      // 5,6,7 을 선택하면 각각 1,2,3
      let score = choice - 4;
      info[survey[i][1]] += score;
    }
  }

  let result = [];

  // 점수판을 기반으로 최종 성격 유형 도출
  for (let i of compareSet) {
    let set = i;

    // 2번째 테스트 케이스처럼 TR만 주어진 경우 , CF MJ 같은 것들은 undefined===undefined로 비교가 됨
    if (info[set[0]] === info[set[1]]) {
      result.push(set[0]);
      continue;
    }
    info[set[0]] > info[set[1]] ? result.push(set[0]) : result.push(set[1]);
  }

  return result.join('');
};

solution(['AN', 'CF', 'MJ', 'RT', 'NA'], [5, 3, 2, 7, 5]);
solution(['TR', 'RT', 'TR'], [7, 1, 3]);
