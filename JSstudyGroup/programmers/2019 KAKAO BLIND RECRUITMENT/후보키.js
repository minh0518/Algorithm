function solution(relation) {
  //행과 열을 변경한 릴레이션
  let newRelation = new Array(relation[0].length).fill().map(() => new Array(relation.length));

  for (let i = 0; i < relation.length; i++) {
    for (let j = 0; j < relation[i].length; j++) {
      newRelation[j][i] = relation[i][j];
    }
  }
  let uniqueLength = newRelation[0].length;

  let combination = [];

  // 조합 결과 배열들 , 시작 인덱스 , 현재 깊이 , 최대 속성 갯수
  const dfs = (current, start, depth, max) => {
    if (depth === max) {
      combination.push(JSON.parse(JSON.stringify(current)));
      return;
    }

    for (let i = start + 1; i < newRelation.length; i++) {
      current.push(i);
      dfs(current, i, depth + 1, max);
      current.pop(); // 배열이라서 마지막 값을 제거해야 함
    }
  };

  // i는 조합의 갯수를 의미 (1개 ~ 릴레이션 전체의 갯수)
  for (let i = 1; i <= newRelation.length; i++) {
    for (let j = 0; j < newRelation.length; j++) {
      if (j + i <= newRelation.length) {
        dfs([j], j, 1, i); // 각 튜플의 인덱스를 넣음
      }
    }
  }

  // console.log(newRelation);
  // console.log(combination);

  // 조합 인덱스를 바탕으로 유일성 검사
  let uniqueIndex = [];
  for (let i = 0; i < combination.length; i++) {
    let eachRows = [];
    for (let k = 0; k < uniqueLength; k++) {
      let eachCols = [];
      for (let j = 0; j < combination[i].length; j++) {
        eachCols.push(newRelation[combination[i][j]][k]);
      }
      eachRows.push(eachCols.join(''));
    }
    if (new Set(eachRows).size === uniqueLength) {
      uniqueIndex.push(combination[i]); // join된 문자열 말고 인덱스를 넣어야 함
    }
  }

  // 최소성 검사
  let index = 0;
  while (index < uniqueIndex.length - 1) {
    let current = uniqueIndex[index]; // 현재

    for (let i = index + 1; i < uniqueIndex.length; i++) {
      // 나머지를 순회하며 current 와 비교해서 최소성을 만족 못 하면 삭제
      let exist = current.every((element, index) => {
        return uniqueIndex[i].includes(element);
      });
      if (exist) {
        uniqueIndex.splice(i, 1);
        i -= 1;
      }
    }

    index += 1;
  }

  return uniqueIndex.length;
}

solution([
  ['100', 'ryan', 'music', '2'],
  ['200', 'apeach', 'math', '2'],
  ['300', 'tube', 'computer', '3'],
  ['400', 'con', 'computer', '4'],
  ['500', 'muzi', 'music', '3'],
  ['600', 'apeach', 'music', '2'],
]);

solution([
  ['a', '1', 'aaa', 'c', 'ng'],
  ['a', '1', 'bbb', 'e', 'g'],
  ['c', '1', 'aaa', 'd', 'ng'],
  ['d', '2', 'bbb', 'd', 'ng'],
]);
