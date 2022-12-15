const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const data = [];

rl.on('line', (input) => {
  data.push(input);
}).on('close', () => {
  let [N, W, L] = data.shift().split(' ').map(Number);
  //트럭수 , 다리길이, 최대하중

  let trucks = data.shift().split(' ').map(Number);

  let queue = []; // 다리

  let count = 0;

  while (trucks.length) {
    //console.log(`trucks ${trucks} ,  queue ${queue}`);
    let currentTruck = trucks[0]; //바로 shift를 하면 안된다

    if (queue.length === W) { // 다리에 공간이 없을 때
      queue.shift();
    }
    if (queue.length < W) { // 다리에 공간이 있을 때

      let currentWeightOnBridge = queue.reduce((a, b) => a + b, 0);

      if (currentTruck + currentWeightOnBridge <= L) { //다리에 추가 진입 가능하면
        trucks.shift(); // 비로소 트럭배열에서 제거
        queue.push(currentTruck);
      } 
      else { //다리에 추가 진입이 안되면
        queue.push(0);
      }
    }

    count += 1;
  }

  console.log(count + W);

  process.exit();
});