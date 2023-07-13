function solution(p) {
  p = p.split('');

  const rightCheck = (arr) => {
    let stack = [];

    for (let i of arr) {
      if (i === ')' && stack[stack.length - 1] === '(') {
        stack.pop();
        continue;
      }
      stack.push(i);
    }

    return stack.length ? false : true;
  };

  const dfs = (p) => {
    let u = [];
    let v = [];

    // u,v 분리
    let leftCount = 0;
    let rightCount = 0;
    for (let i = 0; i < p.length; i++) {
      let str = p[i];
      if (str === '(') {
        leftCount += 1;
        u.push(str);
      }
      if (str === ')') {
        rightCount += 1;
        u.push(str);
      }
      if (leftCount === rightCount) {
        if (i === p.length - 1) v = [];
        if (i !== p.length - 1) v = p.slice(i + 1);
        break;
      }
    }

    // v의 길이가 빈 문자열이 나올때까지 내려왔다는 것이고
    // 이에 따른 u를 변환해서 리턴
    if (!v.length) {
      // v가 빈 문자열이고 u도 올바르다면 u를 그대로 리턴
      if (rightCheck(u)) {
        return u;
      }
      // v가 빈 문자열이지만 u가 올바르지 않다면 u를 변환해야 함
      if (!rightCheck(u)) {
        // u의 길이가 2보다 클 때
        if (u.length > 2) {
          //문제에서 언급한 대로 진행
          let uForReverse = u.slice(1, u.length - 1);
          uForReverse = uForReverse.map((i) => {
            if (i === '(') return ')';
            if (i === ')') return '(';
          });
          return ('()' + uForReverse.join('')).split('');
        }
        // u의 길이가 2 이하일 때는 그냥 ()그대로 리턴
        // v가 빈 문자열이고 , u의 길이가 2 이하면 자를 부분도 없으므로 앞에 ( , 뒤에 )를 추가한 것만 리턴
        if (u.length <= 2) {
          return '()'.split('');
        }
      }
    }

    // v가 빈 문자열이 아니라면 , v가 빈 문자열이 나올 때까지
    // 모든 v에 대해 재귀를 계속 호출 해야 함
    let vResult = dfs(v);
    // V가 빈 문자열이 되어 리턴이 되면
    // 여기서부터 나머지 로직이 진행 (모든 재귀레벨 마찬가지)

    // u가 올바르다면 전달받은 v와 연결시켜서 리턴
    if (rightCheck(u)) {
      return [...u, ...vResult];
    }
    // u가 올바르지 않다면 u를 변환시킨 뒤 리턴
    if (!rightCheck(u)) {
      // u의 길이가 2보다 클 때
      if (u.length > 2) {
        //문제에서 언급한 대로 진행
        let uForReverse = u.slice(1, u.length - 1);
        uForReverse = uForReverse.map((i) => {
          if (i === '(') return ')';
          if (i === ')') return '(';
        });

        return ('(' + vResult.join('') + ')' + uForReverse.join('')).split('');
      }
      // u의 길이가 2이하일 때
      // 여기선 'u의 맨앞뒤를 제거하고 남은 부분을 뒤집에서 연결하는 부분'이 존재하지 않음
      if (u.length <= 2) {
        return ('(' + vResult.join('') + ')').split('');
      }
    }
  };

  if (rightCheck(p)) return p.join('');
  return dfs(p).join('');
}
