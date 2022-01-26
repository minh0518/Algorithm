const { off } = require('process');
const readline = require('readline');
const { callbackify } = require('util');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const data = [];

rl.on('line', (input) => {
    data.push(input);
}).on('close', () => {
    let N = Number(data.shift());
    let stack = [];
    let order = data;
  

    const calc = {
        pop: () => stack.pop() || -1,
        size: () => stack.length,
        empty: () => (stack[0] ? 0 : 1),
        top: () => stack[stack.length - 1] || -1,
        push: (item) => {
            stack.push(item.split(' ')[1]);
            return '';
        },
    };

    const result = order.reduce(
        (acc, v) => acc + (calc[v] ? `${calc[v]()}\n` : calc.push(v)),
        ''
    );
    console.log(result); 

    process.exit();
});
