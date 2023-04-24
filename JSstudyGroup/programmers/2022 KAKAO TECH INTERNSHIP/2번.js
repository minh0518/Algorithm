function solution(queue1, queue2) {
  let originLength = queue1.length;
  let pointOne = 0;
  let pointTwo = 0;
  let sumOne = queue1.reduce((a, b) => a + b, 0);
  let sumTwo = queue2.reduce((a, b) => a + b, 0);

  let count = 0;

  if (sumOne === sumTwo) {
    return 0;
  }
  while (1) {
    if (pointOne === originLength * 2 || pointTwo === originLength * 2) {
      count = -1;
      break;
    }
    if (sumOne === sumTwo) {
      break;
    }

    if (sumOne > sumTwo) {
      sumTwo += queue1[pointOne];
      sumOne -= queue1[pointOne];
      queue2.push(queue1[pointOne]);
      pointOne += 1;
      count += 1;
      continue;
    }
    if (sumOne < sumTwo) {
      sumOne += queue2[pointTwo];
      sumTwo -= queue2[pointTwo];
      queue1.push(queue2[pointTwo]);
      pointTwo += 1;
      count += 1;
      continue;
    }
  }

  console.log(count);
  return count;
}

solution([3, 2, 7, 2], [4, 6, 5, 1]);
solution([1, 2, 1, 2], [1, 10, 1, 2]);
solution([1, 1], [1, 5]);
solution([2, 2], [3, 2]);
