function solution(numbers) {
  numbers.sort((a, b) => {
    let abString = String(a) + String(b);
    let baString = String(b) + String(a);
    return Number(baString) - Number(abString);
  });

  // 가장 앞자리가 0이면 === 가장 큰 수가 0 === 0으로만 이루어진 수
  // 그러므로 0000... 이 아닌 0만 리턴
  if (numbers[0] === 0) return '0';

  return numbers.join('');
}
