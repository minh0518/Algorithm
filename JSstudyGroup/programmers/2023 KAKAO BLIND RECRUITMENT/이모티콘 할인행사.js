function solution(users, emoticons) {
  let rate = [10, 20, 30, 40];

  users.sort((a, b) => a[0] - b[0]);
  let min = users[0][0];
  let max = users[users.length - 1][0];

  rate = rate.filter((i) => {
    return i >= min; //상한선은 걸어두면 안됨
  });

  let rateResult = [];
  const dfs = (index, current) => {
    if (index === emoticons.length) {
      rateResult.push(JSON.parse(JSON.stringify(current)));
      return;
    }

    for (let i = 0; i < rate.length; i++) {
      let price = emoticons[index] - emoticons[index] * (rate[i] / 100);
      current.push([rate[i], emoticons[index], price]);
      dfs(index + 1, current);
      current.pop();
    }
  };

  dfs(0, []);

  let compareResult = [];

  for (let rateCases of rateResult) {
    let plus = 0;
    let revenue = 0;

    // rateCases의 예시
    // [
    //     [40,7000,4200],[30,9000,6300]
    // ]
    // 할인 비율에 대한 경우의 수 중 하나

    for (let i of users) {
      // 한 유저가 구매할 수 있는 경우의 수들만 추려냄
      let possible = rateCases.filter((cases) => {
        return cases[0] >= i[0];
      });

      let sum = possible.reduce((a, b) => a + b[2], 0);

      if (sum >= i[1]) {
        plus += 1;
      } else {
        revenue += sum;
      }
    }
    compareResult.push([plus, revenue]);
  }

  compareResult.sort((a, b) => {
    if (a[0] !== b[0]) {
      return b[0] - a[0];
    }
    if (a[0] === b[0]) {
      return b[1] - a[1];
    }
  });

  return compareResult[0];
}
