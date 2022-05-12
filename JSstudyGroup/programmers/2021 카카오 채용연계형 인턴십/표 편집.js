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

      if (i === k) {
        select = cntNode;
      }
    }
  
    let trashBin = [];
  
    const moveSelectedNode = (count, direction) => {
      for (let i = 0; i < count; i++) {
        if (!select[direction]) {
          break;
        }//prev 나 next의 값이 존재하지 않으면 아무것도 안 함

        select = select[direction];

      }
    };
  
    const deleteNode = () => {
      const prev = select.prev;
      const next = select.next;
  
      trashBin.push(select);
  
      //현재 선택된 노드 변경
      select = next ? next : prev;
      //현재 노드에 next가 있으면 다음 노드가 있는 것이니까 다음 노드를 선택
      //없다면 다음 노드가 없는 것이니까 이전 노드를 선택
  
      //삭제한 노드를 기준으로 앞뒤 연결해주기
      if (prev) { 
        prev.next = next; 
      }
      if (next) {
        next.prev = prev;
      }

    };
  
    const recoverNode = () => {
      const targetNode = trashBin.pop();
  
      const prev = targetNode.prev;
      const next = targetNode.next;
  

      //꺼내와서 연결
      if (prev) {
        prev.next = targetNode;
      }
      if (next) {
        next.prev = targetNode;
      }
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
  console.log(solution(8,2,["D 2","C","U 3","C","D 4","C","U 2","Z","Z","U 1","C"]))