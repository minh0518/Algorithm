function solution(coin, cards) {
  const maxValue = Math.max(...cards);
  const N = cards.length;
  const startIndex = N / 3 - 1; // 처음 가지는 카드들의 마지막 인덱스
  const TARGET = N + 1; // 목표 점수

  const originNumbers = cards.slice(0, startIndex + 1);

  // 처음 가지는 카드에 대한 방문배열
  const originVisited = new Array(maxValue + 1).fill(false);
  for (let i = 0; i <= startIndex; i++) {
    originVisited[cards[i]] = true;
  }

  // 각 턴마다 추가로 가지는 카드에 대한 방문배열
  const restVisited = new Array(maxValue + 1).fill(false);

  let count = 1; // 라운드 수
  let currentIndex = startIndex + 2; // 매 라운드마다 증가하는 카드 인덱스

  // 첫번째 케이스 확인
  // 처음 가지는 카드들로만 N+1 가능한지 확인
  const first = (originNumbers, originVisited) => {
    for (const value of originNumbers) {
      if (originVisited[value] && originVisited[TARGET - value]) {
        originVisited[value] = false;
        originVisited[TARGET - value] = false;
        return true;
      }
    }
    return false;
  };

  // 두번째 케이스 확인
  // 처음 가지는 카드 1개, 새로 얻은 카드1개로 N+1 가능한지 확인
  const second = (currentIndex, originVisited, restVisited) => {
    const possibleCards = cards.slice(startIndex + 1, currentIndex + 1);

    for (let value of possibleCards) {
      if (restVisited[value] && originVisited[TARGET - value]) {
        restVisited[value] = false;
        originVisited[TARGET - value] = false;
        return true;
      }
    }
    return false;
  };

  // 세번째 케이스 확인
  //새로 얻은 카드들로만 N+1 가능한지 확인
  const third = (currentIndex, restVisited) => {
    const possibleCards = cards.slice(startIndex + 1, currentIndex + 1);
    for (let value of possibleCards) {
      if (restVisited[value] && restVisited[TARGET - value]) {
        restVisited[value] = false;
        restVisited[TARGET - value] = false;
        return true;
      }
    }
    return false;
  };

  while (currentIndex < N && coin >= 0) {
    // 새로 얻은 2장의 카드 방문처리
    restVisited[cards[currentIndex - 1]] = true;
    restVisited[cards[currentIndex]] = true;

    const firstResult = first(originNumbers, originVisited);

    if (firstResult) {
      currentIndex += 2;
      count += 1;
      continue;
    }
    if (coin <= 0) break;

    const secondResult = second(currentIndex, originVisited, restVisited);

    if (secondResult) {
      coin -= 1;
      currentIndex += 2;
      count += 1;
      continue;
    }
    if (coin <= 1) break;

    const thirdResult = third(currentIndex, restVisited);

    if (thirdResult) {
      coin -= 2;
      currentIndex += 2;
      count += 1;
      continue;
    }

    break;
  }

  return count;
}
