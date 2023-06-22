function solution(fees, records) {
  records = records.map((i) => {
    let [time, carNum, inOut] = i.split(' ');
    let [hour, min] = time.split(':').map(Number);
    return [hour * 60 + min, carNum, inOut];
  });
  const lastTime = 23 * 60 + 59;

  const info = {};

  //             in   out  in  out
  // { '5961': [ 334, 479, 1379, 1380 ] , ... }
  for (let record of records) {
    // 처음들어오면 in이고 두번째 들어오면 out 되므로
    let [time, carNum, inOut] = record;
    info[carNum] ? info[carNum].push(time) : (info[carNum] = [time]);
  }
  console.log(info);

  for (let i in info) {
    // 마지막 출차 시간이 없다면 마지막 시간 push
    info[i].length % 2 !== 0 && info[i].push(lastTime);

    // 짝수개씩 합산
    let parkingTimes = [];
    for (let j = 0; j < info[i].length; j++) {
      let sub = info[i][j + 1] - info[i][j];
      parkingTimes.push(sub);
      j++;
    }

    // 총 주차 시간
    let totalParkingTime = parkingTimes.reduce((a, b) => a + b);

    // 최종 계산
    if (totalParkingTime <= fees[0]) info[i] = fees[1];
    if (totalParkingTime > fees[0]) {
      let totalFee = fees[1] + Math.ceil((totalParkingTime - fees[0]) / fees[2]) * fees[3];
      info[i] = totalFee;
    }
  }

  let result = [];

  // 키를 바탕으로 오름차순 정렬
  let infoArr = Object.entries(info);
  infoArr.sort((a, b) => Number(a[0]) - Number(b[0]));
  for (let i of infoArr) {
    result.push(i[1]);
  }
  return result;
}

solution(
  [180, 5000, 10, 600],
  [
    '05:34 5961 IN',
    '06:00 0000 IN',
    '06:34 0000 OUT',
    '07:59 5961 OUT',
    '07:59 0148 IN',
    '18:59 0000 IN',
    '19:09 0148 OUT',
    '22:59 5961 IN',
    '23:00 5961 OUT',
  ],
);
solution([120, 0, 60, 591], ['16:00 3961 IN', '16:00 0202 IN', '18:00 3961 OUT', '18:00 0202 OUT', '23:58 3961 IN']);
solution([1, 461, 1, 10], ['00:00 1234 IN']);
