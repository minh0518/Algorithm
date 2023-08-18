function solution(brown, yellow) {
  if (yellow === 1) return [3, 3];
  if (yellow === 2) return [4, 3];

  const getDivisors = (num) => {
    const divisors = [];
    for (let i = 1; i <= Math.sqrt(num); i++) {
      if (num % i === 0) {
        divisors.push(i);
        if (num / i != i) divisors.push(num / i);
      }
    }
    return divisors;
  };

  const divisorArr = getDivisors(yellow);
  for (let rowLength of divisorArr) {
    let colsLength = yellow / rowLength;
    let brownLength = 2 * rowLength + 2 * colsLength + 4;
    if (brownLength === brown && rowLength <= colsLength) return [colsLength + 2, rowLength + 2];
  }
}
