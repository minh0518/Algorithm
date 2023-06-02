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
        // 문자열이 *도 아니고 서로 같지도 않는 것이라면 (|| 이므로 둘 다 false여야 false) break
        // 다만 문자열이 *라면 3두번째 조건은 진행하지도 않고 바로 true 넘어감
        if (!(currentCompareId[index] === '*' || target[index] === currentCompareId[index])) break;
        index += 1;
      }

      // while문을 다 돌았다면 그건 위의 while문에서 break 되지 않아서
      // banned_id에 일치한다는 것
      if (index === target.length) {
        info[info.length - 1].push(user_id[j]);
      }
    }
  }

  // console.log(info);

  let result = new Set();

  const dfs = (index, currnet) => {
    if (currnet.length === info.length) {
      let sortedCurrent = [...currnet].sort(); // set에 넣어서 중복 제거하기 위해 sort()
      result.add(sortedCurrent.join('')); // set에서 중복 값이 문자열로 비교돼야 하므로 join
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

  dfs(0, []); // 시작 행 , 누적 값을 담는 배열
  console.log(result.size);
  return result.size;
}

solution(['frodo', 'fradi', 'crodo', 'abc123', 'frodoc'], ['fr*d*', 'abc1**']);
solution(['frodo', 'fradi', 'crodo', 'abc123', 'frodoc'], ['*rodo', '*rodo', '******']);
solution(['frodo', 'fradi', 'crodo', 'abc123', 'frodoc'], ['fr*d*', '*rodo', '******', '******']);
