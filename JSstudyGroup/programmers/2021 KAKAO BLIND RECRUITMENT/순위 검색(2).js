function solution(info, query) {
  const map = {};

  console.log(query);

  const dfs = (index, infoArr, dashCount, score) => {
    if (infoArr.filter((i) => i === '-').length === dashCount) {
      let infoStr = infoArr.join('');
      map[infoStr] ? map[infoStr].push(score) : (map[infoStr] = [score]);
      return;
    }

    for (let i = index; i < infoArr.length; i++) {
      let originValue = infoArr[i];
      infoArr[i] = '-';
      dfs(i + 1, infoArr, dashCount, score);
      infoArr[i] = originValue;
    }
  };

  function search(key, score) {
    let scoreArr = map[key];

    if (scoreArr) {
      let start = 0;
      let end = scoreArr.length;

      while (start < end) {
        let mid = Math.floor((start + end) / 2);

        if (scoreArr[mid] >= score) {
          end = mid;
        } else if (scoreArr[mid] < score) {
          start = mid + 1;
        }
      }

      return scoreArr.length - start;
    }
    if (!scoreArr) return 0;
  }

  for (let i of info) {
    i = i.split(' ');
    let score = Number(i.pop());
    for (let j = 0; j <= i.length; j++) {
      dfs(0, i, j, score);
    }
  }

  for (let i in map) {
    map[i].sort((a, b) => a - b);
  }

  console.log(map);

  let result = [];
  for (let i of query) {
    let queryArr = i.split(' ');
    let score = queryArr.pop();
    queryArr = queryArr.join('').split('and').join('');

    result.push(search(queryArr, Number(score)));
  }

  console.log(result);
  return result;
}

solution(
  [
    'java backend junior pizza 150',
    'python frontend senior chicken 210',
    'python frontend senior chicken 150',
    'cpp backend senior pizza 260',
    'java backend junior chicken 80',
    'python backend senior chicken 50',
  ],
  [
    'java and backend and junior and pizza 100',
    'python and frontend and senior and chicken 200',
    'cpp and - and senior and pizza 250',
    '- and backend and senior and - 150',
    '- and - and - and chicken 100',
    '- and - and - and - 150',
  ],
);
