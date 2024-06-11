const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const data = [];

rl.on('line', (input) => {
  data.push(input);
}).on('close', () => {
  let [_N, _A] = data.shift().split(' ');
  let N = BigInt(_N);
  let A = BigInt(_A);

  let left = BigInt(1);
  // 상대방 최대 1000000,1000000이고 내 공격력이 1일 경우
  // 내 채력은  1000000*1000000이어야 함
  // 1000000*1000000*123456
  let right = BigInt(0);

  const room = [];
  let index = 0;
  while (N--) {
    let [roomNumber, a, h] = data[index].split(' ').map(Number);

    a = BigInt(a);
    h = BigInt(h);
    room.push([roomNumber, a, h]);
    if (roomNumber == 1) {
      right += (h / A + BigInt(1)) * a;
    }
    index += 1;
  }

  const simulation = (maxH) => {
    let [humanA, humanH] = [A, maxH];
    humanA = BigInt(humanA);
    humanH = BigInt(humanH);

    for (let [roomNumber, a, h] of room) {
      if (roomNumber === 1) {
        let countToKill;
        if (h < humanA) {
          countToKill = BigInt(1);
        } else if (h >= humanA && h % humanA === BigInt(0)) {
          countToKill = BigInt(h / humanA);
        } else if (h >= humanA && h % humanA !== BigInt(0)) {
          // countToKill = Math.floor(h / humanA) + 1;
          countToKill = BigInt(h / humanA) + BigInt(1);
        }

        const damageFromMonster = (countToKill - BigInt(1)) * a;

        if (humanH - damageFromMonster <= BigInt(0)) return false;
        humanH -= damageFromMonster;
      } else {
        humanA += a;
        humanH = humanH + h > maxH ? maxH : humanH + h;
      }
    }

    return true;
  };

  while (left <= right) {
    const mid = (left + right) / BigInt(2);

    const isPossible = simulation(mid);

    if (isPossible) {
      right = mid - BigInt(1);
    } else if (!isPossible) {
      left = mid + BigInt(1);
    }
  }
  console.log(String(left));

  process.exit();
});
