const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const data = [];

rl.on('line', (input) => {
  data.push(input);
}).on('close', () => {
  const N = +data.shift();
  const P = data.shift().split(' ').map(Number);
  const S = data.shift().split(' ').map(Number);

  const checkSame = (a, b) => {
    if (a.size !== b.size) {
      return false;
    }
    for (let i of a) {
      if (!b.has(i)) return false;
    }
    return true;
  };

  // i번째 사람에게 card[i]번째의 카드를 지급
  let cards = new Array(N).fill(undefined).map((_, index) => index);

  const goal = new Array(3).fill(undefined).map(() => new Set());
  for (let i = 0; i < N; i++) {
    goal[P[i]].add(i);
  }

  const visited = new Set();
  visited.add(cards.toString());
  let count = 0;

  while (1) {
    const firstPersonCard = new Set(cards.filter((_, index) => index % 3 === 0));
    const secondPersonCard = new Set(cards.filter((_, index) => index % 3 === 1));
    const thirdPersonCard = new Set(cards.filter((_, index) => index % 3 === 2));
    if (
      checkSame(firstPersonCard, goal[0]) &&
      checkSame(secondPersonCard, goal[1]) &&
      checkSame(thirdPersonCard, goal[2])
    ) {
      break;
    }

    const newCards = new Array(N).fill(0);
    for (let i = 0; i < N; i++) {
      newCards[S[i]] = cards[i];
    }

    if (visited.has(newCards.toString())) {
      count = -1;
      break;
    }

    cards = newCards;
    visited.add(cards.toString());
    count += 1;
  }

  console.log(count);

  process.exit();
});
