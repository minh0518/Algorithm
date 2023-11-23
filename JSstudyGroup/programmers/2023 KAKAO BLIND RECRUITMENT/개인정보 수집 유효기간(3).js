/*
 * @url https://school.programmers.co.kr/learn/courses/30/lessons/150370
 * @date 23-11-23
 */

function solution(today, terms, privacies) {
  // 날짜 변환
  const convertDate = (y, m, d) => {
    return y * 28 * 12 + m * 28 + d;
  };

  // 만료 기간
  const termsInfo = new Map();
  for (let term of terms) {
    const [name, month] = term.split(' ');
    termsInfo.set(name, Number(month));
  }

  // 오늘 날짜 변환
  const [todayY, todayM, todayD] = today.split('.').map(Number);
  today = convertDate(todayY, todayM, todayD);

  const result = [];
  for (let i = 0; i < privacies.length; i++) {
    const privacy = privacies[i];
    const [date, name] = privacy.split(' ');

    let [y, m, d] = date.split('.').map(Number);

    // 약관에 따른 만기일 계산
    m += termsInfo.get(name);
    d -= 1;
    const expiredDate = convertDate(y, m, d);

    if (today > expiredDate) {
      result.push(i + 1);
    }
  }

  return result.sort((a, b) => a - b);
}
