const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const data = [];

rl.on('line', (input) => {
  data.push(input);
}).on('close', () => {
  const [p, m] = data.shift().split(' ').map(Number);

  const playerInfo = new Map(
    data.map((i) => {
      const [level, nickName] = i.split(' ');
      return [nickName, Number(level)];
    }),
  );

  const roomInfo = new Map();

  for (let [myNickName, myLevel] of playerInfo) {
    const lowLevel = myLevel - 10;
    const hightLevel = myLevel + 10;
    let getInFlag = false;
    for (let [roomLevel, people] of roomInfo) {
      if (roomLevel[0] > myLevel || roomLevel[1] < myLevel || people.length >= m) continue;
      roomInfo.set(roomLevel, [...people, [myLevel, myNickName]]);
      getInFlag = true;
      break;
    }
    if (!getInFlag) {
      roomInfo.set([lowLevel, hightLevel], [[myLevel, myNickName]]);
    }
  }

  const result = [];

  for (let [roomLevel, people] of roomInfo) {
    people.sort((a, b) => a[1].localeCompare(b[1]));

    if (people.length === m) {
      result.push(['Started!']);
      result.push(people.map((i) => i.join(' ')));
    }
    if (people.length !== m) {
      result.push(['Waiting!']);
      result.push(people.map((i) => i.join(' ')));
    }
  }

  console.log(
    result
      .map((i) => {
        if (i.length === 1) return i[0];
        if (i.length !== 1) return i.join('\n');
      })
      .join('\n'),
  );

  process.exit();
});
