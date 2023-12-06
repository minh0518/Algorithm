/*
 * @url https://school.programmers.co.kr/learn/courses/30/lessons/118667
 * @date 23-12-05
 */
function solution(queue1, queue2) {
  const oroginalLength = queue1.length;

  let queue1Sum = queue1.reduce((a, b) => a + b);
  let queue2Sum = queue2.reduce((a, b) => a + b);

  let count = 0;
  let queue1Start = 0;
  let queue2Start = 0;

  while (queue1Sum !== queue2Sum) {
    while (queue1Sum > queue2Sum) {
      const queue1FirstValue = queue1[queue1Start];
      queue2Sum += queue1FirstValue;
      queue2.push(queue1FirstValue);
      queue1Sum -= queue1FirstValue;
      queue1Start += 1;
      count += 1;
    }
    // 한쪽 큐가 전부 다른쪽으로 넘어갔을 경우
    if (queue1Start === oroginalLength * 2) {
      count = -1;
      break;
    }

    while (queue1Sum < queue2Sum) {
      const queue2FirstValue = queue2[queue2Start];
      queue1Sum += queue2FirstValue;
      queue1.push(queue2FirstValue);
      queue2Sum -= queue2FirstValue;
      queue2Start += 1;
      count += 1;
    }
    if (queue2Start === oroginalLength * 2) {
      count = -1;
      break;
    }
  }

  return count;
}
