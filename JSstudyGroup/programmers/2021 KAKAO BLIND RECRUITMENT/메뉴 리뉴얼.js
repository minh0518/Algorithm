function solution(orders, course) {
    let info = orders.map((item) => item.split('').sort())

    // console.log(info)


    const getCombinations = function (arr, selectNumber) {
      const results = []
      if (selectNumber === 1) return arr.map((el) => [el])

      arr.forEach((fixed, index, origin) => {
        const rest = origin.slice(index + 1)
        const combinations = getCombinations(rest, selectNumber - 1)

        const attached = combinations.map((el) => [fixed, ...el])
        results.push(...attached)
      })

      return results
    }



    let status = {}

    for (let i = 0; i < course.length; i++) {
      for (let j = 0; j < info.length; j++) {
        getCombinations(info[j], course[i]).map((item) => {
          status[item.join('')] = status[item.join('')] === undefined ? 1 : status[item.join('')] + 1
        })
      }
    }

    //console.log(status)

    let menu = []
    for (let i = 0; i < course.length; i++) {
      let tmp = 0
      for (let j in status) {

        if (j.length === course[i]) {
          
          if (tmp < status[j]) {
            tmp = status[j]
          }
        }
      }

      if (tmp > 1) {
        for (let k in status) {
          if (k.length === course[i]) {
            if (tmp === status[k]) {
              menu.push(k)
            }
          }
        }
      }

      // console.log(menu)
    }

    return menu.sort()
  }

  console.log(solution(['ABCFG', 'AC', 'CDE', 'ACDE', 'BCFG', 'ACDEH'], [2, 3, 4]))
  console.log(solution(['ABCDE', 'AB', 'CD', 'ADE', 'XYZ', 'XYZ', 'ACD'], [2, 3, 5]))
  console.log(solution(['XYZ', 'XWY', 'WXA'], [2, 3, 4]))
  