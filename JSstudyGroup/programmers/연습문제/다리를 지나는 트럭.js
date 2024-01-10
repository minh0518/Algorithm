function solution(bridge_length, weight, truck_weights) {
  let bridge = [];
  let count = 0;

  // 대기 트럭 배열이 전부 빌 때까지 진행
  while (truck_weights.length) {
    // 1초마다 진행되는 상황에 대한 로직 진행

    // 현재 다리가 전부 찼다면, 마지막에 있는 값을 빼기
    if (bridge.length === bridge_length) {
      bridge.shift();
    }

    const currentTruck = truck_weights[0];
    const currentBrideWeight = bridge.reduce((a, b) => a + b, 0);
    // 현재 다리의 무게 합 + 현재 건너려고 하는 트럭 <= 다리의 최대하중
    // 이라면 트럭을 다리로 이동
    if (currentBrideWeight + currentTruck <= weight) {
      bridge.push(currentTruck);
      truck_weights.shift();
    }
    // 그게 아니라면 다리에 0을 넣어줌 (빈 값을 다리에 넣어서 bridge.length가
    // 트럭이 없는 비어있는 값을 반영할 수 있게 하기 위함)
    if (currentBrideWeight + currentTruck > weight) {
      bridge.push(0);
    }

    count += 1;
  }

  // 마지막 트럭이 나가는 시간까지 계산
  return count + bridge_length;
}
