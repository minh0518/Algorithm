function solution(relation) {
  const REL_COL = relation[0].length;
  const REL_ROW = relation.length;

  let uniquenessIndexs = [];

  // 유일성 확인
  const checkUnique = (indexArr) => {
    const result = new Set();
    for (let row of relation) {
      const col = [];
      for (let i of indexArr) {
        col.push(row[i]);
      }
      result.add(col.join(''));
    }
    if (result.size === REL_ROW) {
      uniquenessIndexs.push([...indexArr]);
    }
  };

  // 칼럼(속성)의 모든 인덱스 조합을 구하는 백트래킹
  const dfs = (current, index, targetLength) => {
    if (current.length === targetLength) {
      checkUnique(current);
      return;
    }

    for (let i = index; i < REL_COL; i++) {
      current.push(i);
      dfs(current, i + 1, targetLength);
      current.pop();
    }
  };

  for (let i = 1; i < REL_ROW; i++) {
    dfs([], 0, i);
  }

  console.log(uniquenessIndexs);

  // 최소성 확인
  const checkMinimal = (current, next) => {
    // [ 0, 3 ] [ 0, 1, 3 ]>> >> true
    // [ 0, 1]  [ 1, 2, 3 ] >> false
    return current.every((i) => next.includes(i));
  };

  for (let i = 0; i < uniquenessIndexs.length; i++) {
    const current = uniquenessIndexs[i];

    for (let j = i + 1; j < uniquenessIndexs.length; j++) {
      if (checkMinimal(current, uniquenessIndexs[j])) {
        uniquenessIndexs.splice(j, 1);
        j -= 1;
      }
    }
  }

  return uniquenessIndexs.length;
}
