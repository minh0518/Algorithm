function solution(s) {
  const stack = [];
  stack.push(isNaN(s[0]) ? s[0].toUpperCase() : s[0]);

  for (let i = 1; i < s.length; i++) {
    const str = s[i];
    if (stack.at(-1) === ' ') {
      stack.push(isNaN(str) ? str.toUpperCase() : str);
      continue;
    }
    stack.push(str.toLowerCase());
  }
  return stack.join('');
}
