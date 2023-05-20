const solution = (str1, str2) => {
  str1 = str1.toLowerCase();
  str2 = str2.toLowerCase();

  let firstPair = [];
  let secondPair = [];

  // 알파벳 제외
  for (let i = 0; i < str1.length - 1; i++) {
    let pair = str1.slice(i, i + 2);
    if (pair[0].charCodeAt(0) < 97 || pair[0].charCodeAt(0) > 122 || pair[1].charCodeAt(0) < 97 || pair[1].charCodeAt(0) > 122) {
      continue;
    }

    firstPair.push(pair);
  }

  for (let i = 0; i < str2.length - 1; i++) {
    let pair = str2.slice(i, i + 2);
    if (pair[0].charCodeAt(0) < 97 || pair[0].charCodeAt(0) > 122 || pair[1].charCodeAt(0) < 97 || pair[1].charCodeAt(0) > 122) {
      continue;
    }
    secondPair.push(pair);
  }

  // 둘 다 공집합이라면 자카드 유사도가 1이므로 65536 리턴
  if (firstPair.length === 0 && secondPair.length === 0) {
    return 65536;
  }

  firstPair.sort();
  secondPair.sort();

  let union = [];
  let intersection = [];
  for (let i = 0; i < firstPair.length; i++) {
    let target = firstPair[i];
    let firstPairsame = [firstPair[i]];
    let secondPairSame = [];
    while (++i < firstPair.length) {
      if (firstPair[i] !== target) break;
      firstPairsame.push(firstPair[i]);
    }

    for (let j = 0; j < secondPair.length; j++) {
      if (secondPair[j] === target) {
        secondPairSame.push(secondPair[j]);
        while (++j < secondPair.length) {
          if (secondPair[j] !== target) break;
          secondPairSame.push(secondPair[j]);
        }
      }
    }

    if (secondPairSame.length === 0) {
      i -= 1; // while문에서 같은 값이 나오지 않는 인덱스까지
      // i를 +1을 했으므로 다음 for문에서(= i++가 됨) 같은 값이 나오지 않는
      // 위치부터 시작하려면 -1을 해야 함
      continue;
    }

    // 길이를 기준으로 합집합 , 교집합에 push
    if (firstPairsame.length > secondPairSame.length) {
      union.push(...firstPairsame);
      intersection.push(...secondPairSame);
    }
    if (firstPairsame.length < secondPairSame.length) {
      union.push(...secondPairSame);
      intersection.push(...firstPairsame);
    }
    if (firstPairsame.length === secondPairSame.length) {
      union.push(...firstPairsame);
      intersection.push(...firstPairsame);
    }
    i -= 1; // 위의 설명과 동일
  }

  // let set = new Set([...firstPair, ...secondPair]);

  // for (let i of set) {
  //   if (!union.includes(i)) union.push(i);
  // }

  for (let i of firstPair.concat(secondPair)) {
    if (!intersection.includes(i)) union.push(i);
  }

  const J = intersection.length / union.length;

  return Math.floor(J * 65536);
};

solution('FRANCE', 'french');
solution('handshake', 'shake hands');
solution('aa1+aa2', 'AAAA12');
solution('E=M*C^2', 'e=m*c^2');
solution('aaaxx', 'bbbxx');

// A = {1, 2, 3},  B = {2, 3, 4}
// A ∩ B = {2, 3}, A ∪ B = {1, 2, 3, 4}

// A = {1, 1, 2, 2, 3},  B = {1, 2, 2, 4, 5}
// A ∩ B = {1, 2, 2}, A ∪ B = {1, 1, 2, 2, 3, 4, 5}
