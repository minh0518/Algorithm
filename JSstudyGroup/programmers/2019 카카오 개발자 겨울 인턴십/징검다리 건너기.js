function solution(stones, k) {
  let left = 1;
  let right = 200000000;

  // 현재 mid값으로 건널 수 있는지 확인
  const calc = (mid) => {
    let zeroCount = 0; // 연속된 0의 갯수

    for (let i = 0; i < stones.length; i++) {
      let subResult = stones[i] - mid;
      if (subResult <= 0) zeroCount += 1;
      if (subResult > 0) zeroCount = 0; // count가 연속된 갯수를 세기 위해 0이 아니면 0으로 다시 초기화

      if (zeroCount === k) return false;
    }
    return true;
  };

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    const isPossible = calc(mid);

    // 0보다 작거나 같은 값이 k만큼 연속된다면 건널 수 없음
    if (!isPossible) {
      right = mid - 1;
    }

    // 0보다 작거나 같은 값이 k보다 작다면 건널 수 있음
    if (isPossible) {
      left = mid + 1;
    }
  }

  return left;
}
