function solution(n, left, right) {
  const start = Math.floor(left / n) + 1;
  const end = Math.floor(right / n) + 1;

  const arr = [];
  for (let i = start; i <= end; i++) {
    let count = i;

    // n번째에 따른 숫자n추가
    while (count--) {
      arr.push(i);
    }

    // 나머지 오름차순 추가
    let rest = n - i;
    while (rest--) {
      arr.push(arr.length + 1 - (i - start) * n);
    }
  }

  // left, right에 따른 정답 도출
  const gap = right - left;
  left = left % n;
  right = left + gap;
  return arr.slice(left, right + 1);
}
