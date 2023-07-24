function solution(name) {
  name = name.split('');

  let asciiName = name.map((i) => {
    return i.charCodeAt(0);
  });

  // 65~90
  const arr = new Array(name.length).fill(65);

  // 위 or 아래 중 최솟값 입력
  let upAndDownCountArr = [];
  for (let i = 0; i < arr.length; i++) {
    let up = asciiName[i] - arr[i];
    let down = 90 - asciiName[i] + 1;
    upAndDownCountArr.push(Math.min(up, down));
  }

  let minMove = name.length - 1;
  for (let i = 0; i < name.length; i++) {
    let nextIndex = i + 1; // 다음 인덱스

    if (name[nextIndex] === 'A') {
      while (nextIndex < name.length && name[nextIndex] === 'A') {
        nextIndex += 1;
      }

      minMove = Math.min(i * 2 + name.length - nextIndex, i + 2 * (name.length - nextIndex), minMove);
    }
  }

  return minMove + upAndDownCountArr.reduce((a, b) => a + b);
}
