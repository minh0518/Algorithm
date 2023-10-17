const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const data = [];

rl.on('line', (input) => {
  data.push(input);
}).on('close', () => {
  const str = data.shift().split('');
  const reversedStr = [...str].reverse();

  let result;
  for (let i = 0; i < str.length; i++) {
    const slicedStr = str.slice(i, str.length);

    const reversedSlicedStr = reversedStr.slice(0, slicedStr.length);

    if (slicedStr.join('') === reversedSlicedStr.join('')) {
      result = reversedStr.length - slicedStr.length;
      break;
    }
  }
  console.log(result + str.length);

  process.exit();
});
