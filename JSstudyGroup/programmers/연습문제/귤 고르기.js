function solution(k, tangerine) {
  const info = new Map();
  for (let i of tangerine) {
    info.set(i, info.has(i) ? info.get(i) + 1 : 1);
  }
  const sortedInfo = [...info].sort((a, b) => b[1] - a[1]);

  let result = 0;
  let current = 0;
  for (let [kind, count] of sortedInfo) {
    result += 1;
    current += count;
    if (current >= k) break;
  }

  return result;
}
