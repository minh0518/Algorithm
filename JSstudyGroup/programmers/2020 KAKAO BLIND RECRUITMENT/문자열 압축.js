function solution(s) {
  let result = [];
  s = s.split('');

  // 끊는 갯수
  for (let count = 1; count <= s.length; count++) {
    let sameInfo = {}; // 중복되는 문자열의 갯수를 담는 객체
    let totalCount = 0;
    let slicedStr = [];
    for (let i = 0; i < s.length; i++) {
      let str;

      if (i + count >= s.length) {
        // 현재 위치부터 count길이가 문자열을 벗어나는 경우 남은 구간을 전부 slice
        str = s.slice(i).join('');
      }
      if (i + count < s.length) {
        // count길이만큼 문자열을 slice
        str = s.slice(i, i + count).join('');
      }

      if (slicedStr[slicedStr.length - 1] === str) {
        sameInfo[str] ? (sameInfo[str] += 1) : (sameInfo[str] = 2);
      } else {
        for (let key in sameInfo) {
          let existStr = sameInfo[key] + '';
          totalCount += existStr.length;
          sameInfo = {};
        }
        slicedStr.push(str);
        totalCount += str.length;
      }
      // 다음 slice 구간의 시작 인덱스로 이동 (for문때문에 ++가 되므로 -1)
      i += count - 1;
    }

    // 남은 sameInfo의 값들을 전부 추가
    for (let i in sameInfo) {
      let sameCount = sameInfo[i] + '';
      totalCount += sameCount.length;
    }
    result.push(totalCount);
  }

  console.log(Math.min(...result));
  return Math.min(...result);
}
