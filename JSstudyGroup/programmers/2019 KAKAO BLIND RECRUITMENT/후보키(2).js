function solution(relation) {
  const uniqueLength = relation.length;

  const relation2 = [];

  for (let i = 0; i < relation[0].length; i++) {
    relation2.push([]);
    for (let j = 0; j < relation.length; j++) {
      relation2[relation2.length - 1].push(relation[j][i]);
    }
  }

  console.log(relation2);
  console.log(relation);

  const checkUniqueness = (indexArr) => {
    let newTuple = [];

    for (let i = 0; i < relation2[0].length; i++) {
      let value = '';
      for (let j of indexArr) {
        value += relation2[j][i];
      }
      newTuple.push(value);
    }

    if (new Set(newTuple).size === uniqueLength) return true;
    if (new Set(newTuple).size !== uniqueLength) return false;
  };

  const indexForCheck = [];
  const dfs = (index, depth, n, current) => {
    if (depth === n) {
      indexForCheck.push(JSON.parse(JSON.stringify(current)));
      return;
    }

    for (let i = index; i < relation[0].length; i++) {
      current.push(i);
      dfs(i + 1, depth + 1, n, current);
      current.pop();
    }
  };

  for (let i = 1; i <= relation[0].length; i++) {
    dfs(0, 0, i, []);
  }

  console.log(indexForCheck);

  const uniqueIndex = indexForCheck.filter((i) => checkUniqueness(i));

  console.log(uniqueIndex);

  for (let i = 0; i < uniqueIndex.length; i++) {
    let target = uniqueIndex[i];
    for (let j = i + 1; j < uniqueIndex.length; j++) {
      let result = target.every((i) => {
        return uniqueIndex[j].includes(i);
      });
      if (result) {
        uniqueIndex.splice(j, 1);
        j -= 1;
      }
    }
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
