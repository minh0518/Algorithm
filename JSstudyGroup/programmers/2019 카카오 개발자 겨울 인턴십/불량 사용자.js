// 24.1.9
function solution(user_id, banned_id) {
  // 각 banned_id마다 매칭되는 user_id들을 전부 모아둔다
  const matchInfo = [];
  for (let i of banned_id) {
    matchInfo.push([]);
    const bannedArr = i.split('');

    for (let j of user_id) {
      const userArr = j.split('');
      if (bannedArr.length !== userArr.length) continue;
      let index = 0;

      while (index < bannedArr.length) {
        if (bannedArr[index] !== '*' && bannedArr[index] !== userArr[index]) break;
        index += 1;
      }

      if (index === bannedArr.length) {
        matchInfo[matchInfo.length - 1].push(j);
      }
    }
  }

  const answer = new Set();

  // 2차원 배열로 된 matchInfo에서 각 행마다 1개씩 가져와서
  // 중복되지 않은 순열을 구한다
  const dfs = (current, rowIndex) => {
    if (rowIndex === matchInfo.length) {
      answer.add([...current].sort().join(''));
      return;
    }

    for (let col = 0; col < matchInfo[rowIndex].length; col++) {
      const value = matchInfo[rowIndex][col];
      if (current.includes(value)) continue;
      current.push(value);
      dfs(current, rowIndex + 1);
      current.pop();
    }
  };

  dfs([], 0);

  return answer.size;
}
