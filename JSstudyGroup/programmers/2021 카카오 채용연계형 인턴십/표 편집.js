function solution(n, k, cmd) {
  class Node {
    constructor(index) {
      this.index = index;
      this.prev = null;
      this.next = null;
    }
  }

  // 최초 노드 생성
  let prevNode = new Node(0);

  // 현재 선택된 노드
  let current;

  // 1번 노드부터 생성 및 양방향 연결 진행
  for (let i = 1; i < n; i++) {
    const newNode = new Node(i);

    newNode.prev = prevNode;
    prevNode.next = newNode;
    prevNode = newNode;

    if (i === k) current = newNode;
  }

  const removed = [];

  const moveCurrent = (dir, count) => {
    let index = 0;
    while (index++ < count) {
      if (dir === 'D' && current.next) current = current.next;
      if (dir === 'U' && current.prev) current = current.prev;
    }
  };

  const deleteNode = () => {
    const prev = current.prev;
    const next = current.next;

    removed.push(current);
    if (next) current = next;
    else current = prev;

    if (prev) prev.next = next;
    if (next) next.prev = prev;
  };

  const rollBack = () => {
    const target = removed.pop();
    const prev = target.prev;
    const next = target.next;

    if (prev) prev.next = target;
    if (next) next.prev = target;
  };

  for (let singleCmd of cmd) {
    const [command, degree] = singleCmd.split(' ');

    if (command === 'U' || command === 'D') moveCurrent(command, degree);

    if (command === 'C') deleteNode();

    if (command === 'Z') rollBack();
  }

  const result = new Array(n).fill('O');
  for (const removedNode of removed) {
    result[removedNode.index] = 'X';
  }

  return result.join('');
}
