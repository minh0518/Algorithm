function solution(n, t, m, p) {
  let result = [];

  let number = 0;

  let order = 1;
  while (result.length < t) {
    let current = String(number.toString(n)).split('');

    for (let i = 0; i < current.length; i++) {
      let str = current[i];

      if (m === p && order % m === 0) result.push(str);
      if (order % m === p) result.push(str);

      order += 1;
    }

    number += 1;
  }

  return result.slice(0, t).join('').toUpperCase();
}
