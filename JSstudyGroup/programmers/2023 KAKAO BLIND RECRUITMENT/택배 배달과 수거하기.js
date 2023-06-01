function solution(cap, n, deliveries, pickups) {
  let result = 0;

  // while문에 !가 있으면 그게 종료조건
  // 즉 , 둘다 길이가 0이 되면 while문을 탈출
  while (!(deliveries.length === 0 && pickups.length === 0)) {
    while (deliveries.length && !deliveries[deliveries.length - 1]) {
      deliveries.pop();
    }
    while (pickups.length && !pickups[pickups.length - 1]) {
      pickups.pop();
    }

    result += Math.max(deliveries.length, pickups.length) * 2;

    // 배달
    let currentDelivery = 0;
    while (deliveries.length) {
      let singleHouseDelivery = deliveries.pop();
      let total = currentDelivery + singleHouseDelivery;
      if (total <= cap) {
        // 같을때도 포함한다
        // (같다면 다음 while문에서 total > cap 에 걸리더라도 아무 뺄셈없이 그대로 다시 추가가 되므로)
        currentDelivery = total;
      }
      if (total > cap) {
        currentDelivery = total - cap; // 배달 가능한 만큼만
        deliveries.push(currentDelivery);
        break;
      }
    }

    // 수거 (배달 로직과 동일)
    let currentPickup = 0;
    while (pickups.length) {
      let singleHousePickup = pickups.pop();
      let total = currentPickup + singleHousePickup;
      if (total <= cap) {
        currentPickup = total;
      }
      if (total > cap) {
        currentPickup = total - cap;
        pickups.push(currentPickup);
        break;
      }
    }
  }

  return result;
}

solution(4, 5, [1, 0, 3, 1, 2], [0, 3, 0, 4, 0]);
solution(2, 7, [1, 0, 2, 0, 1, 0, 2], [0, 2, 0, 1, 0, 2, 0]);
