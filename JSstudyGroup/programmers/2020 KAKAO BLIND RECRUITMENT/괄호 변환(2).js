function solution(p) {
  p = p.split('');
  const [open, close] = ['(', ')'];

  // 균형잡힌 괄호 문자열 판별 함수
  const getBalancedSliceIndex = (strArr) => {
    // '(' 와 ')' 갯수가 같아지면 리턴
    let count = 0;
    for (let i = 0; i < strArr.length; i++) {
      const current = strArr[i];
      if (current === open) count += 1;
      if (current === close) count -= 1;
      if (count === 0) return i;
    }
  };

  // 올바른 괄호 문자열 판별 함수
  const checkRightStr = (strArr) => {
    let stack = [];
    for (let i of strArr) {
      if (i === open) stack.push(i);
      if (i === close) {
        if (!stack.length) return false;
        stack.pop();
      }
    }
    if (!stack.length) return true;
    return false;
  };

  const dfs = (u, v) => {
    let vResult; // 각 재귀로부터 전달받은 v반환값
    const isRight = checkRightStr(u);

    // v값이 있다면 재귀 호출
    if (v.length) {
      const sliceIndex = getBalancedSliceIndex(v);
      const [newU, newV] = [v.slice(0, sliceIndex + 1), v.slice(sliceIndex + 1)];
      vResult = dfs(newU, newV); // 호출했던 재귀로부터 전달받은 값을 vResult로
      // dfs로부터 값을 리턴 받으면 아래 로직이 진행되며 계속 return 진행
    }

    // v값이 없다면 vResult를 빈 값으로 선언 후, 아래 로직에서
    // return시작
    // (계속 재귀만 호출하다가 v값이 없으면 이제 return 시작)
    if (!v.length) vResult = [];

    // u,v 조합 진행
    if (isRight) return [...u, ...vResult];
    if (!isRight) {
      let convertedStr = u.slice(1, u.length - 1).map((i) => {
        if (i === open) return close;
        if (i === close) return open;
      });
      return [open, ...vResult, close, ...convertedStr];
    }
  };

  if (checkRightStr(p)) return p.join('');

  const sliceIndex = getBalancedSliceIndex(p);
  const [u, v] = [p.slice(0, sliceIndex + 1), p.slice(sliceIndex + 1)];
  return dfs(u, v).join('');
}
