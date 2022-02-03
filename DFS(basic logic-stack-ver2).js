//ver1은 블로그를 보고 stack을 구현한 것을 가져온 것이며
//ver2는 블로그를 바탕으로 나동빈 알고리즘 유튜브에서 사용한 방식대로 수정해본 것입니다
//
//ver2를 구현하는 과정에서 graph를 표현하는 방식에 따른 나머지 수정할 것들은
//다 수정이 되었지만,
//이미 방문했던 것을 확인하는 과정에서 각자의 로직이 서로 겹치는 부분이 있어서
//윗부분은 블로그방식대로 하였고 아랫부분은 나동빈 방식대로 해 보았습니다
//자세한 모든 내용은 노션에 필기해 두었습니다




//블로그 방식
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

//let visited = new Array(9).fill(false) //사용하지 않음

const dfs = (graph, startNode) => {
  const order = [] // 탐색을 마친 노드들
  //이 배열에 탐색 순서대로 노드가 들어가있습니다
  let stack = []

  stack.push(startNode)

  while (stack.length) {
    let node = stack.shift()
    if (!order.includes(node)) {
      //oder에 값이 없다면 실행
      order.push(node)
      stack = [...graph[node], ...stack]
    }
  }
  return order
}
let result = dfs(graph, 1).join(' ')

console.log(result)






//나동빈 방식
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
  //const order=[] //사용하지 않음
  let stack = []

  stack.push(startNode)

  while (stack.length) {
    let node = stack.shift()
    if (!visited[node]) {
      //visited배열 값 확인
      console.log(node) //바로 정답 출력
      visited[node] = true
      stack = [...graph[node], ...stack]
    }
  }
}
dfs(graph, 1)
