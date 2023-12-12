function solution(n, t, m, timetable) {
  const convertedRealTime = (number) => {
    const calcH = Math.floor(number / 60);
    const calcM = number % 60;
    const h = ('' + calcH).length !== 2 ? `0${calcH}` : `${calcH}`;
    const m = ('' + calcM).length !== 2 ? `0${calcM}` : `${calcM}`;

    return `${h}:${m}`;
  };

  let currentBusTime = 9 * 60;

  timetable = timetable.map((i) => {
    const [h, m] = i.split(':').map(Number);
    return h * 60 + m;
  });

  // 시간 오름차순 필수! 각 버스에 탄 마지막 인원이 가장 늦은 시간이 될 수 있도록
  timetable.sort((a, b) => a - b);

  let result;

  // 각 버스타임마다 버스를 타게 되는 사람들
  let onboard = [];
  // 각 버스타임마다 버스를 타지 못한 사람들
  let rest = [];

  // 버스 횟수만큼 진행
  while (n--) {
    // 마지막 계산 결과를 유지한 체 while문 탈출을 위해
    // 초기화를 while문 끝이 아닌 상단에서 진행
    onboard = [];
    rest = [];

    // 현재 버스 시간 기준 탈수 있는사람과 없는 사람 구분
    timetable.forEach((i) => {
      if (i <= currentBusTime && onboard.length < m) onboard.push(i);
      // 버스 시간 내에 기다리고 있었어도 이미 인원이 가득차면 rest에 push
      else if (onboard.length >= m || i > currentBusTime) rest.push(i);
    });

    // 마지막 버스일 경우 정답 도출
    if (n === 0) {
      if (onboard.length === m) {
        result = onboard[onboard.length - 1] - 1;
      }
      if (onboard.length < m) {
        result = currentBusTime;
      }
    }

    // 남은 인원들로 변경
    timetable = rest;
    // 다음 버스 시간
    currentBusTime += t;
  }

  return convertedRealTime(result);
}
