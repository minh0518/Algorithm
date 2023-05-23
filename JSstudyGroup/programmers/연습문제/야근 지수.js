function solution(n, works) {
  if (works.reduce((a, b) => a + b) <= n) {
    return 0;
  }

  works.sort((a, b) => b - a);
  while (n) {
    let maxValue = works[0];

    // 최댓값과 동일한 값 찾은 후 모두 -1
    for (let i = 0; i < works.length; i++) {
      if (works[i] === maxValue) {
        works[i] -= 1;

        // 동일한 최댓값 여러개에 대해 각각 -1을 하다가
        // 중간에 n이 0이 되면 바로 탈출
        n -= 1;
        if (!n) {
          break;
        }
      }
    }
  }

  return works.map((i) => i ** 2).reduce((a, b) => a + b);
}

solution(4, [4, 3, 3]);
solution(1, [2, 1, 2]);
solution(3, [1, 1]);
