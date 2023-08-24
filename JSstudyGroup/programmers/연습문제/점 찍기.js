function solution(k, d) {
  let result = 0;
  for (let i = 0; i <= d; i += k) {
    result += Math.floor(Math.sqrt((d ** 2 - i ** 2) / k ** 2)) + 1;
  }
  return result;
}
