function solution(k, tangerine) {
  let info = {};
  for (let i of tangerine) {
    info[i] ? (info[i] += 1) : (info[i] = 1);
  }

  let arr = Object.entries(info);

  arr.sort((a, b) => {
    return b[1] - a[1];
  });

  let sum = 0;
  let count = 0;
  for (let i of arr) {
    let [size, value] = i;
    sum += value;
    count += 1;
    if (sum >= k) break;
  }

  return count;
}
