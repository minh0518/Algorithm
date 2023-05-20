const solution = (numbers, hand) => {
  let result = [];
  let leftHandLocation = [3, 0];
  let rightHandLocation = [3, 2];

  for (let number of numbers) {
    let row = Math.floor((number - 1) / 3);
    let col = Math.floor((number - 1) % 3);
    if (number === 0) {
      row = 3;
      col = 1;
    }

    if (col === 0) {
      result.push('L');
      leftHandLocation = [row, col];
    }
    if (col === 2) {
      result.push('R');
      rightHandLocation = [row, col];
    }

    if (col === 1) {
      // 맨해튼 거리
      let leftDistance = Math.abs(row - leftHandLocation[0]) + Math.abs(col - leftHandLocation[1]);
      let rightDistance = Math.abs(row - rightHandLocation[0]) + Math.abs(col - rightHandLocation[1]);

      if (leftDistance > rightDistance) {
        result.push('R');
        rightHandLocation = [row, col];
      }
      if (leftDistance < rightDistance) {
        result.push('L');
        leftHandLocation = [row, col];
      }
      if (leftDistance === rightDistance) {
        if (hand === 'left') {
          result.push('L');
          leftHandLocation = [row, col];
        }
        if (hand === 'right') {
          result.push('R');
          rightHandLocation = [row, col];
        }
      }
    }
  }

  return result.join('');
};

solution([1, 3, 4, 5, 8, 2, 1, 4, 5, 9, 5], 'right');
solution([7, 0, 8, 2, 8, 3, 1, 5, 7, 6, 2], 'left');
solution([1, 2, 3, 4, 5, 6, 7, 8, 9, 0], 'right');
