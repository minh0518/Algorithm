function solution(today, terms, privacies) {
  // 오늘 날짜 변환
  let [year, month, day] = today.split('.').map(Number);
  today = year * 28 * 12 + month * 28 + day;

  // 약관 정보 배열을 객체로 변환
  let termInfo = {};
  terms.forEach((i) => {
    let [name, term] = i.split(' ');
    termInfo[name] = Number(term);
  });

  // 개인정보 수집 일자 변환
  privacies = privacies.map((i) => {
    let [date, termName] = i.split(' ');
    let [year, month, day] = date.split('.').map(Number);
    date = year * 28 * 12 + month * 28 + day;

    // [ 변환된 수집 일자 , 약관 종류 ]
    return [date, termName];
  });

  // 변환된 각각의 개인정보 수집 일자에 약관 종류에 따른 유효기간 계산
  let result = [];
  for (let i = 0; i < privacies.length; i++) {
    let [date, termName] = privacies[i];
    let validate = date + termInfo[termName] * 28 - 1;

    // 변환된 값을 기반으로 바로 비교
    validate < today && result.push(i + 1);
  }

  return result;
}

solution('2022.05.19', ['A 6', 'B 12', 'C 3'], ['2021.05.02 A', '2021.07.01 B', '2022.02.19 C', '2022.02.20 C']);
solution('2020.01.01', ['Z 3', 'D 5'], ['2019.01.01 D', '2019.11.15 Z', '2019.08.02 D', '2019.07.01 D', '2018.12.28 Z']);
