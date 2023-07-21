function solution(record) {
  record = record.map((i) => i.split(' '));

  let log = [];
  const info = {};
  for (let i of record) {
    let [type, id] = [i[0], i[1]];

    if (type === 'Enter') {
      log.push([id, type]);
      info[id] = i[2]; // 갱신
    }
    if (type === 'Leave') {
      log.push([id, type]);
    }
    if (type === 'Change') {
      info[id] = i[2]; // 갱신
    }
  }

  let result = [];
  for (let i of log) {
    if (i[1] === 'Enter') {
      result.push(`${info[i[0]]}님이 들어왔습니다.`);
    }
    if (i[1] === 'Leave') {
      result.push(`${info[i[0]]}님이 나갔습니다.`);
    }
  }
  return result;
}
