const solution = (stones, k) => {
  let left = 1;
  let right = 200000000;

  while (left <= right) {
    let mid = parseInt((left + right) / 2);
    let count = 0;
    let copyStones = [...stones];
    for (let i = 0; i < copyStones.length; i++) {
      // 뺄셈을 한 결과를 다시 사용하는게 아니라
      // 그 자리에서 삼항연산자로 바로 비교
      copyStones[i] - mid <= 0 ? (count += 1) : (count = 0);

      if (count === k) {
        right = mid - 1;
        break;
      }
    }

    if (count !== k) {
      left = mid + 1;
    }
  }

  return left;
};
