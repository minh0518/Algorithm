function solution(cap, n, deliveries, pickups) {
  let distance = [];

  // 둘 다 빈 배열이 될 때까지 진행해야 함
  while (deliveries.length || pickups.length) {
    while (deliveries[deliveries.length - 1] === 0) {
      deliveries.pop();
    }
    while (pickups[pickups.length - 1] === 0) {
      pickups.pop();
    }

    distance.push(Math.max(deliveries.length, pickups.length));

    // 한 싸이클당 배달가능한 cap
    let capForDeliver = cap;

    // 한 싸이클당 픽업가능한 cap
    let capForPickup = cap;

    // deliveries배열의 길이가 없거나, 현재 들고있는 capForDeliver가 0일 때까지
    while (deliveries.length && capForDeliver) {
      let lastValue = deliveries[deliveries.length - 1];
      let afterDeliver = lastValue - capForDeliver;

      // 현재 가진 capForDeliver로 현재 위치를 모두 배달하고
      // 다음 위치도 배달이 가능한 경우
      if (afterDeliver < 0) {
        deliveries.pop(); // 현재 배달 구간은 0이 될 것이므로 제거
        capForDeliver = Math.abs(afterDeliver); // 차이값
      }

      // 현재 가진 capForDeliver로 딱 현재 위치까지만 전부 배달이 가능한 경우
      if (afterDeliver === 0) {
        deliveries.pop();
        capForDeliver = 0;
      }
      // 현재 가진 capForDeliver로 현재 위치의 모든 배달이 불가능한 경우
      if (afterDeliver > 0) {
        deliveries[deliveries.length - 1] = afterDeliver; // 현재 위치에서 최대한 배달이 가능한 갯수로 갱신
        capForDeliver = 0;
      }
    }

    //  배달과 동일
    while (pickups.length && capForPickup) {
      let lastValue = pickups[pickups.length - 1];
      let afterPickup = lastValue - capForPickup;
      if (afterPickup < 0) {
        pickups.pop();
        capForPickup = Math.abs(afterPickup);
      }
      if (afterPickup === 0) {
        pickups.pop();
        capForPickup = 0;
      }
      if (afterPickup > 0) {
        pickups[pickups.length - 1] = afterPickup;
        capForPickup = 0;
      }
    }
  }

  if (!distance.length) return 0;
  return distance.map((i) => i * 2).reduce((a, b) => a + b);
}
