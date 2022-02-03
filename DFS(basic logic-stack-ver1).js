const { off } = require('process')
const readline = require('readline')
const { callbackify } = require('util')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

const data = []

rl.on('line', (input) => {
  data.push(input)
}).on('close', () => {
    const graph = {
        A: ["B", "C"],
        B: ["A", "D"],
        C: ["A", "G", "H", "I"],
        D: ["B", "E", "F"],
        E: ["D"],
        F: ["D"],
        G: ["C"],
        H: ["C"],
        I: ["C", "J"],
        J: ["I"]
      };
      
      const DFS = (graph, startNode) => {
        const visited = []; // 탐색을 마친 노드들
                                        //이 배열에 탐색 순서대로 노드가 들어가있습니다
        let needVisit = []; // 탐색해야할 노드들
      
        needVisit.push(startNode); // 노드 탐색 시작
      
        while (needVisit.length !== 0) { // 탐색해야할 노드가 남아있다면
          const node = needVisit.shift();
          if (!visited.includes(node)) { // 해당 노드가 탐색된 적 없다면
            visited.push(node); 
            needVisit = [...graph[node], ...needVisit]; 
          }
        }
        return visited;
      };
        let result = DFS(graph, 'A').join(' ')
    
      console.log(result)
        //A B D E F C G H I J

  process.exit()
})
