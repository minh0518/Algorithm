function solution(lottos, win_nums) {
  const rank = [6, 6, 5, 4, 3, 2, 1]

  let minCount = lottos.filter((v) => win_nums.includes(v)).length
  //ÇöÀç ¸ÂÃá °¹¼ö

  //let zeroCount = lottos.filter((v) => !v).length
  let zeroCount = lottos.filter((v) => v === 0).length
  //0ÀÇ °¹¼ö

  // console.log(minCount)
  // console.log(zeroCount)

  const maxCount = minCount + zeroCount

  return [rank[maxCount], rank[minCount]]
}
