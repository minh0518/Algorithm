function solution(gems) {
  let sectionSize = new Set(gems).size;

  let result = [];

  if (sectionSize > 1) {
    let tmpMap = new Map();

    for (let i = 0; i < gems.length; i++) {
      // 기존에 존재하는게 있다면 제거 후 , 새로 추가
      // 그냥 set만 하면 인덱스만 갱신이 되겠지만
      // 직접 제거를 하고 새로 추가함으로써 순서까지 갱신이 되는 것이다
      tmpMap.delete(gems[i]);
      tmpMap.set(gems[i], i);

      if (tmpMap.size === sectionSize) {
        result.push([tmpMap.entries().next().value[1] + 1, i + 1]);
      }
    }

    result.sort((a, b) => {
      // 구간의 길이가 같다면 빨리 시작하는 것을 기준으로
      if (a[1] - a[0] === b[1] - b[0]) {
        return a[0] - b[0];
      }
      if (a[1] - a[0] !== b[1] - b[0]) {
        return a[1] - a[0] - (b[1] - b[0]);
      }
    });

    return result[0];
  }
  if (sectionSize === 1) {
    return [1, 1];
  }
}

solution(['DIA', 'RUBY', 'RUBY', 'DIA', 'DIA', 'EMERALD', 'SAPPHIRE', 'DIA']);
solution(['AA', 'AB', 'AC', 'AA', 'AC']);
solution(['XYZ', 'XYZ', 'XYZ']);
solution(['ZZZ', 'YYY', 'NNNN', 'YYY', 'BBB']);
solution(['a', 'b', 'b', 'b', 'c', 'd', 'd', 'd', 'd', 'd', 'd', 'd', 'b', 'c', 'a']);
