const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

const data = []

rl.on('line', (input) => {
  data.push(input)
}).on('close', () => {
  let [N, W, L] = data.shift().split(' ').map(Number)

  let trucks = data.shift().split(' ').map(Number)
	//다리들을 건너지 않은 대기중인 트럭들

  let count = 0
  let bridge = new Array(W).fill(0)

  while (bridge.length) {
		//console.log(bridge)
    bridge.shift()
    //console.log(bridge)
    count+=1

    if (trucks.length) { // 남은 트럭이 있는 경우에만 진행
                        // 남은 트럭이 없으면 bridge가 없어질 때까지 count+=1만 진행
                        // (=다리 위에 있는 마지막 트럭이 마저 건널때까지 count)

	    let currentTruck = trucks[0]
      let currentWeightOnBridge=bridge.reduce((a, b) => a + b, 0)

      if (currentWeightOnBridge + currentTruck > L) {//다리 하중때문에 못 들어감
        bridge.push(0) //큐의 왼쪽에서 땡김
      } else {
        bridge.push(currentTruck) //큐의 오른쪽에 추가
        trucks.shift() //다리를 건너기 시작한 트럭은 trucks에서 제거
      }
    }
		//console.log(bridge)
    //console.log('====================')
  }

  console.log(count)

  process.exit()
})

//다리에는 한번에 최대 w대의 트럭만 올라갈 수 있음
//다리를 건너려면 다리에서 w번 이동해야 함
//최대하중 L

//마지막까지 다 넘어간 시간까지 체크해야 함