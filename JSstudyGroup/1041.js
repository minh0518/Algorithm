const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const data = [];

rl.on('line', (input) => {
  data.push(input);
}).on('close', () => {
  let N = +data.shift();

  let numbers = data.shift().split(' ').map(Number);

  const getCombinations = function (arr, selectNumber) {
    const results = [];
    if (selectNumber === 1) return arr.map((el) => [el]);

    arr.forEach((fixed, index, origin) => {
      const rest = origin.slice(index + 1);
      const combinations = getCombinations(rest, selectNumber - 1);

      const attached = combinations.map((el) => [fixed, ...el]);
      results.push(...attached);
    });

    return results;
  };

  const makeThree = (arr) => {
    let result = [];

    // let allThree = getCombinations(arr, 3);

    // let resultThree = allThree.filter((i) => {
    //   let tmp = i.join('');
    //   return (
    //     tmp !== '156' &&
    //     tmp !== '125' &&
    //     tmp !== '126' &&
    //     tmp !== '256' &&
    //     tmp !== '134' &&
    //     tmp !== '136' &&
    //     tmp !== '346' &&
    //     tmp !== '146' &&
    //     tmp !== '235' &&
    //     tmp !== '345' &&
    //     tmp !== '245' &&
    //     tmp !== '234'
    //   );
    // });
    // console.log(resultThree);

    let patternIndex = [
      [1, 2, 3],
      [1, 2, 4],
      [1, 3, 5],
      [1, 4, 5],
      [2, 3, 6],
      [2, 4, 6],
      [3, 5, 6],
      [4, 5, 6],
    ];

    for (let i of patternIndex) {
      let firstIndex = i[0] - 1;  //배열 인덱스니까 -1
      let secondIndex = i[1] - 1;
      let thirdIndex = i[2] - 1;

      let sum = arr[firstIndex] + arr[secondIndex] + arr[thirdIndex];
      result.push(sum);
    }

    return Math.min(...result);
  };

  const makeTwo = (arr) => {
    let result = [];
    // let allTwo = getCombinations(arr, 2);

    // let resultTwo = allTwo.filter((i) => {
    //   let tmp = i.join('');
    //   return (
    //     tmp !== '16' &&
    //     tmp !== '25' &&
    //     tmp !== '34'
    //   );
    // });
    // console.log(resultTwo);

    let patternIndex = [
      [1, 2],
      [1, 3],
      [1, 4],
      [1, 5],
      [2, 3],
      [2, 4],
      [2, 6],
      [3, 5],
      [3, 6],
      [4, 5],
      [4, 6],
      [5, 6],
    ];

    for (let i of patternIndex) {
      let firstIndex = i[0] - 1;
      let secondIndex = i[1] - 1;

      let sum = arr[firstIndex] + arr[secondIndex];
      result.push(sum);
    }

    return Math.min(...result);
  };

  let minValueOfThree = makeThree(numbers);
  let minValueOfTwo = makeTwo(numbers);
  let minValueOfOne = Math.min(...numbers);

  // console.log(minValueOfThree);
  // console.log(minValueOfTwo);
  // console.log(minValueOfOne);

  let top =
    minValueOfThree * 4 +
    minValueOfTwo * ((N - 2) * 4) +
    (N === 2 ? 0 : minValueOfOne * (N - 2) ** 2);

  let middle =
    minValueOfTwo * ((N - 2) * 4) +
    (N === 2 ? 0 : minValueOfOne * ((N - 2) ** 2 * 4));

  let bottom = minValueOfTwo * 4 + (N === 2 ? 0 : minValueOfOne * (N - 2) * 4);

  if (N === 1) {
    let sum = numbers.reduce((a, b) => a + b, 0);
    console.log(sum - Math.max(...numbers));
  } else {
    console.log(top + middle + bottom);
  }

  process.exit();
});