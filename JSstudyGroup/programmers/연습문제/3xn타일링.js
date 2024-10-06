function solution(n) {
  const dp = new Array(n + 1).fill(0);
  dp[2] = 3;

  for (let i = 4; i <= n; i += 2) {
    dp[i] += dp[i - 2] * dp[2];
    for (let j = 2; j <= i - 4; j += 2) {
      dp[i] += dp[j] * 2;
    }
    dp[i] += 2;
    dp[i] %= 1000000007;
  }

  return dp[n];
}
