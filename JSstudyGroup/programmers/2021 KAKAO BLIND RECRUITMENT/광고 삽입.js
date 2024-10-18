function solution(play_time, adv_time, logs) {
  if (play_time === adv_time) return '00:00:00';

  const convertTime = (str) => {
    const [h, m, s] = str.split(':').map(Number);
    return h * 60 * 60 + m * 60 + s;
  };

  const convertStr = (time) => {
    const h = Math.floor(time / 3600) < 10 ? `0${Math.floor(time / 3600)}` : `${Math.floor(time / 3600)}`;
    const m =
      Math.floor((time % 3600) / 60) < 10 ? `0${Math.floor((time % 3600) / 60)}` : `${Math.floor((time % 3600) / 60)}`;
    const s = (time % 3600) % 60 < 10 ? `0${(time % 3600) % 60}` : `${(time % 3600) % 60}`;

    return `${h}:${m}:${s}`;
  };

  play_time = convertTime(play_time);
  adv_time = convertTime(adv_time);
  logs = logs.map((time) => {
    return time.split('-').map((time) => convertTime(time));
  });

  const timeTable = new Array(play_time + 1).fill(0);
  for (const [start, end] of logs) {
    timeTable[start] += 1;
    timeTable[end] -= 1;
  }

  // 누적 시청자 수
  for (let i = 1; i < timeTable.length; i++) {
    timeTable[i] += timeTable[i - 1];
  }

  // 누적 재생 횟수
  for (let i = 1; i < timeTable.length; i++) {
    timeTable[i] += timeTable[i - 1];
  }

  let maxValue = timeTable[adv_time - 1];
  let startTime = 0;
  for (let i = adv_time; i <= timeTable.length; i++) {
    const currentSum = timeTable[i] - timeTable[i - adv_time];
    if (currentSum > maxValue) {
      maxValue = currentSum;
      startTime = i - adv_time + 1;
    }
  }

  return convertStr(startTime);
}
