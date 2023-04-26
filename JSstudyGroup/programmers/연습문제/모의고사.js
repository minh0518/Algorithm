function solution(answers) {

    let answer = []

    let a = [1, 2, 3, 4, 5]
    let b = [2, 1, 2, 3, 2, 4, 2, 5]
    let c = [3, 3, 1, 1, 2, 2, 4, 4, 5, 5]

    let count=[0,0,0]
    for (let i = 0; i < answers.length; i++) {
      if (answers[i] === a[i % a.length]) {
        count[0]++
      }
      if (answers[i] === b[i % b.length]) {
        count[1]++
      }
      if (answers[i] === c[i % c.length]) {
        count[2]++
      }
    }

    for(let i=0; i<count.length; i++){
      if (count[i]===Math.max(...count)){
        answer.push(i+1)
      }
    }
    
    return answer
  }