function solution(k, dungeons) {
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

  return Math.max(...result);
}
