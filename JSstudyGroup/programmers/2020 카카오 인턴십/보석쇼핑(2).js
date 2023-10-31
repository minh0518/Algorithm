function solution(gems) {
  const set = new Set(gems);
  const info = new Map();
  let result;
  let minGap = Infinity;
  for (let i = 0; i < gems.length; i++) {
    const gem = gems[i];

    if (info.has(gem)) info.delete(gem);
    info.set(gem, i);

    if (info.size === set.size) {
      // const infoArr = [...info];
      // const firstIndex = infoArr[0][1];
      // const lastIndex = infoArr[infoArr.length - 1][1];
      const firstIndex = info.entries().next().value[1];
      const lastIndex = i;
      const gap = lastIndex - firstIndex;
      if (gap < minGap) {
        result = [firstIndex, lastIndex];
        minGap = gap;
      }
    }
  }

  return [result[0], result[1]].map((i) => i + 1);
}
console.log(solution(['DIA', 'RUBY', 'RUBY', 'DIA', 'DIA', 'EMERALD', 'SAPPHIRE', 'DIA']));
