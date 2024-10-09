function solution(target) {
  const dp = new Array(target + 1).fill(undefined).map(() =>
    new Array(2).fill(undefined).map((_, index) => {
      if (index === 0) {
        return Infinity;
      }
      return 0;
    }),
  );

  dp[0] = [0, 0];

  for (let i = 1; i <= target; i++) {
    // 50
    if (i - 50 >= 0) {
      const prev = dp[i - 50];

      // 다트 개수가 적을 때
      if (dp[i][0] > prev[0] + 1) {
        dp[i] = [prev[0] + 1, prev[1] + 1];
      }
    }
    for (let j = 1; j <= 20; j++) {
      //싱글
      const sigleIndex = i - j;
      if (sigleIndex >= 0) {
        const prev = dp[sigleIndex];

        // 다트 개수가 적을 때
        if (dp[i][0] > prev[0] + 1) {
          dp[i] = [prev[0] + 1, prev[1] + 1];
        }
        // 다트 개수가 같을 때
        if (dp[i][0] === prev[0] + 1 && dp[i][1] < prev[1] + 1) {
          dp[i] = [prev[0] + 1, prev[1] + 1];
        }
      }

      // 더블
      const doubleIndex = i - j * 2;
      if (doubleIndex >= 0) {
        const prev = dp[doubleIndex];

        // 다트 개수가 적을 때
        if (dp[i][0] > prev[0] + 1) {
          dp[i] = [prev[0] + 1, prev[1]];
        }
      }

      // 트리플
      const tripleIndex = i - j * 3;
      if (tripleIndex >= 0) {
        const prev = dp[tripleIndex];

        // 다트 개수가 적을 때
        if (dp[i][0] > prev[0] + 1) {
          dp[i] = [prev[0] + 1, prev[1]];
        }
      }
    }
  }
  return dp.at(-1);
}
