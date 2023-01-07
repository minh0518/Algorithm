const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const data = [];

rl.on('line', (input) => {
  data.push(input);
}).on('close', () => {
  let str = data.shift().split('');

  const checkPattern = (index) => {
    if (str.slice(index, index + 2).join('') === '01') {
      return 1; // truthy
    }
    if (str.slice(index, index + 3).join('') === '100') {
      return 2; // truthy
    }
    return false;
  };

  for (let i = 0; i < str.length; i++) {
    let patternExist = checkPattern(i);

    if (patternExist === 1) {
      str = str.splice(i + 2); // [i + 2]전까지 다 삭제 ([i + 2]는 삭제아님)
      i = -1; // 다음 for문에서 i를 0부터
      continue;
    }
    if (patternExist === 2) {
      if (i === str.length - 3) { // 100으로 끝나면 NOISE
        break;
      }
      str = str.splice(i + 3); // [i + 3]전까지 다 삭제

      for (let j = 0; j < str.length; j++) {

        // 어차피 0은 나중에 패턴이 발견되면 여기있는 0과 함께 다 지워버릴
        // 것이므로 그냥 패스

        if (str[j] === '1') {
          if (!str.slice(j + 1).includes('0')) { //111..로 끝나면 바로 SUBMARINE 
            str = []; 
            i = str.length;
            break;
          }

          let nextPattern = checkPattern(j + 1);

          if (nextPattern === 1) {
            i = j; // 다음 for문에서 패턴이 시작되는 인덱스로 맞춰주기 위해
                  // 그러면 위에 splice로 인해서 그 패턴까지 죄다 삭제
                  // j+1부터 패턴이 시작되므로 i=j해주면 다음 for문에서 i++되므로
            break;
          }
          if (nextPattern === 2) {
            i = j;
            break;
          }
          if (str[j + 1] === '0') { // 100..1 다음에 패턴이 아닌 0이 나오면 바로 noise
            i = str.length; // 바로 i의 for문 탈출
            break;
          }
        }
      }
    } else { // 최초에 시작부터 000.. 이면 NOISE
      break;
    }
  }

  if (str.length) {
    console.log('NOISE');
  } else {
    console.log('SUBMARINE');
  }

  //(100~1~|01)~
  //(100부터 0 반복 가능)
  //(100..01 부터 1 반복 가능)
  //100001, 010101, 1000001110101, 1001110101,

  //100뜨면 무조건 100..1...1 형태 >> 다음 100 or 01 될때까지 자름
  //01뜨면 01만 자름(얘는 0과1중에서 반복되는게 없으니까)

  //100..1..1 과 01을 찾는 기준을
  //0 과 1 중 뭐로 시작하는지로 파악하면 절대 안됨
  //1000011()1001111
  //저 부분에서 100 앞이니까 끊어야 하는데 1의 연속인지 , 100의 시작인지 구분할 수가 없다

  //1001 01 11 >> 1만 연속으로 끝나는거면 noise
  process.exit();
});