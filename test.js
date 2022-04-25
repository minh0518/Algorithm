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



  function solution(n, info) {
    const result = { 
      gap: 0, 
      answer: [-1] 
    }

    const dfs = (n, index,stack) => {
      if (n === 0) { 

        const state = Array.from(stack)
        const scores = checkScore(state, info)

        if (scores[0] > scores[1] && scores[0] - scores[1] >= result.gap) {
            
          if (scores[0] - scores[1] > result.gap) {
            result.gap = scores[0] - scores[1]
            result.answer = state
            

          } else {
            const [pre, current] = checkLevel(result.answer, state)
            result.answer = (pre >= current) ? result.answer : state
            
          }
        }

      }


      if (n > 0) {
        for (let idx = index; idx < info.length; idx++) {
          const state = (n - (info[idx] + 1)) >= 0 ? info[idx] + 1 : n
          //n-어피치화살 +1 한 값이 0이상이면 아직 쏘는게 가능한 것
          //그래서 어피치화살 +1 을 사용(라이언이 점수 가져감)하고
          // (어차피 이게 남은 화살 수)

          //0보다 작으면 그만큼 화살을 못 쏨
          //그래서 그 부분은 그대로 화살 갯수 n으로 둠
          //n으로 남겨둔 이유가 저렇게 해야 어차피 재귀에서  n-state가 0이 되어서
          //어차피 재귀가 바로 끝나고 다음 코드에서 0으로 처리가 됨


          //여기서 stack이 라이언 배열
          //각 인덱스에다가 화살 수를 넣어준다
          stack[idx] = state
          dfs(n - state, idx + 1, stack)
          //5-3 0+1(재귀호출)

                //<이 단계는 남은 화살이 2 , 인덱스는 1부터 비교>
                //2-2 1+1(재귀호출)  
                      //<이 단계는 남은 화살이 0(n==0) 이므로 여기서 끝>(위에 if문에서 점수 비교)
                //stack[1] = 0
                //n은 여전히 2, 다음 idx=2부터 for문  시작

                //2-2 2+1(재귀호출)
                      //<이 단계는 남은 화살이 0(n==0) 이므로 여기서 끝>(위에 if문에서 점수 비교)
                //stack[2] = 0
                //n은 여전히 2, 다음 idx=3부터 for문  시작

                //2-2 3+1(재귀호출)
                      //<이 단계는 남은 화살이 0(n==0) 이므로 여기서 끝>(위에 if문에서 점수 비교)
                //stack[3] = 0
                //n은 여전히 2, 다음 idx=4부터 for문  시작

                // (보면 info[4]는0이다. 그러므로 state는 1이 된다)
                //2-1 4+1(재귀호출)

                      //<이 단계는 남은 화살이 1, 인덱스는 5부터 비교>
                      //1-1 5+1(재귀 호출)
                            ////<이 단계는 남은 화살이 0(n==0) 이므로 여기서 끝>(위에 if문에서 점수 비교)
                      //stack[5]=0


                      //1-1 6+1(재귀 호출)
                            //<이 단계는 남은 화살이 0(n==0) 이므로 여기서 끝>(위에 if문에서 점수 비교)
                      //stack[6]=0
                      
                      //남은 info배열의 값이 다 0이다
                      //그러므로 무조건 state는1이 되고
                      //여기서 호출되는 모든 재귀는 전부 state-n이므로
                      //1-1이 된다 그러므로 모든 재귀는 바로 위에 if에서
                      //점수 비교만 하고 끝나버린다
                      

                //stack[4] = 0




          //stack[0] = 0

          //for문때문에 그 다음에는 마찬가지로 n=5 , idx는1인 것부터 시작
        

          //idx 2부터 다시 시작
          //남은 화살 갯수 , 라이언 배열의 다음 인덱스, 라이언 배열


          stack[idx] = 0
        

          //화살이 남아있다면 재귀를 호출해서 남은 구간까지 전부 다 모든 경우의 수를 두고
          //탐색을 하는 것이다

          //탐색이 끝나면 다시 해당 부분을 0 처리하고(그니까 여기서 안 쐈을 경우도 고려해야 하니까)
          //다음 부분부터 또다시 탐색을 시작하는 것이다
          //0 부분을 처리하고 for때문에 다음 인덱스부터 탐색을 또 하게 되면
          //어차피 stack이 라이언의 점수이므로 n==0일때 checkScore에서 해당 stack을 가지고
          //점수 비교하는데 쓰이게 된다

          //이렇게 하면 모든 경우를 전부 탐색하게 된다
          
        }
      }
    }

    dfs(n, 0,new Array(11).fill(0))

    return result.answer



    function checkScore(ryan, ape) {
      return ryan.reduce(
        (result, score, idx) => {
          if (score !== 0 || ape[idx] !== 0) {
            score <= ape[idx]? (result[1] += 10 - idx): (result[0] += 10 - idx)
          }
          return result 
        },
        [0, 0], 
      )
    }



    function checkLevel(arrA, arrB) {

      const pre = arrA.reduce((t, c, idx) => t + c * (10 * idx), 0)
      const current = arrB.reduce((t, c, idx) => t + c * (10 * idx), 0)

      return [pre, current]
    }
  }


  console.log(solution(9,[0,0,1,2,0,1,1,1,1,1,1],[1,1,2,0,1,2,2,0,0,0,0]))


  

  process.exit()
})

