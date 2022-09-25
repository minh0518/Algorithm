const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

const data = []

rl.on('line', (input) => {
  data.push(input)
}).on('close', () => {
  function solution(cap, n, deliveries, pickups) {
    let total =
      deliveries.reduce((a, b) => a + b, 0) + pickups.reduce((a, b) => a + b, 0)

    //처음에는 택배들을 들고가고 무조건 다 비운 다음에
    //올때 무조건 재활용 박스들을 가지고 와야 함

    //그리고 반드시 끝에서부터 처리

    let distance = []
    let box = 0

    const go = () => {
      let tmp = []

      for (let i = n - 1; i >= 0; i--) {
        if (deliveries[i] == 0) continue

        tmp.push(i + 1)

        if (deliveries[i] + box >= cap) {
          deliveries[i] = deliveries[i] - (cap - box)
          total -= cap - box
          box = cap
        } else {
          total -= deliveries[i]
          box += deliveries[i]
          deliveries[i] = 0
        }

        if (box === cap) {
          box = 0
          break
        }
      }

      box = 0
      return tmp.shift()
    }

    const back = () => {
      let tmp = []

      for (let i = n - 1; i >= 0; i--) {
        if (pickups[i] == 0) continue

        tmp.push(i + 1)

        if (pickups[i] + box >= cap) {
          pickups[i] = pickups[i] - (cap - box)
          total -= cap - box
          box = cap
        } else {
          total -= pickups[i]
          box += pickups[i]
          pickups[i] = 0
        }

        if (box === cap) {
          box = 0
          break
        }
      }

      box = 0

      return tmp.shift()
    }

    let result = []
    while (total !== 0) {
      distance.push(go())
      distance.push(back())

      console.log(distance)

      result.push(Math.max(...distance), Math.max(...distance))

      distance = []
    }

    return result.reduce((a, b) => a + b, 0)
  }

  //solution(4, 5, [1, 0, 3, 1, 2], [0, 3, 0, 4, 0])
  solution(2, 7, [1, 0, 2, 0, 1, 0, 2], [0, 2, 0, 1, 0, 2, 0])
  process.exit()
})
