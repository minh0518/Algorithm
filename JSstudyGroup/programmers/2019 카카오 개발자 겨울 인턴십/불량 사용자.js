function solution(user_id, banned_id) {
  let info = [];
  for (let i of banned_id) {
    let currentCompareId = i.split('');
    info.push([]);

    for (let j = 0; j < user_id.length; j++) {
      let target = user_id[j].split('');

      if (target.length !== currentCompareId.length) continue;

      let index = 0;
      while (index !== target.length) {
        if (!(currentCompareId[index] === '*' || target[index] === currentCompareId[index])) break;
        index += 1;
      }

      // while문을 다 돌았다면 그건 일치한다는 것을 의미
      if (index === target.length) {
        for (let k of info) {
        }
        info[info.length - 1].push(user_id[j]);
      }
    }
  }

  // console.log(info);

  let result = new Set();

  // 백트래킹
  const dfs = (index, currnet) => {
    if (currnet.length === info.length) {
      let sortedCurrent = [...currnet].sort();
      result.add(sortedCurrent.join('')); // 중복 제거를 위해 join한 값을 넘겨줌
      return;
    }

    // (index로 넘겨주는 값은 행을 의미한다)
    // 여기서 , index로 주어진 행만 탐색해야 하며 그 행은 0부터 끝까지 탐색
    for (let i = 0; i < info[index].length; i++) {
      if (currnet.includes(info[index][i])) continue;
      currnet.push(info[index][i]);
      dfs(index + 1, currnet);
      currnet.pop();
    }
  };

  dfs(0, []);
  console.log(result.size);
  return result.size;
}

solution(['frodo', 'fradi', 'crodo', 'abc123', 'frodoc'], ['fr*d*', 'abc1**']);
solution(['frodo', 'fradi', 'crodo', 'abc123', 'frodoc'], ['*rodo', '*rodo', '******']);
solution(['frodo', 'fradi', 'crodo', 'abc123', 'frodoc'], ['fr*d*', '*rodo', '******', '******']);
