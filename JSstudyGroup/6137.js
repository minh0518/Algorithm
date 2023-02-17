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
  let string = data;
  let result = '';

  let start = 0;
  let end = string.length - 1;

  while (start <= end) {
    if (string[start] === string[end]) {
      let insideStart = start + 1;
      let insideEnd = end - 1;

      let isSame = true; //앞
      while (insideStart <= insideEnd) {
        if (string[insideStart] < string[insideEnd]) {
          result += string[start];
          start += 1;
          isSame = false;
          break;
        }
        if (string[insideStart] > string[insideEnd]) {
          result += string[end];
          end -= 1;
          isSame = false;
          break;
        }
        insideStart += 1;
        insideEnd -= 1;
      }

      if (isSame) {
        result += string[start];
        start += 1;
      }
    } else if (string[start] < string[end]) {
      result += string[start];
      start += 1;
      continue;
    } else if (string[start] > string[end]) {
      result += string[end];
      end -= 1;
      continue;
    }
  }

  let answer = [];
  for (let i = 0; i < result.length; i++) {
    if (i !== 0 && i % 80 === 0) {
      answer.push('\n');
    }
    answer.push(result[i]);
  }

  console.log(answer.join(''));

  process.exit();
});

