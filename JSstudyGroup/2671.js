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

  const checkNextPattern = (index) => {
    if (str.slice(index + 1, index + 3).join('') === '01') {
      return true;
    }
    if (str.slice(index + 1, index + 4).join('') === '100') {
      return true;
    }
    return false;
  };

  const calc = () => {
    let tmpStr = [];
    for (let i = 0; i < str.length; i++) {
      tmpStr.push(str[i]);

      let currentTmpStr = tmpStr.join('');

      if (currentTmpStr === '01') {
        tmpStr.splice(0, 2);
        continue;
      }
      if (currentTmpStr === '100') {
        if (i === str.length - 1) { // 맨 마지막에 100뜨면 NOISE
          break;
        }
        tmpStr.splice(0, 3);

        for (let j = i + 1; j < str.length; j++) {
          let oneFlag = false;
          if (str[j] === '1') {
            oneFlag = true;
          }
          if (oneFlag) {
            if (!str.slice(j + 1).includes('0')) {
              // 100으로 시작해서 111..로 끝나도 SUBMARINE
              i = str.length;
              break;
            }

            if (checkNextPattern(j)) {
              i = j;
              break;
            } else if (str[j + 1] === '0') {
              // 1 다음에 01의 0이 아닌 0이 있으면 바로 더 볼것도 없이 NOISE
              return [1];
            }
          }
        }
      }
    }

    return tmpStr;
  };

  if (calc().length) {
    console.log('NOISE');
  } else {
    console.log('SUBMARINE');
  }

  //(100~1~|01)~
  //(최소 100부터 0이반복 돼야 함)
  //(최소 100..01 부터 1이 반복 돼야 함)
  //100001, 010101, 1000001110101, 1001110101,

  //100뜨면 무조건 100..1...1 형태 >> 다음 100 or 01 될때까지 자름
  //01뜨면 그냥 01 >> 그냥 01만 자름(얘는 0과1중에서 반복되는게 없으니까 01덩어리만 자름)

  //0 과 1 시작으로 따지면 절대 안됨 >> 1000011 (여기끊기는걸 모름)1001111

  //10010111
  //100 10(x) 111
  //(최소 100부터 0이반복 돼야 함)
  process.exit();
});
