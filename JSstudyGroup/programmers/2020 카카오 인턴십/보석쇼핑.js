function solution(gems) {
  const info = new Map();
  const setSize = new Set(gems).size;

  // 최소 구간 길이
  let minLength = Infinity;

  let result;
  for (let i = 0; i < gems.length; i++) {
    const gem = gems[i];
    if (info.has(gem, i)) info.delete(gem);
    info.set(gem, i);

    // info의 길이가 보석의 종류와 같아질 때
    if (setSize === info.size) {
      // sort할 필요 없이 info의 맨 앞,맨 뒤 인덱스가 시작과 끝이 됨
      const [from, to] = [info.entries().next().value[1] + 1, i + 1];
      const sectionLength = to - from;

      // 최소구간일 경우 push
      if (minLength > sectionLength) {
        minLength = sectionLength;
        result = [from, to];
      }
    }
  }
  // 가장 마지막값이 최소구간
  return result;
}
