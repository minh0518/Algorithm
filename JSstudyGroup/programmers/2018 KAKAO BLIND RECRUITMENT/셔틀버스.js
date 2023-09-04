function solution(n, t, m, timetable) {
  timetable = timetable
    .map((i) => {
      const [h, m] = i.split(':').map(Number);
      return h * 60 + m;
    })
    .sort((a, b) => a - b);

  let busTime = 60 * 9;

  let result;
  for (let i = 0; i < n; i++) {
    let onBoardPeople = [];

    // 필터링.
    // 현재 시간 버스에 탈 수 있는 인원 중 m 만큼만
    // onBoardPeople 에 담고, 그 인원만큼 timetable에서 제거
    for (let j = 0; j < timetable.length; j++) {
      let person = timetable[j];
      if (person <= busTime && onBoardPeople.length < m) {
        onBoardPeople.push(timetable[j]);
      } else {
        break;
      }
    }
    timetable.splice(0, onBoardPeople.length);

    // 콘은 항상 가장 늦은 버스를 타는 것이므로 n-1일 때 정답 도출
    // 현재 시간(=마지막 버스)에서 탑승 가능한 인원이 m보다 작으면
    if (i === n - 1 && onBoardPeople.length < m) {
      result = busTime;
    }
    // 현재 시간(=마지막 버스)에서 탑승 가능한 인원이 m만큼 꽉 차면(위에서 필터링 했으므로 m보다 클 수는 없음)
    if (i === n - 1 && onBoardPeople.length === m) {
      result = Math.max(...onBoardPeople) - 1;
    }
    busTime += t;
  }

  let [hour, minute] = [String(Math.floor(result / 60)), String(result % 60)];
  if (hour.length !== 2) hour = '0' + hour;
  if (minute.length !== 2) minute = '0' + minute;

  return [hour, minute].join(':');
}
