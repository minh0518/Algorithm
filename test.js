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
  const Node = function (vertex, weight = 0) {
    this.vertex = vertex
    this.weight = weight
    this.link = null
  }

  const Graph = function (size) {
    this.graph = Array.from(
      { length: size },
      (e, i) => new Node(String.fromCharCode(65 + i)),
    )

    console.log(this.graph)
    //연결이 될 2개의 노드와 그 간선의 가중치를 인자로 받는다
    const insertNode = (v1, v2, w) => {
      const v1Node = new Node(v1, w)
      const v2Node = new Node(v2, w)

      //그래프는 배열이고, 이 배열의 값은 각 노드 객체가 들어가있다
      //이미 맨 처음부터 Array.from으로 만들어 놓았다

      //이때, a부터 저장이 돼 있으므로 똑같이 아스키코드를 통해
      //추가하고자 하는 노드값에 해당하는 인덱스를 가져오는 것이다
      const v1Idx = v1.charCodeAt(0) - 65
      const v2Idx = v2.charCodeAt(0) - 65

      //그 인덱스에 존재하는 노드를 가져온다
      let graph1 = this.graph[v1Idx]
      let graph2 = this.graph[v2Idx]

      //v1에 연결된 것이 없으면, v2를 이어준다
      if (graph1.link === null) {
        graph1.link = v2Node
      } else {
        //v1에 연결된 것이 있다면 연결된 것이 없을 때까지 타고 내려가서
        //마지막에 있는 것에다가 추가를 해준다
        while (graph1.link !== null) {
          graph1 = graph1.link
        }
        graph1.link = v2Node
      }

      //v1과 v2가 이어지면 v1과 v2도 연결해줘야 하고, v2와 v1도 연결해 줘야 한다

      if (graph2.link === null) {
        graph2.link = v1Node
      } else {
        while (graph2.link !== null) {
          graph2 = graph2.link
        }
        graph2.link = v1Node
      }

      return
    }

    Graph.prototype.insertEdge = function (v1, v2, w) {
      insertNode(v1, v2, w)
    }

    Graph.prototype.printGraph = function () {
      //간선 그래프 전체 출력
      for (let i = 0; i < size; i++) {
        let graph = this.graph[i]
        let print = graph.vertex
        while (graph.link !== null) {
          graph = graph.link
          print += `--[${graph.weight}]--${graph.vertex}`
        }
        console.log(print)
      }
    }

    Graph.prototype.getGraph = function () {
      return this.graph
    }
  }
  //여기까진 그냥 일반 그래프를 구현하는 것이었고

  //아래서부터 이제 힙을 이용해서 다익스트라를 구현

  // 매개변수: 힙, 그래프의 노드, 이동거리(가중치), 방문여부
  const heapPush = (h, g, move, isVisit) => {
    //해당 그래프의 노드에 연결된 모든 노드들을 힙에 추가하는 것이다

    // 다음 그래프가 null이 아닐 때 까지 검사
    // 즉 해당 노드 끝까지 보는 것이므로 한 노드에 연결된 모든 노드들
    // 보겠다는 것이다
    while (g.link !== null) {
      g = g.link // 가중치 0(자기 자신)은 넣지 않는다.

      // 방문 유무 검사 하기 위해서
      let idx = g.vertex.charCodeAt(0) - 65

      // 방문 하지 않은 경우 이제 힙에다가 더해줄 것이다
      if (!isVisit[idx]) {
        // g.weight + move: 여태 이동 가중치(move) + 현재 가중치를
        // 더해준다. 나머지도 같다

        //힙에 아무것도 없다면 그냥 추가만 한다
        if (!h.length) h.push({ v: g.vertex, w: g.weight + move })
        //힙에 값이 존재한다면
        else {
          if (h[0].w > g.weight) {
            //루트노드랑 비교
            let temp = h[0]
            h[0] = { v: g.vertex, w: g.weight + move }
            h.push(temp)

            //루트노드 자리에 이걸 넣어주고
            //맨 뒤에다가 기존에 있던 것을 다시 넣어준다
          } else {
            //기존 가중치보다 크다면 그냥 맨 뒤에 넣어준다
            h.push({ v: g.vertex, w: g.weight + move })
          }
        }
      }
    }
  }


                  //힙
  const heapPop = (h) => {

    //루트에 있는 힙 가져오기
    const item = h[0]
    const lastItem = h.pop()
    let idx = 0

    //pop했는데 길이가 0이면 결국 하나밖에 없었다는 것이므로 이걸 반환
    if (!h.length) return item

    //최소힙의 원리대로 맨 마지막에 있던 것을 루트로 넣음
    h[0] = lastItem

    // 자식 노드 유무 확인 없으면 더 이상 검사 하지 않음
    while (h[idx * 2 + 1] || h[idx * 2 + 2]) {
      let temp = 0

      // 각 노드의 가중치를 바탕으로
      // 왼쪽 자식노드 검사
      if (h[0].w > h[idx * 2 + 1].w) {
        //왼쪽 자식노드보다 가중치가 크면 내려가야 한다
        temp = h[0]
        h[0] = h[idx * 2 + 1]
        h[idx * 2 + 1] = temp
        idx = idx * 2 + 1
        //왼쪽 자식노드 인덱스 값을 넘겨줌
        //그래야 다음에는 여기서 비교한 왼쪽 자식노드를 기준으로
        //그 아래에 있는 노드들을 비교하니까
      }
      // 오른쪽 자식노드 검사
      else if (h[idx * 2 + 2] && h[0].w > h[idx * 2 + 2].w) {
        //오른쪽 자식노드는 존재하지 않을 수도 있으므로 조건을 하나 추가한다
        temp = h[0]
        h[0] = h[idx * 2 + 2]
        h[idx * 2 + 2] = temp
        idx = idx * 2 + 2
      }

      // 왼, 오른쪽 자식노드 둘 다 루트 노드보다 클 경우
      // 아예 깊이를 한단계 내려가야 한다
      // (1*2)+1 = 3, (1*2)+2 = 4
      // (2*2)+1 = 5, (2*2)+2 = 6
      //이렇게 보이듯이 idx를 하나 늘리면 아예 깊이가 내려가게 된다
      else idx++
    }
    return item
  }

  //다익스트라 만들기
  const dijkstra = (start, graph) => {
    const size = graph.length // 정점 개수!
    const isVisit = new Array(size).fill(false) 
    // 정점 개수 만큼 방문처리 유무를 검사하기 위한 배열
    const dist = [] // 거리 테이블
    const heap = [] // 힙
    let move = 0 // 이동 가중치
    let idx = start.charCodeAt(0) - 65 // 현재 인덱스
    let g = graph[idx] // 현재 그래프. 현재 노드에 연결되어있는 것들을 의미
    heap.push({ v: g.vertex, w: g.weight }) // 시작 그래프 노드 push

    while (heap.length) {

      //힙을 이용한 다익스트라는 매번 루트 힙을 빼와서,
      //그곳을 방문하게 된다
      g = heapPop(heap) //최소 힙에서 루트노드(최솟 값) 꺼내기!
      idx = g.v.charCodeAt(0) - 65 //방문 유무 검사하기 위한 인덱스

      // 방문 되지 않은 정점에 대해서만 작업을 한다.
      if (!isVisit[idx]) {
        isVisit[idx] = true
        move = g.w
        dist[idx] = move //거리테이블 값 수정
        //여기는 따로 더하지 않는다.
        //이미 힙에서 가중치를 계산해서 넣어놨기 때문에
        //힙에 있는 가중치만 가져와서 갱신하면 된다
        heapPush(heap, graph[idx], move, isVisit)
      }
    }

    console.log(dist)
  }

  const main = (function () {
    const graph = new Graph(6)

    //간선 만들기
    graph.insertEdge('A', 'B', 1)
    graph.insertEdge('A', 'C', 9)
    graph.insertEdge('B', 'C', 10)
    graph.insertEdge('B', 'D', 2)
    graph.insertEdge('C', 'D', 5)
    graph.insertEdge('C', 'E', 1)
    graph.insertEdge('D', 'E', 1)
    graph.insertEdge('E', 'F', 2)

    //간선 출력
    console.log('간선 출력')
    graph.printGraph()

    //다익스트라 알고리즘 실행!
    console.log('\nA의 최소 경로 출력')
    dijkstra('A', graph.getGraph())
  })()
  //메인로직을 함수로 만들고 바로 실행하기 위해서 ()를 마지막에 붙임

  process.exit()
})
