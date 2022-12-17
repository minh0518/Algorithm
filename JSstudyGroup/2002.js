const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const data = [];

rl.on('line', (input) => {
  data.push(input);
}).on('close', () => {
  let N = +data.shift();

  let entrance = [];
  let exit = [];
  for (let i = 0; i < 2 * N; i++) {
    if (i < N) entrance.push(data.shift());
    if (i >= N) exit.push(data.shift());
  }

  // a b c d e

  //(변경)
  // e a b c d
  // e d a b c
  // e d c a b
  // e d c b a

  // e d c b a

  const checkOutrun = (exitCar, index) => {
    let exitCarIndex = index;
    let exitCarOriginIndex = entrance.indexOf(exitCar);

    if (exitCarIndex < exitCarOriginIndex) {
      entrance.splice(exitCarOriginIndex,1)
      entrance.splice(exitCarIndex, 0, exit[exitCarIndex]);
      return true;
    }
  };

  let result = 0;
  for (let i = 0; i < N; i++) {
    if (exit[i] === entrance[i]) continue;

    if (checkOutrun(exit[i], i)) {
      result += 1;
//      i--
    }
  }


  console.log(result);

  process.exit();
});

//1 2 3 4
//2 1 3 4
//2 1 4 3

//1 2 3 4
//4 1 2 3

//인덱스를 비교해서
//기존에 있던 것이 앞으로 가면 추월
//기존에 있던 것이 뒤로 간거면 추월이 아님

//a b c d

//(변경)
//d a b c

//d a b c

//a b c d

//(변경)
//b a c d
//b a d c

//b a d c

// a b c d e

//(변경)
// e a b c d
// e d a b c
// e d c a b
// e d c b a

// e d c b a

//1 2 3 4 5
//5 4 3 2 1

//테스트케이스
//1 2 3 4 5
//5 3 1 2 4

//1 2 3 4 5
//2 5 4 1 3

// 5
// a
// b
// c
// d
// e
// e
// d
// c
// b
// a