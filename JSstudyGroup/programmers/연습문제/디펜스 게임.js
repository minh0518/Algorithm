function solution(n, k, enemy) {
  let start = 0;
  let end = enemy.length;
  let result;

  while (start <= end) {
    let mid = Math.floor((start + end) / 2);

    let arr = enemy.slice(0, mid).sort((a, b) => b - a);

    let sum = 0;

    for (let i = k; i < arr.length; i++) {
      sum += arr[i];
      if (sum > n) break;
    }

    // 방어가 가능하다면
    if (sum > n) {
      end = mid - 1;
    }
    // 방어가 불가능하다면
    if (sum <= n) {
      // for문에서 중간에 break된게 아니라 for문을 다 돌고 나왔을 경우도 있으므로 = 처리 필수
      // 또한, sum 과 n이 같은 경우에는 정답이 되는 것이므로 반드시 = 처리는 result = mid 가 있는 곳에 해야 한다
      result = mid;
      start = mid + 1;
    }
  }

  return result;
}
