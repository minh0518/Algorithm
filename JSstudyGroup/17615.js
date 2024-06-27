const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const data = [];

rl.on('line', (input) => {
  data.push(input);
}).on('close', () => {
  const N = +data.shift();
  const info = data.shift().split('');

  const RED_COUNTS = info.filter((i) => i === 'R').length;
  const BLUE_COUNTS = N - RED_COUNTS;

  if (RED_COUNTS === 0 || BLUE_COUNTS === 0) {
    console.log(0);
  } else {
    const moveRed = () => {
      // 앞으로 옮길 경우
      const firstBlueIndex = info.indexOf('B');
      let redCountFromStart = info.slice(firstBlueIndex).filter((i) => i === 'R').length;

      // 뒤로 옮길 경우
      const lastBlueIndex = info.lastIndexOf('B');
      let redCountFromEnd = info.slice(0, lastBlueIndex).filter((i) => i === 'R').length;

      return Math.min(redCountFromStart, redCountFromEnd);
    };

    const moveBlue = () => {
      const firstRedIndex = info.indexOf('R');
      let blueCountFromStart = info.slice(firstRedIndex).filter((i) => i === 'B').length;

      const lastRedIndex = info.lastIndexOf('R');
      let blueCountFromEnd = info.slice(0, lastRedIndex).filter((i) => i === 'B').length;

      return Math.min(blueCountFromStart, blueCountFromEnd);
    };

    console.log(Math.min(moveRed(), moveBlue()));
  }
  process.exit();
});
