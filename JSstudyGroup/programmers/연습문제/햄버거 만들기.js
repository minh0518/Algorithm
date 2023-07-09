function solution(ingredient) {
  const stack = [];
  let value = 1;
  let count = 0;
  for (let i of ingredient) {
    stack.push(i);
    if (stack.length >= 4 && stack.slice(-4).join('') === '1231') {
      stack.splice(stack.length - 4, 4);
      count += 1;
    }
  }
  return count;
}
