// 24.2.9
function solution(users, emoticons) {
  const DISCOUNTS = [10, 20, 30, 40];

  const result = [];
  const calc = (discountsArr) => {
    const emoticonPrices = emoticons.map((value, index) => {
      return value - value * (discountsArr[index] / 100);
    });

    let totalPrice = 0;
    let totalEnroll = 0;
    for (let user of users) {
      const [rate, price] = user;

      let currentPrice = 0;
      for (let i = 0; i < discountsArr.length; i++) {
        if (discountsArr[i] >= rate) {
          currentPrice += emoticonPrices[i];
        }
      }
      if (currentPrice >= price) {
        totalEnroll += 1;
      }
      if (currentPrice < price) {
        totalPrice += currentPrice;
      }
    }

    result.push([totalEnroll, totalPrice]);
  };

  const dfs = (current) => {
    if (current.length === emoticons.length) {
      calc([...current]);
      return;
    }

    for (let i = 0; i < DISCOUNTS.length; i++) {
      current.push(DISCOUNTS[i]);
      dfs(current);
      current.pop();
    }
  };

  dfs([]);

  return result.sort((a, b) => {
    if (a[0] === b[0]) {
      return b[1] - a[1];
    }
    return b[0] - a[0];
  })[0];
}
