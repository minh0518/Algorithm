function solution(files) {
  files = files.map((i) => i.split(''));

  let newFiles = [];
  for (let i = 0; i < files.length; i++) {
    let headArr = [];

    for (let j = 0; j < files[i].length; j++) {
      let current = files[i][j];

      if (current === ' ' || isNaN(current)) {
        headArr.push(current);
      } else {
        let numberArr = [];
        // let numberArr = files[i].slice(j, j + 5).filter((i) => {
        //   return !isNaN(i);
        // });
        for (let k = j; k < j + 5; k++) {
          let value = files[i][k];
          if (isNaN(value) || value === ' ') {
            break;
          } else {
            numberArr.push(value);
          }
        }

        newFiles.push([headArr.join('').toLowerCase(), Number(numberArr.map(Number).join('')), i]);
        break;
      }
    }
  }

  newFiles.sort((a, b) => {
    if (a[0] < b[0]) return -1;
    if (a[0] > b[0]) return 1;
    if (a[0] === b[0]) {
      if (a[1] !== b[1]) return a[1] - b[1];
      if (a[1] === b[1]) return a[2] - b[2];
    }
  });

  let result = [];
  for (let i of newFiles) {
    let index = i[2];
    result.push(files[index].join(''));
  }
  return result;
}

solution(['img12.png', 'img10.png', 'img02.png', 'img1.png', 'IMG01.GIF', 'img2.JPG']);
solution(['F-5 Freedom Fighter', 'B-50 Superfortress', 'A-10 Thunderbolt II', 'F-14 Tomcat']);
