function solution(key, lock) {
  const M = key.length;
  const N = lock.length;

  let zeroCount = 0;
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      if (lock[i][j] === 0) zeroCount += 1;
    }
  }

  const getRotateInfo = (keyArr) => {
    const ARRAY_LENGTH = M - 1;
    const rotate90 = new Array(M).fill(undefined).map(() => new Array(M).fill(0));
    const rotate180 = new Array(M).fill(undefined).map(() => new Array(M).fill(0));
    const rotate270 = new Array(M).fill(undefined).map(() => new Array(M).fill(0));

    for (let i = 0; i < M; i++) {
      for (let j = 0; j < M; j++) {
        const value = keyArr[i][j];
        if (value === 0) continue;

        const rowFor90 = j;
        const colFor90 = ARRAY_LENGTH - i;
        rotate90[rowFor90][colFor90] = 1;

        const rowFor180 = ARRAY_LENGTH - i;
        const colFor180 = ARRAY_LENGTH - j;
        rotate180[rowFor180][colFor180] = 1;

        const rowFor270 = ARRAY_LENGTH - j;
        const colFor270 = i;
        rotate270[rowFor270][colFor270] = 1;
      }
    }

    return [
      key
        .map((row) => row.join(''))
        .join('')
        .split(''),
      rotate90
        .map((row) => row.join(''))
        .join('')
        .split(''),
      rotate180
        .map((row) => row.join(''))
        .join('')
        .split(''),
      rotate270
        .map((row) => row.join(''))
        .join('')
        .split(''),
    ];
  };

  // key를 회전
  const [oirginKeyStr, rotate90Str, rotate180Str, rotate270Str] = getRotateInfo(key);

  // lock에 M-1만큼 범위를 추가
  for (let row of lock) {
    row.unshift(...new Array(M - 1).fill('x'));
    row.push(...new Array(M - 1).fill('x'));
  }
  let upCount = M - 1;
  while (upCount--) {
    lock.unshift(new Array(N + 2 * (M - 1)).fill('x'));
  }
  let downCount = M - 1;
  while (downCount--) {
    lock.push(new Array(N + 2 * (M - 1)).fill('x'));
  }

  for (let i = 0; i <= lock.length - M; i++) {
    for (let j = 0; j <= lock[0].length - M; j++) {
      // 현재 i,j기준으로 lock을 key의 크키게 맞게 slice
      const slicedLock = lock.slice(i, i + M).map((row) => row.slice(j, j + M));

      // 비교 연산을위해 1차원 배열로 수정
      const slicedLockStr = slicedLock
        .map((row) => row.join(''))
        .join('')
        .split('');

      // 현재 slice한 lock에 있는 홈 갯수와, lock의 전체 홈 갯수와 다르다면 비교할 필요가 없으므로 패스
      if (slicedLockStr.filter((i) => i === '0').length !== zeroCount) continue;

      // 원본 key, 90도, 180도, 270도 회전한 결과에 대해 비교 진행
      // 어차피 현재 비교하고 있는 slicedLockStr의 홈 갯수가 lock의 홈 갯수와 동일하므로 서로 다른 부분인지(홈과 돌기)만 확인하면 됨

      let originKeyResult = slicedLockStr.every((i, index) => {
        // x인 부분은 비교에서 제외, 서로 다른 부분일때(홈과 돌기)는 true를 반환
        if (i === 'x' || (i === '0' && oirginKeyStr[index] === '1') || (i === '1' && oirginKeyStr[index] === '0')) {
          return true;
        }
        if (i === oirginKeyStr[index]) {
          return false;
        }
      });

      let rotate90Result = slicedLockStr.every((i, index) => {
        if (i === 'x' || (i === '0' && rotate90Str[index] === '1') || (i === '1' && rotate90Str[index] === '0')) {
          return true;
        }
        if (i === rotate90Str[index]) {
          return false;
        }
      });

      let rotate180Result = slicedLockStr.every((i, index) => {
        if (i === 'x' || (i === '0' && rotate180Str[index] === '1') || (i === '1' && rotate180Str[index] === '0')) {
          return true;
        }
        if (i === rotate180Str[index]) {
          return false;
        }
      });

      let rotate270Result = slicedLockStr.every((i, index) => {
        if (i === 'x' || (i === '0' && rotate270Str[index] === '1') || (i === '1' && rotate270Str[index] === '0')) {
          return true;
        }
        if (i === rotate270Str[index]) {
          return false;
        }
      });

      if (originKeyResult || rotate90Result || rotate180Result || rotate270Result) return true;
    }
  }

  return false;
}
