function solution(n, info) {
    let answer = new Array(11).fill(0)

    function dfs(n, info, k, apeach, lion, temp) {



      if (n === 0) {
        if (lion - apeach > max_val) {
          max_val = lion - apeach 
          answer = Array.from(temp) 
        }

        else if (lion - apeach === max_val && max_val !== 0) {
          for (let i = 10; i >= 0; i--) {
            if (temp[i] > answer[i]) {
              answer = Array.from(temp)
              break
            } else if (temp[i] < answer[i]) {
              break
            }
          }
        }
      } 
			else {
        for (let i = k; i < info.length; i++) {
          if (n > info[i]) {
            temp[i] = info[i] + 1
            if (info[i] > 0) {
              dfs(n - temp[i],info,i + 1,apeach - (10 - i),lion + (10 - i),temp)
            } else {
              dfs(n - temp[i], info, i + 1, apeach, lion + (10 - i), temp)
            }
            temp[i] = 0
          } else {
            if (i === 10) {
              temp[i] = n 
              dfs(0, info, i + 1, apeach, lion, temp)
              temp[i] = 0
            } else {
              dfs(n, info, i + 1, apeach, lion, temp)
            }
          }
        }
      }
    }

    let max_val = 0

    let apeach = 0

    for (let i = 0; i < 11; i++) {
      if (info[i] > 0) {
        apeach += 10 - i
      }
    }

    dfs(n, info, 0, apeach, 0, new Array(11).fill(0))

    if (JSON.stringify(answer) === JSON.stringify(new Array(11).fill(0))) {
      answer = [-1]
    }

    return answer
  }