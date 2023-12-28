const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const data = [];

rl.on('line', (input) => {
  data.push(input);
}).on('close', () => {
  const [N, C] = data.shift().split(' ').map(Number);
  const houses = data.map(Number).sort((a, b) => a - b);

  const checkPossible = (gap) => {
    let houseCount = 0;
    let lastChooseHouse = 0;

    for (let house of houses) {
      let currentGap = house - lastChooseHouse;

      if (lastChooseHouse === 0 || currentGap >= gap) {
        houseCount += 1;
        lastChooseHouse = house;
      }
    }

    return houseCount >= C;
  };

  let left = 1;
  let right = houses[houses.length - 1];

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    const isPossible = checkPossible(mid);

    // C개의 공유기를 모두 설치할 수 있다면
    if (isPossible) {
      left = mid + 1; // 간격 늘려보기
    }

    // C개의 공유기를 모두 설치할 수 없다면
    if (!isPossible) {
      right = mid - 1; // 간격 줄여보기
    }
  }

  console.log(right);

  process.exit();
});
