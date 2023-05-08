const solution = (name, yearning, photo) => {
  let info = {};
  for (let i = 0; i < name.length; i++) {
    info[name[i]] = yearning[i];
  }

  let result = [];
  for (let i = 0; i < photo.length; i++) {
    let sum = 0;
    for (let j = 0; j < photo[i].length; j++) {
      info[photo[i][j]] ? (sum += info[photo[i][j]]) : '';
    }
    result.push(sum);
  }
  return result;
};

solution(
  ['may', 'kein', 'kain', 'radi'],
  [5, 10, 1, 3],
  [
    ['may', 'kein', 'kain', 'radi'],
    ['may', 'kein', 'brin', 'deny'],
    ['kon', 'kain', 'may', 'coni'],
  ],
);
