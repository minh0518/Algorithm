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
        const visited = []; // Ž���� ��ģ ����
                                        //�� �迭�� Ž�� ������� ��尡 ���ֽ��ϴ�
        let needVisit = []; // Ž���ؾ��� ����
      
        needVisit.push(startNode); // ��� Ž�� ����
      
        while (needVisit.length !== 0) { // Ž���ؾ��� ��尡 �����ִٸ�
          const node = needVisit.shift();
          if (!visited.includes(node)) { // �ش� ��尡 Ž���� �� ���ٸ�
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
