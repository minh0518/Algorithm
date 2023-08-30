function solution(n, times) {
  times.sort((a, b) => a - b);

  let left = 1;
  let right = n * times[times.length - 1];
  let answer = n * times[times.length - 1];

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    let count = 0;

    for (let i of times) {
      count += Math.floor(mid / i); // 각 심사위원이 mid시간에 처리할 수 있는 사람 수
      if (count > n) break;
    }

    if (count < n) {
      left = mid + 1;
    }
    // 정답이 가능한 구간에서 answer를 기록해야 함
    if (count >= n) {
      right = mid - 1;
      answer = mid;
    }
  }

  return answer;
}
