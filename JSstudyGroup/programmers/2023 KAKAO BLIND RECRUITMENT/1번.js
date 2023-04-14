function solution(today, terms, privacies) {
  terms = terms.map((i) => i.split(' '));

  let result = [];
  for (let i = 0; i < privacies.length; i++) {
    let privacy = privacies[i].split(' ');
    let validateMonth;
    for (let term of terms) {
      if (term[0] === privacy[1]) {
        validateMonth = Number(term[1]);
        break;
      }
    }

    let [year, month, day] = privacy[0].split('.').map(Number);

    let originMonth = month;

    // 기본적으로 월만큼 더하고 일은 -1
    month += validateMonth;
    day -= 1;

    // 월이 12넘으면 넘어간 연도와 , 월도 수정
    if (month > 12) {
      let overYear = Math.floor(month / 12);
      let overMonth = month % 12;

      if (overMonth !== 0) {
        year += overYear;
        month = overMonth;
      }
      if (overMonth === 0) {
        // month를 더한 값이 12배수여서 overMonth가 0인 경우엔 따로 계산
        //ex) 2022.02.20  +22개월 >> 2022.24.19 >> 2023.12.19(22%12한 값을 2월에서 더해야 함)
        year += Math.floor(validateMonth / 12);
        month = originMonth + (validateMonth % 12);
      }
    }

    // 2021.7.1 +5개월>> 2021.12.0 >> 2021.11.28
    // 2021.7.1 +6개월>> 2021.13.0 >> 2021.12.28
    // 2021.7.1 +7개월>> 2021.14.0 >> 2022.2.0 >> 2022.1.28
    if (day === 0) {
      month -= 1;
      day = 28;
      if (month === 0) {
        year -= 1;
        month = 12;
      }
    }

    // 오늘 날짜와 비교
    let [todayYear, todayMonth, todayDay] = today.split('.').map(Number);
    if (todayYear > year) {
      result.push(i + 1);
      continue;
    }
    if (todayYear === year && todayMonth > month) {
      result.push(i + 1);
      continue;
    }
    if (todayYear === year && todayMonth === month && todayDay > day) {
      result.push(i + 1);
      continue;
    }
  }
  return result;
}
