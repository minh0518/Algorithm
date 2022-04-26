//주석과 설명은 Notion에 있습니다

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
          stack[idx] = state
          dfs(n - state, idx + 1, stack)
          stack[idx] = 0
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


            //기존 값, 현재
    function checkLevel(arrA, arrB) {
      //console.log(arrA, arrB)
      const pre = arrA.reduce((t, c, idx) => t + c * (10 * idx), 0)
      const current = arrB.reduce((t, c, idx) => t + c * (10 * idx), 0)
      //console.log([pre, current])
      return [pre, current]
    }
  }


  console.log(solution(9,[0,0,1,2,0,1,1,1,1,1,1],[1,1,2,0,1,2,2,0,0,0,0]))