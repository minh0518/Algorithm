const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

const data = []

rl.on('line', (input) => {
  data.push(input)
}).on('close', () => {

  let target=['<b>리멤버</b> 투 블링크','<b>리멤버</b> 미','<b>리멤버</b>']

  target=target.map(i=>{
    return (i.split('<b>').join('')).split('</b>').join('').length
  })

  let minLength=Math.min(...target)


  console.log(target)
  console.log(minLength)

  console.log(target.indexOf(minLength))

    process.exit()
})



