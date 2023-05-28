const solution = (weights) => {
  const combination = [1, 2 / 3, 2 / 4, 3 / 4];

  weights.sort((a, b) => a - b);

  let result = 0;
  let map = new Map();
  for (let i of weights) {
    for (let j of combination) {
      let value = i * j; // 비율 계산
      if (map.has(value)) {
        // 만약 그 비율이 기존 Map 에 존재한다면
        result += map.get(value); // Map에 존재하는 값만큼 추가
      }
    }
    map.has(i) ? map.set(i, map.get(i) + 1) : map.set(i, 1); // i를 Map에 추가

    console.log(map);
  }

  console.log(result);
  return result;
};
