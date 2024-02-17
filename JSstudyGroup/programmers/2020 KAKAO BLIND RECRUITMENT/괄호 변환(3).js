function solution(p) {
  const open = '(';
  const close = ')';

  const isRight = (str) => {
    const stack = [];

    for (let i of str) {
      if (i === open) {
        stack.push('(');
      }
      if (i === close) {
        if (!stack.length) return false;
        stack.pop();
      }
    }

    if (stack.length) return false;
    return true;
  };

  const getDivided = (str) => {
    let openCount = 0;
    let closeCount = 0;

    for (let i = 0; i < str.length; i++) {
      if (str[i] === open) openCount += 1;
      if (str[i] === close) closeCount += 1;

      if (openCount === closeCount) {
        return [str.slice(0, i + 1), str.slice(i + 1)];
      }
    }
  };

  const convert = (u, vResult) => {
    const converU = u
      .slice(1, -1)
      .split('')
      .map((i) => {
        if (i === '(') return ')';
        if (i === ')') return '(';
      })
      .join('');
    return '(' + vResult + ')' + converU;
  };

  const dfs = (str) => {
    const [u, v] = getDivided(str);
    const uRight = isRight(u);

    if (v === '') {
      // 재귀를 호출하다가 여기서부터 return을 시작
      if (uRight) {
        return u;
      }
      return convert(u, '');
    }

    // v가 빈 문자열이 아니면 재귀 호출
    const vResult = dfs(v);
    // 이후 반환된 재귀들은 인해 여기서 부터 진행
    if (uRight) {
      return u + vResult;
    }
    return convert(u, vResult);
  };

  if (isRight(p)) return p;
  return dfs(p);
}
