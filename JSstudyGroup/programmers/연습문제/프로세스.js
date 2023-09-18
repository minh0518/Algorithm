function solution(priorities, location) {
  const map = new Map();

  priorities.forEach((i, index) => {
    map.set(index, i);
  });
  // [ [인덱스,값] , []]
  const mapArr = [...map];

  const order = [];
  while (mapArr.length) {
    const [index, value] = mapArr.shift();

    if (mapArr.filter((i) => i[1] > value).length >= 1) {
      mapArr.push([index, value]);
    } else {
      order.push([index, value]);
    }
  }

  let result;
  for (let i = 0; i < order.length; i++) {
    if (order[i][0] === location) result = i + 1;
  }

  return result;
}
