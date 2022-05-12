function solution(n, k, cmd) {
    const Node = function (index, prev) {
      this.index = index;
      this.prev = prev;
      this.next = null;
    };
  
    let prevNode = new Node(0);
    let select; //���õ� ���
  
    // ��ũ�帮��Ʈ ����
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
        }//prev �� next�� ���� �������� ������ �ƹ��͵� �� ��

        select = select[direction];

      }
    };
  
    const deleteNode = () => {
      const prev = select.prev;
      const next = select.next;
  
      trashBin.push(select);
  
      //���� ���õ� ��� ����
      select = next ? next : prev;
      //���� ��忡 next�� ������ ���� ��尡 �ִ� ���̴ϱ� ���� ��带 ����
      //���ٸ� ���� ��尡 ���� ���̴ϱ� ���� ��带 ����
  
      //������ ��带 �������� �յ� �������ֱ�
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
  

      //�����ͼ� ����
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