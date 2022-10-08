const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

const data = []

rl.on('line', (input) => {
  data.push(input)
}).on('close', () => {

  let N = +data.shift()

  let time = data.map((i) => i.split(' ').map(Number))

  time = time.sort((a, b) => {
    return b[1]-a[1]
  })


  let current=time[0][1]-time[0][0]
  for(let i=1; i<N; i++){
      if(current<time[i][1]){
        time[i][1]=current
        current=time[i][1]-time[i][0]
      }
      else{
        current=time[i][1]-time[i][0]
      }
  }

  if(current<0){
    console.log(-1)
  }
  else{
    console.log(current)
  }
  


  process.exit()
})


//[ [ 5, 20 ], [ 1, 16 ], [ 8, 14 ], [ 3, 5 ] ]


// 20시에서 5시간하면 15시

// 16시까지 해야하지만 땡겨서
//( 16시까지 끝내기만 하면 되는 거라 15시까지 끝내도 무방
//이렇게 하는 이유가 마지막을 기준으로 최대한 땡겨야 시작을 늦출 수 있음)

// 15시에서 1시간하면 14시
//동일하므로 그대로 진행

// 14시에서 8시간빼면 6시
//그렇지만 끝내는 시간을 땡길수는 있지만 늦출 수는 없으므로
//그대로 진행

// 2시에 시작


// >> 

// 뺀 시간 < 마감시간 (뺀 시간이 더 이전일때)
// 뺀 시간=마감시간

// 뺀 시간 >=마감시간 
// 마감시간은 그대로






// 현재시간 > 다음 작업 시작시간
// 다음작업 시작시간-다음작업 소요시간

// 현재시간 <= 다음 작업 시작시간
// 현재시간-다음작업 소요시간