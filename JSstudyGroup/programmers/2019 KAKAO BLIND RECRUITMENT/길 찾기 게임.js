function solution(nodeinfo) {
  class BST {
    constructor(value, x) {
      this.value = value;
      this.x = x;
      this.left = null;
      this.right = null;
    }

    insert(value, x) {
      if (this.x < x) this._goRight(value, x);
      if (this.x > x) this._goLeft(value, x);
    }

    _goLeft(value, x) {
      if (this.left === null) {
        this.left = new BST(value, x);
      } else {
        this.left.insert(value, x);
      }
    }

    _goRight(value, x) {
      if (this.right === null) {
        this.right = new BST(value, x);
      } else {
        this.right.insert(value, x);
      }
    }
  }

  const N = nodeinfo.length;
  const nodes = nodeinfo.map((value, index) => {
    return [index + 1, value[0], value[1]];
  });

  nodes.sort((a, b) => b[2] - a[2]);

  // BST객체의 생성자로 this.x를 할당한다
  // 즉, 전역 스코프 BST객체의 this.x는 루트 노드의 x값
  const bst = new BST(nodes[0][0], nodes[0][1]);

  for (let i = 1; i < nodes.length; i++) {
    bst.insert(nodes[i][0], nodes[i][1]);
  }

  const preOrders = [];
  const preOrder = (node) => {
    preOrders.push(node.value);
    if (node.left) preOrder(node.left);
    if (node.right) preOrder(node.right);
  };

  const postOrders = [];
  const postOrder = (node) => {
    if (node.left) postOrder(node.left);
    if (node.right) postOrder(node.right);
    postOrders.push(node.value);
  };

  preOrder(bst);
  postOrder(bst);

  return [preOrders, postOrders];
}
