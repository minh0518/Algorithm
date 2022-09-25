function solution(today, terms, privacies) {
  const calc = (term, privacy) => {
    let detail = privacy.split('.').map(Number)
    //console.log(detail)

    if (term > 12) {
      //기간이 12보다 클 때

      let year = parseInt(term / 12)
      let month = parseInt(term % 12)

      //어차피 연도는 무조건 넘어감

      if (detail[2] === 1) {
        //연도가 넘어가고 일의자리가 1일때

        //연도가 넘어가고 일의자리가 1일때특수 케이스
        if (detail[1] + month === 13) {
          //30,'2022.07.01' > 2024.12.28 고려
          detail[2] = 28
          detail[1] = 12
          detail[0] = detail[0] + year
        } else {
          //연도가 넘어가고 일의자리가 1일때
          if (detail[1] + month > 12) {
            //연도가 넘어가고 일의자리가 1인데 개월수때문에 년도가 또 올라갈때
            //45 2022 9 1 >> 2026 5 28
            detail[2] = 28
            detail[1] = month + detail[1] - 12 - 1
            detail[0] = detail[0] + year + 1
          } else {
            //연도가 넘어가고 일의자리가 1
            detail[2] = 28
            detail[1] = month + detail[1] - 1
            detail[0] = detail[0] + year
          }
        }
      } else {
        //연도가 넘어가고 일의자리가 1이 아닌경우
        if (detail[1] + month > 12) {
          //연도가 넘어가고 일의자리가 1이 아닌데 개월수 때문에 연도가 올라갈 때
          //42 2022 8 28 >> 2026 2 27
          detail[2] = detail[2] - 1
          detail[1] = month + detail[1] - 12
          detail[0] = detail[0] + year + 1
        } else {
          //연도가 넘어가고 일의자리가 1이 아닌 경우
          detail[2] = detail[2] - 1
          detail[1] = month + detail[1]
          detail[0] = detail[0] + year
        }
      }
    } else {
      //기간이 12까지일때

      let addMonth = detail[1] + term

      if (addMonth > 12) {
        //연도가 넘어갈때

        if (detail[2] === 1) {
          //연도가 넘어가고 일의자리가 1일때

          //연도가 넘어가고 일의자리가 1일때특수 케이스
          if (addMonth === 13) {
            //6,'2021.07.01' 고려
            detail[2] = 28
            detail[1] = 12
          } else {
            //연도가 넘어가고 일의자리가 1일때 일반적인 경우
            detail[2] = 28
            detail[1] = term + detail[1] - 12 - 1
            detail[0] = detail[0] + 1
          }
        } else {
          //연도가 넘어가고 일의자리가 1이 아닌, 일반적인 경우
          detail[2] = detail[2] - 1
          detail[1] = term + detail[1] - 12
          detail[0] = detail[0] + 1
        }
      } else {
        //연도가 넘어가지 않을 때
        if (detail[2] === 1) {
          //연도가 넘어가지 않고 일의자리가 1인 경우
          detail[2] = 28
          detail[1] = detail[1] + term - 1
        } else {
          //연도가 넘어가지 않고 일의자리가 1이 아닌 일반적인  경우
          detail[2] = detail[2] - 1
          detail[1] = detail[1] + term
        }
      }
    }

    return detail.join('.')
  }

  terms = terms.map((i) => {
    return i.split(' ')
  })

  // console.log(terms)

  privacies = privacies.map((i) => {
    return i.split(' ')
  })

  // console.log(privacies)

  let validate = new Array(privacies.length).fill(0)

  for (let i = 0; i < privacies.length; i++) {
    for (let j = 0; j < terms.length; j++) {
      if (terms[j][0] === privacies[i][1]) {
        validate[i] = calc(Number(terms[j][1]), privacies[i][0])
      }
    }
  }
  //console.log(validate)

  let result = []

  validate.map((i, index) => {
    if (new Date(i) < new Date(today)) {
      result.push(index + 1)
    }
  })

  console.log(result)

  return result
}

solution('2024.11.01', ['Z 27'], ['2022.8.1 Z', '2022.10.21 Z'])
