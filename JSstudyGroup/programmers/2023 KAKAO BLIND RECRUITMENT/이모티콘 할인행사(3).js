/*
 * @url https://school.programmers.co.kr/learn/courses/30/lessons/150368
 * @date 23-11-23
 */

function solution(users, emoticons) {
  const DISCOUNT_RATES = [10, 20, 30, 40];

  // 각 할인율 경우에 따른 계산
  const calcResult = (discountArr) => {
    // 할인율이 적용된 이모티콘 가격들
    const discountedPriceArr = [...emoticons].map((i, index) => {
      const currentDiscount = discountArr[index];
      return i - i * (currentDiscount / 100);
    });

    let totalPrice = 0;
    let totalEnroll = 0;

    // 각 유저 배열을 순회하며 discountedPriceArr 에 대한
    // 결과 도출
    for (let i = 0; i < users.length; i++) {
      const [percent, price] = users[i];

      let buyListPrice = 0;
      let isEnroll = false;

      for (let j = 0; j < discountArr.length; j++) {
        if (percent <= discountArr[j]) {
          buyListPrice += discountedPriceArr[j];
        }
        if (buyListPrice >= price) {
          isEnroll = true;
        }
      }

      if (isEnroll) {
        totalEnroll += 1;
      }
      if (!isEnroll) {
        totalPrice += buyListPrice;
      }
    }

    return [totalEnroll, totalPrice];
  };

  let result = [];

  // 백트래킹
  const dfs = (current) => {
    if (current.length === emoticons.length) {
      result.push(calcResult(current));
      return;
    }

    for (let i = 0; i < DISCOUNT_RATES.length; i++) {
      current.push(DISCOUNT_RATES[i]);
      dfs(current);
      current.pop();
    }
  };

  dfs([]);

  return result.sort((a, b) => {
    if (a[0] === b[0]) return b[1] - a[1];
    return b[0] - a[0];
  })[0];
}
