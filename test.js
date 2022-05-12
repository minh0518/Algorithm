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
  
  function solution(n, k, cmd) {

    const Node = function (index, prev) {
      this.index = index;
      this.prev = prev;
      this.next = null;
    };
  
    let prevNode = new Node(0);
    let select; //선택된 노드
  
    // 링크드리스트 생성
    for (let i = 1; i < n; i++) {
      const cntNode = new Node(i, prevNode);
      prevNode.next = cntNode;
      prevNode = cntNode;
  
      // 처음 선택된 노드 저장
      if (i === k) {
        select = cntNode;
      }
    }
  
    let trashBin = [];
  
    const moveSelectedNode = (count, direction) => {
      for (let i = 0; i < count; i++) {
        if (!select[direction]) break;
        select = select[direction];
      }
    };
  
    const deleteNode = () => {
      const prev = select.prev;
      const next = select.next;
  
      trashBin.push(select);
  
      select = next ? next : prev;
  
      if (prev) prev.next = next;
      if (next) next.prev = prev;
    };
  
    const recoverNode = () => {
      const targetNode = trashBin.pop();
  
      const prev = targetNode.prev;
      const next = targetNode.next;
  
      if (prev) prev.next = targetNode;
      if (next) next.prev = targetNode;
    };
  
    cmd.forEach((c) => {
      switch (c[0]) {
        case "U":
          moveSelectedNode(c.split(" ")[1], "prev");
          break;
        case "D":
          moveSelectedNode(c.split(" ")[1], "next");
          break;
        case "C":
          deleteNode();
          break;
        case "Z":
          recoverNode();
          break;
      }
    });
  
    let result = Array(n).fill("O");
    trashBin.forEach((node) => {
      result[node.index] = "X";
    });
    return result.join("");

    
  }

  console.log(solution(8,2,["D 2","C","U 3","C","D 4","C","U 2","Z","Z"]))


  process.exit()
})
