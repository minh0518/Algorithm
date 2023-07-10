function solution(storey) {
  let result = [];
  const dfs = (value, current, divideNum) => {
    // 500 === 1000
    if (String(divideNum).length === String(storey).length + 1) {
      // 500 >> 0
      result.push(Number(String(value)[0]) + current);
      //[0]은 가장 큰 단위의 값을 도출한다 (ex '500'[0] => 5)

      // 500 >> 1000 >> 0
      result.push(Number(String(divideNum - value)[0]) + current + 1); //마지막 +1은 1000에서 0으로 가는 경우

      return;
    }

    let rest = value % divideNum;
    // up
    // 423 , divideNum :10 , rest : 3 >> 430
    // (다음 재귀)430 , divideNum :100 , rest : 30 >> 500
    let gapForUp = divideNum - rest;
    dfs(value + gapForUp, current + Number(String(gapForUp)[0]), divideNum * 10);

    // down
    // 423 , divideNum :10 , rest : 3 >> 420
    // (다음 재귀)420 , divideNum :100 , rest : 20 >> 200
    dfs(value - rest, current + Number(String(rest)[0]), divideNum * 10);
  };

  let divideNum = 10;
  while (1) {
    if (storey % divideNum === 0) divideNum *= 10;
    else break;
  }
  // 423 >  divideNum :10
  // 420 >  divideNum :100
  dfs(storey, 0, divideNum);

  return Math.min(...result);
}
