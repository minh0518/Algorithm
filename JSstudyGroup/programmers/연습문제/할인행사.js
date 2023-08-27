function solution(want, number, discount) {
  const map = new Map();
  for (let i = 0; i < want.length; i++) {
    map.set(want[i], number[i]);
  }

  let result = 0;
  for (let i = 0; i <= discount.length - 10; i++) {
    const copyMap = new Map([...map]);
    const slicedArr = discount.slice(i, i + 10);

    for (let j of slicedArr) {
      let before = copyMap.get(j);
      if (before) copyMap.set(j, before - 1);
    }
    if ([...copyMap].filter((i) => i[1]).length === 0) result += 1;
  }

  return result;
}
