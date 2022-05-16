const { off, mainModule } = require('process')
const readline = require('readline')
const { fileURLToPath } = require('url')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

const data = []

rl.on('line', (input) => {
  data.push(input)
}).on('close', () => {

  let N=Number(data.shift())
  let half=N/2
  let point=data.map(item=>item.split(' ').map(Number))
  let visited=new Array(N).fill(0)

  let min = Infinity
  const start = []
  let link = []


  function dfs(index) {
 
    
    if (index === half) {
      let startSum = 0;
      let linkSum = 0;
    
      // start팀에는 이미 5명이 들어갔으므로 나머지 없는 인원들을
      // link팀에다가 넣음
      for (let i = 1; i <= N; i++) {
        if (start.indexOf(i) === -1) {
          link.push(i);
        }
      }
    
      // 스타트와 링크 팀의 값을 더한다.
      for (let j = 0; j < half - 1; j++) {
        for (let k = j + 1; k < half; k++) {
          startSum +=
            point[start[j] - 1][start[k] - 1] + point[start[k] - 1][start[j] - 1];
          linkSum +=
            point[link[j] - 1][link[k] - 1] + point[link[k] - 1][link[j] - 1];
        }
      }
   
      let diff = Math.abs(linkSum - startSum);
   
      if (min > diff) {
        min = diff;
      }
   
      link = []; //link 팀 비움
                //이 로직은 start에 팀을 넣고 나머지를 link에다가 넣고 있으므로
      return;
    
    }
    
    // 수열을 만들기 위한 백트래킹
    for (let i = 0; i < N; i++) {
      if (visited[i] === 1) continue;
   
      visited[i] = 1;
      start.push(i + 1);
      dfs(index + 1);
      //다음 인덱스로 재귀 호출
			//이건 i가 아니라 index이다
			//결국 해당 재귀 레벨들은 각자 고유의 index값을 가지고 있다
   
      start.pop();
      visited[i] = 0;
      //마지막으로 방문했던 곳을 방문하지 않은 것으로 바꿈
      //즉, 직전을 방문하지 않은 것으로 하고, 그 다음 경우를 따지겠다는 것이다
    }
  }

  dfs(0)

  console.log(min)
  

  process.exit()
})