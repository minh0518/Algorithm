function solution(topping) {
  let result = 0;
  const toppingCount = new Map();
  const rest = new Set();

  // Map(4) { 1 => 4, 2 => 2, 3 => 1, 4 => 1 }
  topping.forEach((i) => {
    toppingCount.set(i, (toppingCount.get(i) || 0) + 1);
  });

  for (let i of topping) {
    toppingCount.set(i, toppingCount.get(i) - 1);
    rest.add(i);

    if (toppingCount.get(i) === 0) {
      toppingCount.delete(i);
    }

    if (toppingCount.size === rest.size) {
      result += 1;
    }
  }

  console.log(result);
  return result;
}

solution([1, 2, 1, 3, 1, 4, 1, 2]);
solution([1, 2, 3, 1, 4]);
