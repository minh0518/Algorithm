const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const data = [];

rl.on('line', (input) => {
  data.push(input);
}).on('close', () => {
  let [a, b, c] = data.shift().split(' ').map(Number);

  let visited = new Array(a + 1).fill().map(() => new Array(b + 1).fill().map(() => new Array(c + 1).fill(false)));
  //8을 넣으면 [7]까지니까 [8]까지 표현하기 위해 +1

  let answer = [];

  const bfs = () => {
    let queue = [];
    queue.push([0, 0, c]);



    while (queue.length) {
      let [statusA,statusB,statusC]=queue.shift()

      if(visited[statusA][statusB][statusC]) continue
      visited[statusA][statusB][statusC]=true

      if(statusA===0){
        answer.push(statusC)
      }

      //a to b
      if(statusA+statusB>a){//a와b합이 a보다 크면 a에 다 넣고 나머지 b
        queue.push([a,(statusA+statusB)-a,statusC])
      }
      else{ //a보다 합이 작으면 a에 다 몰아넣기
        queue.push([statusA+statusB,0,statusC])
      }

      //b to a
      if(statusA+statusB>b){
        queue.push([(statusA+statusB)-b,b,statusC])
      }
      else{
        queue.push([0,statusA+statusB,statusC])
      }

      //b to c
      if(statusB+statusC>c){ //c보다 크면 c에 넣고 나머지 b
        queue.push([statusA,(statusB+statusC)-c,c])
      }
      else{
        queue.push([statusA,0,statusB+statusC])
      }

      //c to b
      if(statusB+statusC>b){
        queue.push([statusA,b,(statusB+statusC)-b])
      }
      else{
        queue.push([statusA,statusB+statusC,0])
      }

      //a to c
      if(statusA+statusC>c){ //c보다크면 c에 넣고 나머지 a
        queue.push([(statusA+statusC)-c,statusB,c])
      }
      else{
        queue.push([0,statusB,(statusA+statusC)])
      }

      //c to a
      if(statusA+statusC>a){
        queue.push([a,statusB,(statusA+statusC)-a])
      }
      else{
        queue.push([(statusA+statusC),statusB,0])
      }


    }
    
  };

  bfs();

  console.log(answer.sort((a,b)=>a-b).join(' '))

  process.exit();
});

//ab
//ac
//ba
//bc
//ca
//cb
