/*
 * @url https://school.programmers.co.kr/learn/courses/30/lessons/92341
 * @date 23-11-27
 */

function solution(fees, records) {
  const LAST_TIME = 23 * 60 + 59;
  const convertTime = (timeString) => {
    const [h, m] = timeString.split(':').map(Number);
    return h * 60 + m;
  };

  const info = new Map();
  records.forEach((record, index) => {
    const [time, carNum, inOut] = record.split(' ');
    const convertedTime = convertTime(time);

    // 차번호:[시간1,시간2,...]
    // IN,OUT 여부와 관계 없이 시간들을 추가
    info.set(carNum, info.has(carNum) ? [...info.get(carNum), convertedTime] : [convertedTime]);
  });

  for (let [carNum, value] of info) {
    const calcTimeArr = [];

    // 시간은 항상 입,출 방식이므로 2자리씩 끊어가며 계산
    let index = 0;
    while (index < value.length - 1) {
      const [inTime, ouTime] = value.slice(index, index + 2);
      calcTimeArr.push(ouTime - inTime);
      index += 2;
    }

    // 마지막 출차시간이 없으면 23:59 기준으로 계산
    if (value.length % 2 === 1) calcTimeArr.push(LAST_TIME - value.pop());

    // 전체 이용시간 합산
    const totalUseTime = calcTimeArr.reduce((a, b) => a + b);

    // 최소 기본요금
    const totalBasicPrice = fees[1];

    // 최종 계산
    const totalExtraPrice = totalUseTime > fees[0] ? Math.ceil((totalUseTime - fees[0]) / fees[2]) * fees[3] : 0;

    info.set(carNum, totalBasicPrice + totalExtraPrice);
  }
  const result = [];

  [...info]
    .sort((a, b) => Number(a[0]) - Number(b[0]))
    .forEach((i) => {
      result.push(i[1]);
    });

  return result;
}
