function solution(nodeinfo) {
  // 트리의 노드
  class Node {
    constructor(value, x) {
      this.value = value;
      this.x = x; // x 좌표
      this.left = null;
      this.right = null;
    }
  }

  // 이진 트리
  class BST {
    // 시작점이 되는 루트 노드
    constructor() {
      this.root = null;
    }

    // 트리에 노드 삽입
    insert(value, x) {
      const newNode = new Node(value, x);

      if (this.root === null) {
        this.root = newNode;
        return;
      }

      // 루트부터 x좌표를 기준으로 해당 위치 탐색
      // 재귀 탐색을 하며 해당 노드로 가야 할 때, 해당 노드가 비어있다면 그 자리에 노드 삽입한다
      const searchTree = (currentNode, newNode) => {
        if (currentNode.x > newNode.x) {
          if (currentNode.left === null) currentNode.left = newNode; // 삽입
          else searchTree(currentNode.left, newNode);
        }
        if (currentNode.x < newNode.x) {
          if (currentNode.right === null) currentNode.right = newNode; // 삽입
          else searchTree(currentNode.right, newNode);
        }
      };

      searchTree(this.root, newNode);
    }
  }

  const nodes = nodeinfo.map((value, index) => {
    return [index + 1, value[0], value[1]]; // [노드번호, x좌표, y좌표]
  });

  // Y축 좌표 기준 내림차순 정렬
  nodes.sort((a, b) => b[2] - a[2]);

  const bst = new BST();
  for (let i = 0; i < nodes.length; i++) {
    bst.insert(nodes[i][0], nodes[i][1]);
  }

  const preOrders = [];
  const preOrder = (node) => {
    // 루트 노드일 경우 .root.value 로 접근해야 하므로
    // 일관된 프로퍼티 접근(.value)을 위해 일반 노드로 변환
    if (node.root) node = node.root;

    preOrders.push(node.value);
    if (node.left) preOrder(node.left);
    if (node.right) preOrder(node.right);
  };

  const postOrders = [];
  const postOrder = (node) => {
    if (node.root) node = node.root;
    if (node.left) postOrder(node.left);
    if (node.right) postOrder(node.right);
    postOrders.push(node.value);
  };

  preOrder(bst);
  postOrder(bst);

  return [preOrders, postOrders];
}
