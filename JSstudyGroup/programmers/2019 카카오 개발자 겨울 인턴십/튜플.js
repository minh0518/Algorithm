const solution = (s) => {
  s = s.split('{').join('[');
  s = s.split('}').join(']');

  arr = JSON.parse(s);

  arr.sort((a, b) => {
    return a.length - b.length;
  });

  let result = [];
  for (let i of arr) {
    for (let j of i) {
      if (result.includes(j)) continue;
      result.push(j);
    }
  }

  return result;
};

solution('{{2},{2,1},{2,1,3},{2,1,3,4}}');
solution('{{1,2,3},{2,1},{1,2,4,3},{2}}');
solution('{{20,111},{111}}');
solution('{{123}}');
solution('{{4,2,3},{3},{2,3,4,1},{2,3}}');
