function solution(A, B) {
  const totalLength = A.length;

  A.sort((a, b) => a - b);
  B.sort((a, b) => a - b);

  let first = 0;
  let second = 0;

  let result = 0;
  while (first < totalLength && second < totalLength) {
    const aValue = A[first];
    const bValue = B[second];

    // b가 이길 수 있다면
    if (aValue < bValue) {
      result += 1;

      // 다음 a값과 비교
      first += 1;
      second += 1;
    }
    // b가 이길 수 없다면
    if (aValue >= bValue) {
      second += 1; //다음으로 큰 b값 사용
    }
  }
  return result;
}
