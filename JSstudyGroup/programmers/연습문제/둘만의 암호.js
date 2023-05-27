function solution(s, skip, index) {
  s = s.split('');
  let result = [];
  for (let i of s) {
    // console.log(i.charCodeAt(0));
    // console.log(String.fromCharCode(i.charCodeAt(0)));

    let count = 0;
    let currentASCII = i.charCodeAt(0);
    let nextStr;

    while (count !== index) {
      currentASCII += 1;
      if (currentASCII > 122) {
        currentASCII = 97;
      }
      nextStr = String.fromCharCode(currentASCII);
      if (skip.includes(nextStr)) continue;

      count += 1;
    }

    result.push(nextStr);
  }

  return result.join('');
}

solution('aukks', 'wbqd', 5);
