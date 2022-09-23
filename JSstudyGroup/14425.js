const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

const data = []

rl.on('line', (input) => {
  data.push(input)
}).on('close', () => {

  let [N,M]=data.shift().split(' ').map(Number)

  let S=data.slice(0,N).sort()

  let find=data.slice(N)


  const binarySearch = function (arr, target) {
    let start = 0
    let end = arr.length - 1
    let mid

    while (start <= end) {
      //점점 좁혀지다가 start와 end의 순서가 어긋나게 되면 반복을 종료

      mid = parseInt((start + end) / 2) //중간지점 찾기

      if (target === arr[mid]) {
        return true
      } 
			else {
        if (target < arr[mid]) {
          end = mid - 1
        } else {
          start = mid + 1
        }
      }
    }
    return false
  }



let count=0

for(let i=0; i<find.length; i++){
  if(binarySearch(S,find[i])){
    count++
  }
}

console.log(count)
  

  
  process.exit()
})