function solution(keymap, targets) {
  const findStr = (targetStr) => {
    let result = [];
    for (let i of keymap) {
      for (let j = 0; j < i.length; j++) {
        if (i[j] === targetStr) {
          result.push(j + 1);
          break; // 더이상 볼 필요 없으므로 break (가장 앞에 나온 값을 써야 함)
        }
      }
    }
    if (!result.length) return -1;
    return Math.min(...result); // keymap으로부터 나온 값들 중 최솟값 도출
  };

  let result = [];
  for (let i = 0; i < targets.length; i++) {
    let sum = 0;
    for (let j = 0; j < targets[i].length; j++) {
      let targetStr = targets[i][j];

      let findValue = findStr(targetStr);

      // 해당 문자를 입력할 수 없으면
      // 그 문자열 전체를 입력할 수 없으므로 -1이 push 돼야 함
      if (findValue === -1) {
        sum = -1;
        break;
      }

      // 문자열의 각 문자들의 횟수들을 누적
      if (findValue !== -1) sum += findStr(targetStr);
    }
    result.push(sum);
  }
  return result;
}
