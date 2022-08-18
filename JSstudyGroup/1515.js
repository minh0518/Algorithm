const { count, time } = require('console')
const { off, mainModule } = require('process')
const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

const data = []

rl.on('line', (input) => {
  data.push(input)
}).on('close', () => {
  let N = data.shift().split('')

  // let tmp = []
  // for (let i = 0; i < N.length; i++) {
  //   for (let j = N.length - 1; j >= i; j--) {
  //     tmp.push(N.slice(i, j + 1))
  //   }
  // }

  let tmp = 1
  let index = 0

  let result

  const check=()=>{
  while (1) {
    
    for(let i=0; i<(tmp + '').length; i++){
      if((tmp+'')[i]==N[index]){
        index++
      }
      if (index === N.length) {
        return tmp
      }
    }
    // if ((tmp + '').split('').indexOf(N[index]) !== -1) {
    //   index++
    // }
    
    tmp++
  }
    
  }

  console.log(check())

  // let tmp=12
  // console.log((tmp+'').split(''))
  // console.log((tmp+'').split('').indexOf('1'))
  // console.log((tmp+'').split('').indexOf('2'))
  // console.log((tmp+'').split('').indexOf('7'))

  process.exit()
})
