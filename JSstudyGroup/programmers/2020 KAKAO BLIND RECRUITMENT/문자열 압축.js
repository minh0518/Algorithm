function solution(s) {
  let result = [];
  s = s.split('');

  for (let count = 1; count <= s.length; count++) {
    let sameInfo = {};
    let totalCount = 0;
    let slicedStr = [];
    for (let i = 0; i < s.length; i++) {
      let str;
      if (i + count >= s.length) {
        str = s.slice(i).join('');
      }
      if (i + count < s.length) {
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
      i += count - 1;
    }

    for (let i in sameInfo) {
      let sameCount = sameInfo[i] + '';
      totalCount += sameCount.length;
    }
    result.push(totalCount);
  }

  console.log(Math.min(...result));
  return Math.min(...result);
}
