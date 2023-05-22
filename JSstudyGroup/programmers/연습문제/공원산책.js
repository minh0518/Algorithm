const solution = (park, routes) => {
  park = park.map((i) => i.split(''));

  let row = park.length;
  let col = park[0].length;

  let location = [];
  for (let i = 0; i < park.length; i++) {
    let index = park[i].indexOf('S');
    if (index !== -1) {
      location.push(i, index);
      break;
    }
  }

  for (let i of routes) {
    let [direction, distance] = i.split(' ');

    let moveCount = 0;
    if (direction === 'E') {
      let nx = location[0];
      let ny = location[1];

      // moveCount를 1씩 증가시키며 distance랑 같아질 때까지 반복
      while (moveCount < Number(distance)) {
        ny += 1;
        if (nx < 0 || nx >= row || ny < 0 || ny >= col || park[nx][ny] === 'X') {
          break;
        }
        moveCount += 1;
      }

      if (moveCount === Number(distance)) {
        location = [nx, ny];
      }
    }
    if (direction === 'S') {
      let nx = location[0];
      let ny = location[1];

      while (moveCount < Number(distance)) {
        nx += 1;
        if (nx < 0 || nx >= row || ny < 0 || ny >= col || park[nx][ny] === 'X') {
          break;
        }
        moveCount += 1;
      }
      if (moveCount === Number(distance)) {
        location = [nx, ny];
      }
    }
    if (direction === 'W') {
      let nx = location[0];
      let ny = location[1];

      while (moveCount < Number(distance)) {
        ny -= 1;
        if (nx < 0 || nx >= row || ny < 0 || ny >= col || park[nx][ny] === 'X') {
          break;
        }
        moveCount += 1;
      }
      if (moveCount === Number(distance)) {
        location = [nx, ny];
      }
    }
    if (direction === 'N') {
      let nx = location[0];
      let ny = location[1];

      while (moveCount < Number(distance)) {
        nx -= 1;
        if (nx < 0 || nx >= row || ny < 0 || ny >= col || park[nx][ny] === 'X') {
          break;
        }
        moveCount += 1;
      }
      if (moveCount === Number(distance)) {
        location = [nx, ny];
      }
    }
  }

  return location;
};

solution(['SOO', 'OOO', 'OOO'], ['E 2', 'S 2', 'W 1']);
solution(['SOO', 'OXX', 'OOO'], ['E 2', 'S 2', 'W 1']);
solution(['OSO', 'OOO', 'OXO', 'OOO'], ['E 2', 'S 3', 'W 1']);
