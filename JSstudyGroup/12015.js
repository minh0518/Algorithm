const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const data = [];

rl.on('line', (input) => {
  data.push(input);
}).on('close', () => {
  data.shift();

  let arr = data.shift().split(' ').map(Number);

  let vector = [arr[0]];

  let lowerBoundIndex = Infinity;

  //재귀로 lowerBound 를 구현
  const lowerBound = (start, end, key) => {
    if (start > end) {
      return;
    }
    const mid = Math.floor((start + end) / 2);
    if (vector[mid] < key) {
      lowerBound(mid + 1, end, key);
      return;
    }
    lowerBoundIndex = Math.min(lowerBoundIndex, mid);
    lowerBound(start, mid - 1, key);
  };

  for (let i = 1; i < arr.length; i++) {
    let lastVectorValue = vector[vector.length - 1];
    let arrValue = arr[i];
    lowerBoundIndex = Infinity;
    if (arrValue > lastVectorValue) {
      vector.push(arrValue);
      continue;
    }
    if (arrValue <= lastVectorValue) {
      lowerBound(0, vector.length - 1, arrValue);
      vector.splice(lowerBoundIndex, 1, arrValue);
    }
  }

  console.log(vector.length);

  process.exit();
});