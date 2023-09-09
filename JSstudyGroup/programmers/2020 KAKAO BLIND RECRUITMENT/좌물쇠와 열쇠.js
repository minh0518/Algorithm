function solution(key, lock) {
  // lock 배열에서 1이 있는 좌표를 받아서 이걸 기반으로
  // 회전한 사각형을 반환 하는 함수
  // 회전된 좌표를 반환하는게 아니라, 회전환 사각형을 반환해야 한다
  const getRotate = (oneCordStartZero, rectRow, rectCol) => {
    const origin = new Array(rectRow).fill().map(() => new Array(rectCol).fill(0));
    for (let i of oneCordStartZero) {
      const [x, y] = i;
      origin[x][y] = 1;
    }

    const rotate90 = new Array(rectCol).fill().map(() => new Array(rectRow).fill(0));
    for (let i of oneCordStartZero) {
      const [x, y] = i;
      const resultX = y;
      const resultY = rectRow - 1 - x;
      rotate90[resultX][resultY] = 1;
    }

    const rotate180 = new Array(rectRow).fill().map(() => new Array(rectCol).fill(0));
    for (let i of oneCordStartZero) {
      const [x, y] = i;
      const resultX = rectRow - 1 - x;
      const resultY = rectCol - 1 - y;
      rotate180[resultX][resultY] = 1;
    }

    const rotate270 = new Array(rectCol).fill().map(() => new Array(rectRow).fill(0));
    for (let i of oneCordStartZero) {
      const [x, y] = i;
      const resultX = rectCol - 1 - y;
      const resultY = x;
      rotate270[resultX][resultY] = 1;
    }

    return [origin, rotate90, rotate180, rotate270];
  };

  // 2차원 배열을 하나의 문자열로 변환
  const getArrtoString = (arr) => {
    return arr.map((i) => i.join('')).join('');
  };

  // 만약 모든 lock이 1이라면 true를 반환
  const set = new Set(getArrtoString(lock).split('').map(Number));
  if (set.size === 1 && set.has(1)) return true;

  // 로직 시작
  // 편의를 위해 사전에 lock 배열에서 0->1 , 1->0 형태로 변경 (=추후 key와 값이 같은 형태로 비교하기 위해)
  // 이제 lock의 홈은 0이 아닌 1
  lock = lock.map((i) => {
    return i.map((j) => {
      if (j === 0) return 1;
      if (j === 1) return 0;
    });
  });

  const lockRow = lock.length;
  const lockCol = lock[0].length;

  // lock의 1 좌표
  const oneCord = [];
  for (let i = 0; i < lockRow; i++) {
    for (let j = 0; j < lockCol; j++) {
      let value = lock[i][j];
      if (value === 1) oneCord.push([i, j]);
    }
  }

  // oneCord의 최소행,최대행,최소열,최대열 을 각각 구해서
  // 전체 크기를 구함
  oneCord.sort((a, b) => a[0] - b[0]);
  const firstRow = oneCord[0][0];
  const lastRow = oneCord[oneCord.length - 1][0];

  oneCord.sort((a, b) => a[1] - b[1]);
  const firstCol = oneCord[0][1];
  const lastCol = oneCord[oneCord.length - 1][1];

  // lock에서 1이 포함된 영역의 전체 크기
  const rectRow = lastRow - firstRow + 1;
  const rectCol = lastCol - firstCol + 1;

  // lock에서 1이 포함된 영역의 좌표를 [0,0] 기준으로 변경한
  // oneCordStartZero 생성
  const oneCordStartZero = [];
  for (let i of oneCord) {
    let [x, y] = i;
    x -= firstRow;
    y -= firstCol;
    oneCordStartZero.push([x, y]);
  }

  // 회전 된 사각형 도출
  const [original, rotate90, rotate180, rotate270] = getRotate(oneCordStartZero, rectRow, rectCol);

  const result = [];

  // key를 처음부터 끝까지 순회하며
  // 회전된 영역만큼 잘라서 original, rotate90, rotate180, rotate270와 비교

  // original 과 비교
  for (let i = 0; i <= key.length - original.length; i++) {
    for (let j = 0; j <= key[i].length - original[0].length; j++) {
      const slicedArr = key.slice(i, i + original.length).map((i) => {
        return i.slice(j, j + original[0].length);
      });
      if (getArrtoString(slicedArr) === getArrtoString(original)) result.push(true);
    }
  }

  // rotate90 과 비교
  for (let i = 0; i <= key.length - rotate90.length; i++) {
    for (let j = 0; j <= key[i].length - rotate90[0].length; j++) {
      const slicedArr = key.slice(i, i + rotate90.length).map((i) => {
        return i.slice(j, j + rotate90[0].length);
      });
      if (getArrtoString(slicedArr) === getArrtoString(rotate90)) result.push(true);
    }
  }

  for (let i = 0; i <= key.length - rotate180.length; i++) {
    for (let j = 0; j <= key[i].length - rotate180[0].length; j++) {
      const slicedArr = key.slice(i, i + rotate180.length).map((i) => {
        return i.slice(j, j + rotate180[0].length);
      });
      if (getArrtoString(slicedArr) === getArrtoString(rotate180)) result.push(true);
    }
  }

  for (let i = 0; i <= key.length - rotate270.length; i++) {
    for (let j = 0; j <= key[i].length - rotate270[0].length; j++) {
      const slicedArr = key.slice(i, i + rotate270.length).map((i) => {
        return i.slice(j, j + rotate270[0].length);
      });
      if (getArrtoString(slicedArr) === getArrtoString(rotate270)) result.push(true);
    }
  }

  return result.length ? true : false;
}
