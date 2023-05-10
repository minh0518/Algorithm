function solution(numbers, hand) {
  let keypad = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    ['*', 0, '#'],
  ];

  let result = [];
  let left = [3, 0];
  let right = [3, 2];
  let middle;
  for (let number of numbers) {
    if (number === 2 || number === 5 || number === 8 || number === 0) {
      for (let i = 0; i < keypad.length; i++) {
        for (let j = 0; j < keypad[0].length; j++) {
          if (keypad[i][j] === number) middle = [i, j];
        }
      }

      // 맨해튼 거리
      let leftDistance = 0;
      for (let i = 0; i < 2; i++) {
        leftDistance += Math.abs(middle[i] - left[i]);
      }
      // 맨해튼 거리
      let rightDistance = 0;
      for (let i = 0; i < 2; i++) {
        rightDistance += Math.abs(middle[i] - right[i]);
      }

      if (rightDistance < leftDistance) {
        result.push('R');
        right = [...middle];
      }
      if (rightDistance > leftDistance) {
        result.push('L');
        left = [...middle];
      }
      if (rightDistance === leftDistance) {
        if (hand === 'right') {
          result.push('R');
          right = [...middle];
        }
        if (hand === 'left') {
          result.push('L');
          left = [...middle];
        }
      }
    }

    if (number === 1 || number === 4 || number === 7 || number === '*') {
      for (let i = 0; i < keypad.length; i++) {
        for (let j = 0; j < keypad[0].length; j++) {
          if (keypad[i][j] === number) {
            left = [i, j];
            result.push('L');
          }
        }
      }
    }

    if (number === 3 || number === 6 || number === 9 || number === '#') {
      for (let i = 0; i < keypad.length; i++) {
        for (let j = 0; j < keypad[0].length; j++) {
          if (keypad[i][j] === number) {
            right = [i, j];
            result.push('R');
          }
        }
      }
    }
  }

  // console.log(result.join(''));
  return result.join('');
}

solution([1, 3, 4, 5, 8, 2, 1, 4, 5, 9, 5], 'right');
solution([7, 0, 8, 2, 8, 3, 1, 5, 7, 6, 2], 'left');
solution([1, 2, 3, 4, 5, 6, 7, 8, 9, 0], 'right');
