const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const data = [];

rl.on('line', (input) => {
  data.push(input);
}).on('close', () => {
  let [N, M] = data.shift().split(' ').map(Number);
  //한번에 M개

  let books = data.shift().split(' ').map(Number);

  let left = [];
  let right = [];
  for (let i of books) {
    if (i < 0) left.push(-i);
    if (i > 0) right.push(i);
  }

	// 최댓값 찾음
  let max = Math.max(...left, ...right);

  // 내림차순 정렬 ([0]이 가장 큰 값)
  left = left.sort((a, b) => b - a);
  right = right.sort((a, b) => b - a);

  let result = [];

	// 가장 큰 값이면 한번만 더해주는 것고
	// 그게 아니라면 *2해서 더해준다
	// 그리고 매번 M만큼 잘라주는데 어차피 
	// 배열의 길이가 splice의 M보다 작아도 알아서 남은만큼 잘라준다
  while (left.length) {
    let firstValue = left[0];
    if (firstValue === max) {
      result.push(firstValue);
    } else {
      result.push(firstValue * 2);
    }
    left.splice(0, M);
  }

  while (right.length) {
    let firstValue = right[0];
    if (firstValue === max) {
      result.push(firstValue);
    } else {
      result.push(firstValue * 2);
    }
    right.splice(0, M);
  }

  console.log(result.reduce((a,b)=>a+b,0))
  process.exit();
});

// -39, -37, -29, -28, -6,   0   2,  11
//28 28
//37 37
//39

//6 6
//29 29
//39

//(가장 절댓값이 큰 것을 마지막 경로로)
// 2  11  15
// 2 2
// 15 15
//(가장 마지막에 있는 값은 가는 길에 같이 가지고 가야 효율적)