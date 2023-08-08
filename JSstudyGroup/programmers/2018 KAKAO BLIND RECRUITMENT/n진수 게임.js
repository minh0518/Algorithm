function solution(n, t, m, p) {
  let result = [];

  let str = '';

  let number = 0;

  // t개까지 구할 수 있는 범위까지의 문자열을 구함
  while (str.length < m * t) {
    str += number.toString(n).toUpperCase();
    number += 1;
  }

  // 정답 추가
  let index = 0;
  while (result.length !== t) {
    let slicedStr = str.slice(index, index + m);

    result.push(slicedStr[p - 1]);
    index += m;
  }

  return result.join('');
}
