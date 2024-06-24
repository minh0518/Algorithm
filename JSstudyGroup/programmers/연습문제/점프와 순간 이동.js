function solution(n) {
  let count = 0;
  while (n !== 0) {
    if (n % 2 === 0) {
      n /= 2;
    }
    if (n % 2 !== 0) {
      count += 1;
      n -= 1;
    }
  }
  return count;
}
