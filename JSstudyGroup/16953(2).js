const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const data = [];

rl.on('line', (input) => {
  data.push(input);
}).on('close', () => {
  let [A, B] = data.shift().split(' ').map(Number);

  const bfs = () => {
    const queue = [];

    // 초깃값 (시작숫자, count)
    queue.push([A, 1]);

    while (queue.length) {
      const [value, count] = queue.shift();

      const multiply = value * 2;
      const addOne = value * 10 + 1;

      if (multiply === B || addOne === B) {
        return count + 1;
      }

      if (multiply < B) {
        queue.push([multiply, count + 1]);
      }
      if (addOne < B) {
        queue.push([addOne, count + 1]);
      }
    }

    return -1;
  };
  console.log(bfs());

  process.exit();
});
