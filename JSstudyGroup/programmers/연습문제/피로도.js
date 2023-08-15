function solution(k, dungeons) {
  // 순열
  const permutation = [];
  const dfs = (current) => {
    if (current.length === dungeons.length) {
      permutation.push(current.join(''));
      return;
    }

    for (let i = 0; i < dungeons.length; i++) {
      if (current.includes(i)) continue;
      current.push(i);
      dfs(current);
      current.pop();
    }
  };

  dfs([]);

  // 순열을 기반으로 한 경우의 수들에 대해 연산을 진행
  const result = [];
  for (let i of permutation) {
    const order = i.split('').map(Number);

    let copyK = k;
    let count = 0;
    for (let j of order) {
      if (copyK < dungeons[j][0]) break;
      count += 1;
      copyK -= dungeons[j][1];
    }
    result.push(count);
  }

  // 최댓값 반환
  return Math.max(...result);
}
