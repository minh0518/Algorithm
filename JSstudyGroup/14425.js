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
      //���� �������ٰ� start�� end�� ������ ��߳��� �Ǹ� �ݺ��� ����

      mid = parseInt((start + end) / 2) //�߰����� ã��

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