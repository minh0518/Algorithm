function solution(n, build_frame) {
  const answer = [];

  const checkPillow = (targetX, targetY, answer) => {
    return (
      targetY === 0 ||
      answer.find(([x, y, a]) => {
        // 아래에 기둥 시작
        // 아래에 보 오른쪽
        // 아래에 보 왼쪽
        return (
          (a === 0 && targetX === x && targetY - 1 === y) ||
          (a === 1 && targetX - 1 === x && targetY === y) ||
          (a === 1 && targetX === x && targetY === y)
        );
      })
    );
  };

  const checkLine = (targetX, targetY, answer) => {
    return (
      // 왼쪽 아래에 기둥 시작
      // 오른쪽 아래 기둥 시작
      answer.find(([x, y, a]) => {
        return (a === 0 && targetX === x && targetY - 1 === y) || (a === 0 && targetX + 1 === x && targetY - 1 === y);
      }) ||
      // 왼쪽, 오른쪽 동시에 보가 존재
      (answer.find(([x, y, a]) => {
        return a === 1 && targetY === y && targetX - 1 === x;
      }) &&
        answer.find(([x, y, a]) => {
          return a === 1 && targetY === y && targetX + 1 === x;
        }))
    );
  };

  /** 조건에 부합하면 구조물 생성 */
  const build = (x, y, a, answer) => {
    if (a === 0 && checkPillow(x, y, answer)) {
      answer.push([x, y, a]);
    }
    if (a === 1 && checkLine(x, y, answer)) {
      answer.push([x, y, a]);
    }
  };

  /** 현재 구조물을 제거한 뒤, 다시 기존 순서대로 쌓아가는게 된다면 삭제가 가능*/
  const destroy = (x, y, a, answer) => {
    const copy = JSON.parse(JSON.stringify(answer));
    const targetIndex = answer.findIndex(([_x, _y, _a]) => {
      return x === _x && y === _y && a === _a;
    });

    // 임시로 구조물 제거
    copy.splice(targetIndex, 1);

    // 처음부터 다시 쌓았을 때 문제가 있다면 삭제 불가
    for (const [x, y, a] of copy) {
      if (a === 0 && !checkPillow(x, y, copy)) return;
      if (a === 1 && !checkLine(x, y, copy)) return;
    }
    return targetIndex;
  };

  // 메인 로직
  for (const [x, y, a, b] of build_frame) {
    if (b === 1) build(x, y, a, answer);
    if (b === 0) {
      const index = destroy(x, y, a, answer);
      if (index !== undefined) answer.splice(index, 1);
    }
  }

  return answer.sort((a, b) => {
    if (a[0] === b[0]) {
      if (a[1] === b[1]) return a[2] - b[2];
      return a[1] - b[1];
    }
    return a[0] - b[0];
  });
}
