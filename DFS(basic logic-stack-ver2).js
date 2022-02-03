//ver1�� ��α׸� ���� stack�� ������ ���� ������ ���̸�
//ver2�� ��α׸� �������� ������ �˰��� ��Ʃ�꿡�� ����� ��Ĵ�� �����غ� ���Դϴ�
//
//ver2�� �����ϴ� �������� graph�� ǥ���ϴ� ��Ŀ� ���� ������ ������ �͵���
//�� ������ �Ǿ�����,
//�̹� �湮�ߴ� ���� Ȯ���ϴ� �������� ������ ������ ���� ��ġ�� �κ��� �־
//���κ��� ��α׹�Ĵ�� �Ͽ��� �Ʒ��κ��� ������ ��Ĵ�� �� ���ҽ��ϴ�
//�ڼ��� ��� ������ ��ǿ� �ʱ��� �ξ����ϴ�




//��α� ���
const graph = [
  [],
  [2, 3, 8],
  [1, 7],
  [1, 4, 5],
  [3, 5],
  [3, 4],
  [7],
  [2, 6, 8],
  [1, 7],
]

//let visited = new Array(9).fill(false) //������� ����

const dfs = (graph, startNode) => {
  const order = [] // Ž���� ��ģ ����
  //�� �迭�� Ž�� ������� ��尡 ���ֽ��ϴ�
  let stack = []

  stack.push(startNode)

  while (stack.length) {
    let node = stack.shift()
    if (!order.includes(node)) {
      //oder�� ���� ���ٸ� ����
      order.push(node)
      stack = [...graph[node], ...stack]
    }
  }
  return order
}
let result = dfs(graph, 1).join(' ')

console.log(result)






//������ ���
const graph = [
  [],
  [2, 3, 8],
  [1, 7],
  [1, 4, 5],
  [3, 5],
  [3, 4],
  [7],
  [2, 6, 8],
  [1, 7],
]

let visited = new Array(9).fill(false)

const dfs = (graph, startNode) => {
  //const order=[] //������� ����
  let stack = []

  stack.push(startNode)

  while (stack.length) {
    let node = stack.shift()
    if (!visited[node]) {
      //visited�迭 �� Ȯ��
      console.log(node) //�ٷ� ���� ���
      visited[node] = true
      stack = [...graph[node], ...stack]
    }
  }
}
dfs(graph, 1)
