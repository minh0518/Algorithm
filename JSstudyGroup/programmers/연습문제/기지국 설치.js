function solution(n, stations, w) {
  const WIDTH = w * 2 + 1;

  let count = 0;
  let lastIndex = 0;

  for (let i of stations) {
    const from = i - w < 0 ? 0 : i - w - 1;
    const to = i + w > n ? n - 1 : i + w - 1;
    const current = from - lastIndex;
    // 필요한 기지국 갱신
    count += Math.ceil((from - lastIndex) / WIDTH);
    lastIndex = to + 1;
  }
  if (lastIndex !== n) {
    count += Math.ceil((n - lastIndex) / WIDTH);
  }

  return count;
}
