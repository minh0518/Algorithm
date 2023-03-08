const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const data = [];

rl.on('line', (input) => {
  data.push(input);
}).on('close', () => {
  let [N, M, K] = data.shift().split(' ').map(Number);
  let originData = data.slice(0, N).map((i) => i.split(' ').map(Number));
  let commands = data.slice(N).map((i) => i.split(' ').map(Number));

  let indexOfLowerBound = Infinity;
  let indexOfReverseLowerbound = -Infinity;
  const lowerBound = (start, end, key, targetArr) => {
    if (start > end) {
      return;
    }
    const mid = Math.floor((start + end) / 2);
    if (targetArr[mid] < key) {
      lowerBound(mid + 1, end, key, targetArr);
      return;
    }
    indexOfLowerBound = Math.min(indexOfLowerBound, mid);
    lowerBound(start, mid - 1, key, targetArr);
  };

  const reverseLowerbound = (start, end, key, targetArr) => {
    if (start > end) {
      return;
    }
    const mid = Math.floor((start + end) / 2);
    if (targetArr[mid] <= key) {
      indexOfReverseLowerbound = Math.max(indexOfReverseLowerbound, mid);
      reverseLowerbound(mid + 1, end, key, targetArr);
      return;
    }
    reverseLowerbound(start, mid - 1, key, targetArr);
  };

  let db = {};

  for (let i of originData) {
    let [key, value] = i;
    db[key] = value;
  }

  let result = [];

  for (let i of commands) {
    let command = i;

    indexOfLowerBound = Infinity;
    indexOfReverseLowerbound = -Infinity;
    let keys = Object.keys(db)
      .map(Number)
      .sort((a, b) => a - b);
    lowerBound(0, keys.length - 1, command[1], keys);
    reverseLowerbound(0, keys.length - 1, command[1], keys);

    let gap1 = Math.abs(command[1] - keys[indexOfLowerBound]);
    let gap2 = Math.abs(command[1] - keys[indexOfReverseLowerbound]);

    if (command[0] === 1) {
      db[command[1]] = command[2];
    }

    if (command[0] === 2) {
      // 같은 경우
      if (indexOfLowerBound === indexOfReverseLowerbound) {
        db[command[1]] = command[2];
      }

      // 맨 앞
      if (indexOfLowerBound === 0 && indexOfReverseLowerbound === -Infinity) {
        if (gap1 <= K) {
          db[keys[indexOfLowerBound]] = command[2];
        }
        continue;
      }

      // 맨 뒤
      if (
        indexOfLowerBound === Infinity &&
        indexOfReverseLowerbound === keys.length - 1
      ) {
        if (gap2 <= K) {
          db[keys[indexOfReverseLowerbound]] = command[2];
          continue;
        }
      }

      // 중간
      if (gap1 < gap2 && gap1 <= K) {
        db[keys[indexOfLowerBound]] = command[2];
        continue;
      }
      if (gap1 > gap2 && gap2 <= K) {
        db[keys[indexOfReverseLowerbound]] = command[2];
        continue;
      }
    }
    if (command[0] === 3) {
      if (command[1] === 100) {
      }
      // 같은 경우
      if (indexOfLowerBound === indexOfReverseLowerbound) {
        result.push(db[command[1]]);
      }

      // 맨 앞
      if (indexOfLowerBound === 0 && indexOfReverseLowerbound === -Infinity) {
        if (gap1 <= K) {
          result.push(db[keys[indexOfLowerBound]]);
        }
        continue;
      }

      // 맨 뒤
      if (
        indexOfLowerBound === Infinity &&
        indexOfReverseLowerbound === keys.length - 1
      ) {
        if (gap2 <= K) {
          result.push(db[keys[indexOfReverseLowerbound]]);
          continue;
        }
      }

      // 중간
      if (gap1 < gap2 && gap1 <= K) {
        result.push(db[keys[indexOfLowerBound]]);
        continue;
      }
      if (gap1 > gap2 && gap2 <= K) {
        result.push(db[keys[indexOfReverseLowerbound]]);
        continue;
      }
      if (gap1 === gap2 && gap1 <= K) {
        result.push('?');
        continue;
      }

      result.push(-1);
    }
  }

  console.log(result.join('\n'));

  process.exit();
});