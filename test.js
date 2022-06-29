function solution(N, stages) {
  let answer = []

  let result = []
  for (let i = 0; i < N; i++) {
    let length = stages.length

    stages = stages.filter((item) => {
      return i + 1 < item
    })
    result.push([i + 1, (length - stages.length) / length])
  }

  // console.log(result)

  result.sort((a, b) => {
    return b[1] - a[1]
  })

  for (let i of result) {
    answer.push(i[0])
  }

  // console.log(answer)

  return answer
}