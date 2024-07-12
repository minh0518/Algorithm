function solution(s) {
  const OPEN = ['(', '{', '['];
  const CLOSE = [')', '}', ']'];

  // 올바른 괄호 판별 함수
  const isCorrect = (arr) => {
    const stack = [];

    for (let str of arr) {
      if (OPEN.includes(str)) {
        stack.push(str);
        continue;
      }
      if (!stack.length) return false;
      const topValue = stack.pop();

      if (OPEN[CLOSE.indexOf(str)] !== topValue) return false;
    }
    if (stack.length) return false;
    return true;
  };

  let start = 0;
  let end = s.length - 1;

  s += s.slice(s, s.length - 1);
  s = s.split('');

  let str = s.slice(start, end + 1);

  let count = 0;
  while (end < s.length - 1) {
    if (isCorrect(str)) count += 1;
    start += 1;
    end += 1;
    str = s.slice(start, end + 1);
  }

  return count;
}
