function solution(sequence) {
  const getSequenceArr = (arr, target) => {
    return arr.map((i, index) => {
      if (index % 2 === 0) {
        return i * target;
      }
      if (index % 2 === 1) {
        return i * -1 * target;
      }
    });
  };

  const arr1 = getSequenceArr(sequence, 1);
  const arr2 = getSequenceArr(sequence, -1);

  // 각 배열의 누적값을 담는 배열
  let sumArr1 = 0;
  let sumArr2 = 0;

  // 각 배열의 누적값 중, 최댓값
  let maxArr1 = 0; // 누적합의 시작은 0이므로 0부터
  let maxArr2 = 0;

  // 각 배열의 누적값 중, 최솟값
  let minArr1 = 0; // 누적합의 시작은 0이므로 0부터
  let minArr2 = 0;

  let result;
  for (let i = 0; i < sequence.length; i++) {
    // 누적값 계산
    sumArr1 += arr1[i];
    sumArr2 += arr2[i];

    // 최댓값 도출
    maxArr1 = Math.max(maxArr1, sumArr1);
    maxArr2 = Math.max(maxArr2, sumArr2);

    // 최솟값 도출
    minArr1 = Math.min(minArr1, sumArr1);
    minArr2 = Math.min(minArr2, sumArr2);

    // 결과 계산
    result = Math.max(maxArr1 - minArr1, maxArr2 - minArr2);
  }

  return result;
}
