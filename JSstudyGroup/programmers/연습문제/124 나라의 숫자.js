function solution(n) {
  const number = [4, 1, 2];
  const result = [];
  while (n) {
    result.push(number[n % 3]);

    if (n % 3 === 0) {
      n = Math.floor((n - 1) / 3);
    } else if (n % 3 !== 0) {
      n = Math.floor(n / 3);
    }
  }
  return result.reverse().join('');
}
