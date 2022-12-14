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
  let logs = data.map((i) => i.split(''));

  const analyze = (log) => {
    let leftStack = [];
    let rightStack = [];
    for (let i = 0; i < log.length; i++) {
      let target = log[i];
      if (target === '<') {
        if(!leftStack.length) continue
        rightStack.push(leftStack.pop()) 
      } else if (target === '>') {
        if(!rightStack.length) continue
        leftStack.push(rightStack.pop())
      } else if (target === '-') {
        leftStack.pop()
      } else {
        leftStack.push(target)
      }
    }

    return leftStack.join('')+(rightStack.reverse()).join('')

  };

  let result=[]
  for (let i = 0; i < N; i++) {
    let log = logs[i];
    result.push(analyze(log))
    
  }

  console.log(result.join('\n'))
  process.exit();
});