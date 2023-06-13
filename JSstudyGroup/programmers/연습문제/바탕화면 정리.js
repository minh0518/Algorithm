function solution(wallpaper) {
  wallpaper = wallpaper.map((i) => i.split(''));
  const row = wallpaper.length;
  const col = wallpaper[0].length;

  let locationRow = [];
  let locationCol = [];
  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      if (wallpaper[i][j] === '#') {
        locationRow.push(i);
        locationCol.push(j);
      }
    }
  }

  let start = [Math.min(...locationRow), Math.min(...locationCol)];
  let end = [Math.max(...locationRow) + 1, Math.max(...locationCol) + 1];

  return [...start, ...end];
}

solution(['.#...', '..#..', '...#.']);
solution(['..........', '.....#....', '......##..', '...##.....', '....#.....']);
solution(['.##...##.', '#..#.#..#', '#...#...#', '.#.....#.', '..#...#..', '...#.#...', '....#....']);
solution(['..', '#.']);
