function solution(s) {
  s = s.split('');
  let target = s[0];
  let sameCount = 1; // 자기 자신 갯수는 카운트하고 들어가야 함
  let diffCount = 0;
  let result = 0;

  for (let i = 1; i < s.length; i++) {
    let str = s[i];
    target === '' ? (target = str) : '';
    target === str ? (sameCount += 1) : (diffCount += 1);

    if (sameCount === diffCount) {
      target = ''; // 다음 for문에서 target을 변경하기 위해
      sameCount = 0; // 다음 for문에서 target이 변경되면 자동으로 sameCount += 1가 될 것이므로 0으로
      diffCount = 0;
      result += 1;
      continue;
    }
    if (sameCount !== diffCount && i === s.length - 1) {
      result += 1;
    }
  }
  return s.length === 1 ? 1 : result;
}
