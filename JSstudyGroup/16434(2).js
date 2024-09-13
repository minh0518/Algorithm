const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const data = [];

rl.on('line', (input) => {
  data.push(input);
}).on('close', () => {
  let [N, ATT] = data
    .shift()
    .split(' ')
    .map((i) => BigInt(i));
  const info = data.map((row) => row.split(' ').map((i) => BigInt(i)));

  let [currentHp, maxHp] = [0n, 0n];

  for (const [roomType, a, h] of info) {
    // 몬스터
    if (roomType === 1n) {
      // const hitCountToKill = Math.ceil(h / ATT);
      const hitCountToKill = (h - 1n) / ATT + 1n;
      const myDamage = (hitCountToKill - 1n) * a; // 내가 받는 데미지

      currentHp -= myDamage;

      if (currentHp < 0) {
        maxHp += currentHp < 0 ? -currentHp : currentHp;
        currentHp = 0n;
      }
    }
    // 포션
    if (roomType === 2n) {
      ATT += a;
      currentHp += h;
      if (currentHp > maxHp) currentHp = maxHp;
    }
  }

  console.log(String(maxHp + 1n));

  process.exit();
});
