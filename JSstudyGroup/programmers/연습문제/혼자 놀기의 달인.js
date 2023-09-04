const solution = (cards) => {
  const result = [];
  const visited = new Array(cards.length).fill(false);

  const dfs = (index, current) => {
    if (visited[index]) {
      result.push(current);
      return;
    }

    visited[index] = true;
    // 배열 인덱스이므로 실제 박스번호에서 -1
    dfs(cards[index] - 1, current + 1);
  };

  for (let i = 0; i < cards.length; i++) {
    if (!visited[i]) dfs(i, 0);
  }

  result.sort((a, b) => b - a);

  // 두번째 그룹이 없으면 0점이라 했으므로
  if (result.length < 2) return 0;

  return result[0] * result[1];
};
