const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const data = [];

rl.on('line', (input) => {
  data.push(input);
}).on('close', () => {
  /**
    어떤 문자열은 A와 B로만 이루어져있고,
    B가 2번만 등장하는 특징이 있다.
  
    N의 길이를 가진 이 문자열을
    사전 순으로 배열할 때,
    K번째 문자열의 두번째 B의 위치를 구하시오.
  
    Ex)
    N 문자열의 길이이다.
    N = 5일 때,
    K = 1 -> AAABB,
    K = 2 -> AABAB
    ...
    K = 2일 때, 두번째 B의 위치는 5
  
    문제) N = 10, K = 24 일 때,
    두번째 B의 위치 P를 구하시오
   */

  const N = +data.shift();
  const K = +data.shift();
  const targetStr = 'B';

  const getStrCount = (strArr, target) => {
    return strArr.filter((i) => i === target).length;
  };

  const info = new Map();
  info.set('A', N - 2);
  info.set('B', 2);

  const permutation = [];
  const dfs = (current) => {
    if (getStrCount(current, 'B') === 2 && current.length === 5) {
      permutation.push(current.join(''));
      return;
    }

    for (let [key, value] of info) {
      if (value >= 1) {
        current.push(key);
        info.set(key, value - 1);
        dfs(current);
        current.pop();
        info.set(key, value);
      }
    }
  };

  dfs([]);

  console.log(permutation[K - 1].lastIndexOf(targetStr) + 1);

  process.exit();
});
