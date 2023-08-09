function solution(arr) {
  const checkSame = (arr) => {
    const firstValue = arr[0][0];
    for (let i of arr) {
      if (new Set(i).size !== 1 || i[0] !== firstValue) return false;
    }

    return true;
  };

  const compression = [];

  const dfs = (arr) => {
    if (arr.length === 1 || checkSame(arr)) {
      compression.push(arr[0][0]);
      return;
    }

    let cutIndex = arr.length / 2;

    // 1사분면
    const first = arr
      .map((i) => {
        return i.slice(0, cutIndex);
      })
      .slice(0, cutIndex);

    // 2사분면
    const second = arr
      .map((i) => {
        return i.slice(cutIndex);
      })
      .slice(0, cutIndex);

    // 3사분면
    const third = arr
      .map((i) => {
        return i.slice(0, cutIndex);
      })
      .slice(cutIndex);

    // 4사분면
    const forth = arr
      .map((i) => {
        return i.slice(cutIndex);
      })
      .slice(cutIndex);

    dfs(first);
    dfs(second);
    dfs(third);
    dfs(forth);
  };

  dfs(arr);

  const result = compression.reduce(
    (a, b) => {
      if (b === 0) return [a[0] + 1, a[1]];
      if (b === 1) return [a[0], a[1] + 1];
    },
    [0, 0],
  );

  return result;
}
