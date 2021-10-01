const { off } = require('process');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let data=[]
let result=[];
let num;

rl.on('line', (input) => {
    data.push(input);
 });
rl.on('close',()=>{
  
    for(let i=0; i<data.length; i++){
        num=data[i]%42;
        if(result.indexOf(num) == -1){
          result.push(num);
        }
    }
    
    console.log(result.length);

  process.exit();
})


// indexOf 메소드는 인수로 넣어준 것이 해당 배열에 있으면 첫번쨰로 발견한 인덱스( 1, 0 , 1 가 있으면 1을 검색할시, [0] 만 뜨고 [2]는 뜨지 않습니다)
// 없을 경우 -1을 리턴합니다.
// 여기서는 우선 입력값들을 data에다가 다 받아놓고
// 하나씩 %42를 한 다음 각각 나온 값들을  새로운 배열 result에 indexOf로 검색해 봅니다
// 만약 result에 %42한 값이 없다면 바로 result에 집어넣게 됩니다.
// 처음 입력된 값들은 당연히 result배열에 똑같은 배열이 없으므로 바로 들어가겠지만

// 나중에 %42한 값이 result에 이미 있는 값이라면 들어가지 않습니다.
// 그 과정이 끝나면 마지막에 result배열의 길이를 출력합니다
// result배열에는 중복되는 값이 제거된 값들만 존재하기 때문입니다.
