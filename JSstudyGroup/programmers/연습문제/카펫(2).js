function solution(brown, yellow) {
  const total = brown + yellow;

  let width;
  let height = 3;

  while (1) {
    if (total % height === 0) {
      width = total / height;
      if (width >= height && (width - 2) * (height - 2) === yellow) break;
    }
    height += 1;
  }
  return [width, height];
}
