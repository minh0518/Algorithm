const { off, mainModule } = require('process')
const readline = require('readline')
const { fileURLToPath } = require('url')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

const data = []

rl.on('line', (input) => {
  data.push(input)
}).on('close', () => {
  
  function solution(id_list, report, k) {

    let status={}

    id_list.map(item=>status[item]=[])
  //{ muzi: [], frodo: [], apeach: [], neo: [] }
//키는 신고 당한 유저
//값은 키를 신고한 유저들

    report.map(item=>{
      let [user_id,report_id]=item.split(' ')
      if(!(status[report_id].includes(user_id))){
          //stataus에서 신고당한 유저의 값에 지금 신고한 사람의 이름이 없으면
          status[report_id].push(user_id)   
      } 
    })

   // console.log(status)


    let answer=new Array(id_list.length).fill(0)
    for(let i in status){
      if(status[i].length>=k){
        status[i].map(item=>{
          return answer[id_list.indexOf(item)]++
        })
      }
    }

    return answer
  }

  
  console.log(solution(
    ["con", "ryan"],
    ["ryan con", "ryan con", "ryan con", "ryan con"],
    3
  ))
  


  //객체는 for in >> 키값만 출력이 됨


  // let a=[[1,2],[3,4],[5,6]]
  // let b=[[1,2],[3,4],[5,6]]
  // console.log(JSON.stringify(a[1])===JSON.stringify(b[2]))


  // let a=[1,2,3,4]
  // a.splice(2,1) //원본을 바꾸네 ㅁㅊ
  // console.log(a)

  process.exit()
})

