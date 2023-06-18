function solution(users, emoticons) {
  const discountRates = [10, 20, 30, 40];

  const everyDiscount = [];

  const dfs = (index, current) => {
    if (current.length === emoticons.length) {
      everyDiscount.push(JSON.parse(JSON.stringify(current)));
      return;
    }

    // 할인률은 반복될 수 있으므로 i를 0부터
    for (let i = 0; i < discountRates.length; i++) {
      current.push(discountRates[i]);
      dfs(index + 1, current);
      current.pop();
    }
  };

  dfs(0, []);

  let result = [];

  // 할인률 전체 배열을 순회
  for (let i = 0; i < everyDiscount.length; i++) {
    // 각 할인률에 따른 총 수익 및 이모티콘 플러스 구독 결과
    let enrollCount = 0;
    let purchase = 0;

    // 각 유저를 순회
    for (let j = 0; j < users.length; j++) {
      let purchasePrice = [];

      let userPurchaseRate = users[j][0];
      let userEnrollPrice = users[j][1];

      // 각 유저를 대상으로 할인률을 적용
      for (let k = 0; k < everyDiscount[i].length; k++) {
        // 구매가능한 경우
        if (userPurchaseRate <= everyDiscount[i][k]) {
          let price = emoticons[k] - emoticons[k] * (everyDiscount[i][k] / 100);
          purchasePrice.push(price);
        }
      }

      // 각 유저가 구매한 금액에 따라 구독한다면 enrollCount를 +1
      // 구독하지 않는다면 구매한 금액만큼 purchase에 더하기
      let total;
      purchasePrice.length ? (total = purchasePrice.reduce((a, b) => a + b)) : (total = 0);

      if (total >= userEnrollPrice) {
        enrollCount += 1;
      } else {
        purchase += total;
      }
    }

    // 각 할인률에 따른 총 수익 및 이모티콘 플러스 구독 결과를 result배열에 push
    result.push([enrollCount, purchase]);
  }

  result.sort((a, b) => {
    if (a[0] === b[0]) {
      return b[1] - a[1];
    }
    return b[0] - a[0];
  });

  return result[0];
}
