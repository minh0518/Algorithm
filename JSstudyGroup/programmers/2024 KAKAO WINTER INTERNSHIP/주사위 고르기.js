function solution(dice) {
  const pickLength = dice.length / 2;
  const arrForDiceLength = new Array(dice.length).fill().map((_, index) => index);

  const dicePickCombination = [];

  const dfsForDice = (current, index) => {
    if (current.length === pickLength) {
      dicePickCombination.push([...current]);
      return;
    }

    for (let i = index; i < dice.length; i++) {
      current.push(i);
      dfsForDice(current, i + 1);
      current.pop();
    }
  };

  dfsForDice([], 0);

  const dfsForDiceValue = (aDiceResult, diceInfo, currentValue, row) => {
    if (row === pickLength) {
      aDiceResult.push(currentValue);
      return;
    }

    for (let i = 0; i < diceInfo[row].length; i++) {
      currentValue += diceInfo[row][i];
      dfsForDiceValue(aDiceResult, diceInfo, currentValue, row + 1);
      currentValue -= diceInfo[row][i];
    }
  };

  const binarySearch = (target, arr) => {
    let start = 0;
    let end = arr.length - 1;
    let answer;

    if (target <= arr[start]) return 0;
    if (target > arr[end]) return arr.length;
    // console.log('=');
    // console.log(target, arr);

    while (start <= end) {
      //console.log(start, end);
      const mid = Math.floor((start + end) / 2);

      if (arr[mid] >= target) {
        end = mid - 1;
      }
      if (arr[mid] < target) {
        // answer = mid; 이거 왜 안됨?
        start = mid + 1;
      }
    }

    return start;
  };

  let maxValue = 0;
  let answer;
  for (let eachCase of dicePickCombination) {
    // [0,1]
    const aPick = eachCase;

    // [2,3]
    const bPick = arrForDiceLength.filter((i) => !eachCase.includes(i));

    const aDice = aPick.map((i) => {
      return dice[i];
    });
    const bDice = bPick.map((i) => {
      return dice[i];
    });
    // console.log(aPick,bPick)

    const aDiceResult = [];
    dfsForDiceValue(aDiceResult, aDice, 0, 0);

    const bDiceResult = [];
    dfsForDiceValue(bDiceResult, bDice, 0, 0);

    aDiceResult.sort((a, b) => a - b);
    bDiceResult.sort((a, b) => a - b);
    // console.log(aDiceResult);
    // console.log(bDiceResult);

    let winCount = 0;
    // for(let i of aDiceResult){
    //     const addValue=(bDiceResult.filter(value=>value<i)).length
    //     winCount+=addValue
    // }
    // console.log(winCount)

    for (let i of aDiceResult) {
      const addValue = binarySearch(i, bDiceResult);

      // console.log(`addValue ${addValue}`);
      winCount += addValue;
      //  console.log(`winCount ${winCount}`);
    }

    if (maxValue < winCount) {
      maxValue = winCount;
      answer = aPick.map((i) => i + 1);
    }
  }

  return answer;
}
