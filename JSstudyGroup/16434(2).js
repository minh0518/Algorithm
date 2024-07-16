const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const data = [];

rl.on('line', (input) => {
  data.push(input);
}).on('close', () => {
  let [N, humanA] = data.shift().split(' ').map(Number);
  N = BigInt(N);
  humanA = BigInt(humanA);
  const room = data.map((i) =>
    i
      .split(' ')
      .map(Number)
      .map((i) => BigInt(i)),
  );

  // 최대 maxHp
  let maxHp = BigInt(0);
  // 현재 HP
  let hp = BigInt(0);

  for (const [roomNumber, a, h] of room) {
    if (roomNumber === BigInt(1)) {
      let countToKill;

      if (h < humanA) {
        countToKill = BigInt(1);
      }
      // 0이하가 되기 위한 횟수(countToKill) 계산
      if (h >= humanA && h % humanA === BigInt(0)) {
        countToKill = BigInt(h / humanA);
      }
      if (h >= humanA && h % humanA !== BigInt(0)) {
        // countToKill = Math.floor(h / humanA) + 1;
        countToKill = BigInt(h / humanA) + BigInt(1);
      }

      const damage = (countToKill - BigInt(1)) * a;

      // hp가 음수값이라면 그 음수값 만큼 maxHp를 증가
      if (hp < damage) {
        maxHp += damage - hp;
        hp = BigInt(0);
      }
      if (hp >= damage) {
        hp -= damage;
      }
    }
    if (roomNumber === BigInt(2)) {
      humanA += a;
      hp += h;
      if (hp > maxHp) hp = maxHp;
    }
  }

  // 1을 더하는건, 최소 1은 커야 몬스터한테 죽지 않기 때문이다
  console.log(String(maxHp + BigInt(1)));

  process.exit();
});
