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

  const result = [];
  let queue = [];
  while (N--) {
    const arr = data[data.length - N - 1].split(' ');

    let [command, num] = arr.length >= 2 ? [arr[0], Number(arr[1])] : [arr[0]];

    switch (command) {
      case 'push_front':
        queue = [num, ...queue];
        break;
      case 'push_back':
        queue.push(num);
        break;
      case 'pop_front':
        if (!queue.length) {
          result.push(-1);
        } else {
          result.push(queue.shift());
        }

        break;
      case 'pop_back':
        if (!queue.length) {
          result.push(-1);
        } else {
          result.push(queue.pop());
        }
        break;
      case 'size':
        result.push(queue.length);
        break;
      case 'empty':
        if (queue.length) result.push(0);
        if (!queue.length) result.push(1);
        break;
      case 'front':
        if (!queue.length) {
          result.push(-1);
        } else {
          result.push(queue[0]);
        }
        break;
      case 'back':
        if (!queue.length) {
          result.push(-1);
        } else {
          result.push(queue[queue.length - 1]);
        }
        break;
    }
  }

  console.log(result.join('\n'));

  process.exit();
});
