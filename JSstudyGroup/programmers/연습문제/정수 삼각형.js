function solution(triangle) {
  const ROW = triangle.length;
  const COL = triangle[0].length;

  // DP배열 생성 및 초기화
  const dp = new Array(ROW).fill(undefined).map(() => new Array(COL).fill(0));
  dp[0][0] = triangle[0][0];

  for (let row = 1; row < triangle.length; row++) {
    const colLength = row + 1;

    // 시작 부분
    dp[row][0] = dp[row - 1][0] + triangle[row][0];

    // 맨 끝 부분
    dp[row][colLength - 1] = dp[row - 1][colLength - 2] + triangle[row][colLength - 1];

    // 중간부분 DP 진행
    for (let col = 1; col < colLength - 1; col++) {
      dp[row][col] = Math.max(dp[row - 1][col], dp[row - 1][col - 1]) + triangle[row][col];
    }
  }

  return Math.max(...dp[triangle.length - 1]);
}
