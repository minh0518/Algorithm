const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

const data = []

rl.on('line', (input) => {
  data.push(input)
}).on('close', () => {
  const MissionUtils = require('@woowacourse/mission-utils')

  class Lotto {
    #numbers

    constructor() {
      this.#numbers = Randoms.pickUniqueNumbersInRange(1, 45, 6)
    }
  }

  class LottoMachine {
    execute() {
      const lotto = new Lotto()
    }
  }

  process.exit()
})
