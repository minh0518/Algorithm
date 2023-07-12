function solution(msg) {
  msg = msg.split('');

  // 해당 문자로 시작하는 값들을 담고 있는 Map객체 생성
  // 'A' => [ [ 'A', 1 ], [ 'AK', 28 ] ],
  const dictionary = new Map();
  for (let i = 65; i <= 90; i++) {
    dictionary.set(String.fromCharCode(i), [[String.fromCharCode(i), i - 64]]);
  }

  let nextIndex = 27;
  let result = [];

  for (let i = 0; i < msg.length; i++) {
    // Map객체에서 해당 알파벳으로 시작하는 값들을 가져옴
    // [ [ 'A', 1 ], [ 'AK', 28 ] ]
    let startWithArr = dictionary.get(msg[i]);

    // 일치하는 구간이 최대한 긴 것을 사용해야 하므로 뒤에서부터 탐색
    for (let j = startWithArr.length - 1; j >= 0; j--) {
      let dictionaryStr = startWithArr[j][0];
      let dictionaryIndex = startWithArr[j][1];

      // 일치한다면
      if (dictionaryStr === msg.slice(i, i + dictionaryStr.length).join('')) {
        result.push(dictionaryIndex);

        // 마지막 인덱스가 아니라면(=뒤에 문자가 하나라도 더 있다면)
        if (i !== msg.length - 1) {
          // 뒤에 있는 문자 하나를 더한 값과 인덱스를 추가 한 다음 Map객체 값 수정
          startWithArr.push([dictionaryStr + msg[i + dictionaryStr.length], nextIndex]);
          dictionary.set(msg[i], startWithArr);

          nextIndex += 1;
          i += dictionaryStr.length - 1; // 문자열 길이만큼 i를 이동
        }
        break;
      }
    }
  }

  return result;
}
