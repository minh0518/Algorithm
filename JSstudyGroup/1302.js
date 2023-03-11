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
  let books = data;

  let info = {};

  for (let i of books) {
    let book = i;
    info[book] = info[book] ? info[book] + 1 : 1;
  }

  let max=Math.max(...Object.values(info))
  let result=[]
  for(let i in info){
    let book=i
    if(info[book]===max){
      result.push(book)
    }
  }

  console.log(result.sort()[0])

  process.exit();
});
