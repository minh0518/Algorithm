// ��ó : https://taesung1993.tistory.com/48
// ���׿� ���� ������ �̻����� �ڵ�� �ƴ� �� ����


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
    //������ �� 2���� ���� �� ������ ����ġ�� ���ڷ� �޴´�
    const insertNode = (v1, v2, w) => {
      const v1Node = new Node(v1, w)
      const v2Node = new Node(v2, w)

      //�׷����� �迭�̰�, �� �迭�� ���� �� ��� ��ü�� ���ִ�
      //�̹� �� ó������ Array.from���� ����� ���Ҵ�

      //�̶�, a���� ������ �� �����Ƿ� �Ȱ��� �ƽ�Ű�ڵ带 ����
      //�߰��ϰ��� �ϴ� ��尪�� �ش��ϴ� �ε����� �������� ���̴�
      const v1Idx = v1.charCodeAt(0) - 65
      const v2Idx = v2.charCodeAt(0) - 65

      //�� �ε����� �����ϴ� ��带 �����´�
      let graph1 = this.graph[v1Idx]
      let graph2 = this.graph[v2Idx]

      //v1�� ����� ���� ������, v2�� �̾��ش�
      if (graph1.link === null) {
        graph1.link = v2Node
      } else {
        //v1�� ����� ���� �ִٸ� ����� ���� ���� ������ Ÿ�� ��������
        //�������� �ִ� �Ϳ��ٰ� �߰��� ���ش�
        while (graph1.link !== null) {
          graph1 = graph1.link
        }
        graph1.link = v2Node
      }

      //v1�� v2�� �̾����� v1�� v2�� ��������� �ϰ�, v2�� v1�� ������ ��� �Ѵ�

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
      //���� �׷��� ��ü ���
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
  //������� �׳� �Ϲ� �׷����� �����ϴ� ���̾���

  //�Ʒ������� ���� ���� �̿��ؼ� ���ͽ�Ʈ�� ����

  // �Ű�����: ��, �׷����� ���, �̵��Ÿ�(����ġ), �湮����
  const heapPush = (h, g, move, isVisit) => {
    //�ش� �׷����� ��忡 ����� ��� ������ ���� �߰��ϴ� ���̴�

    // ���� �׷����� null�� �ƴ� �� ���� �˻�
    // �� �ش� ��� ������ ���� ���̹Ƿ� �� ��忡 ����� ��� ����
    // ���ڴٴ� ���̴�
    while (g.link !== null) {
      g = g.link // ����ġ 0(�ڱ� �ڽ�)�� ���� �ʴ´�.

      // �湮 ���� �˻� �ϱ� ���ؼ�
      let idx = g.vertex.charCodeAt(0) - 65

      // �湮 ���� ���� ��� ���� �����ٰ� ������ ���̴�
      if (!isVisit[idx]) {
        // g.weight + move: ���� �̵� ����ġ(move) + ���� ����ġ��
        // �����ش�. �������� ����

        //���� �ƹ��͵� ���ٸ� �׳� �߰��� �Ѵ�
        if (!h.length) h.push({ v: g.vertex, w: g.weight + move })
        //���� ���� �����Ѵٸ�
        else {
          if (h[0].w > g.weight) {
            //��Ʈ���� ��
            let temp = h[0]
            h[0] = { v: g.vertex, w: g.weight + move }
            h.push(temp)

            //��Ʈ��� �ڸ��� �̰� �־��ְ�
            //�� �ڿ��ٰ� ������ �ִ� ���� �ٽ� �־��ش�
          } else {
            //���� ����ġ���� ũ�ٸ� �׳� �� �ڿ� �־��ش�
            h.push({ v: g.vertex, w: g.weight + move })
          }
        }
      }
    }
  }


                  //��
  const heapPop = (h) => {

    //��Ʈ�� �ִ� �� ��������
    const item = h[0]
    const lastItem = h.pop()
    let idx = 0

    //pop�ߴµ� ���̰� 0�̸� �ᱹ �ϳ��ۿ� �����ٴ� ���̹Ƿ� �̰� ��ȯ
    if (!h.length) return item

    //�ּ����� ������� �� �������� �ִ� ���� ��Ʈ�� ����
    h[0] = lastItem

    // �ڽ� ��� ���� Ȯ�� ������ �� �̻� �˻� ���� ����
    while (h[idx * 2 + 1] || h[idx * 2 + 2]) {
      let temp = 0

      // �� ����� ����ġ�� ��������
      // ���� �ڽĳ�� �˻�
      if (h[0].w > h[idx * 2 + 1].w) {
        //���� �ڽĳ�庸�� ����ġ�� ũ�� �������� �Ѵ�
        temp = h[0]
        h[0] = h[idx * 2 + 1]
        h[idx * 2 + 1] = temp
        idx = idx * 2 + 1
        //���� �ڽĳ�� �ε��� ���� �Ѱ���
        //�׷��� �������� ���⼭ ���� ���� �ڽĳ�带 ��������
        //�� �Ʒ��� �ִ� ������ ���ϴϱ�
      }
      // ������ �ڽĳ�� �˻�
      else if (h[idx * 2 + 2] && h[0].w > h[idx * 2 + 2].w) {
        //������ �ڽĳ��� �������� ���� ���� �����Ƿ� ������ �ϳ� �߰��Ѵ�
        temp = h[0]
        h[0] = h[idx * 2 + 2]
        h[idx * 2 + 2] = temp
        idx = idx * 2 + 2
      }

      // ��, ������ �ڽĳ�� �� �� ��Ʈ ��庸�� Ŭ ���
      // �ƿ� ���̸� �Ѵܰ� �������� �Ѵ�
      // (1*2)+1 = 3, (1*2)+2 = 4
      // (2*2)+1 = 5, (2*2)+2 = 6
      //�̷��� ���̵��� idx�� �ϳ� �ø��� �ƿ� ���̰� �������� �ȴ�
      else idx++
    }
    return item
  }

  //���ͽ�Ʈ�� �����
  const dijkstra = (start, graph) => {
    const size = graph.length // ���� ����!
    const isVisit = new Array(size).fill(false) 
    // ���� ���� ��ŭ �湮ó�� ������ �˻��ϱ� ���� �迭
    const dist = [] // �Ÿ� ���̺�
    const heap = [] // ��
    let move = 0 // �̵� ����ġ
    let idx = start.charCodeAt(0) - 65 // ���� �ε���
    let g = graph[idx] // ���� �׷���. ���� ��忡 ����Ǿ��ִ� �͵��� �ǹ�
    heap.push({ v: g.vertex, w: g.weight }) // ���� �׷��� ��� push

    while (heap.length) {

      //���� �̿��� ���ͽ�Ʈ��� �Ź� ��Ʈ ���� ���ͼ�,
      //�װ��� �湮�ϰ� �ȴ�
      g = heapPop(heap) //�ּ� ������ ��Ʈ���(�ּ� ��) ������!
      idx = g.v.charCodeAt(0) - 65 //�湮 ���� �˻��ϱ� ���� �ε���

      // �湮 ���� ���� ������ ���ؼ��� �۾��� �Ѵ�.
      if (!isVisit[idx]) {
        isVisit[idx] = true
        move = g.w
        dist[idx] = move //�Ÿ����̺� �� ����
        //����� ���� ������ �ʴ´�.
        //�̹� ������ ����ġ�� ����ؼ� �־���� ������
        //���� �ִ� ����ġ�� �����ͼ� �����ϸ� �ȴ�
        heapPush(heap, graph[idx], move, isVisit)
      }
    }

    console.log(dist)
  }

  const main = (function () {
    const graph = new Graph(6)

    //���� �����
    graph.insertEdge('A', 'B', 1)
    graph.insertEdge('A', 'C', 9)
    graph.insertEdge('B', 'C', 10)
    graph.insertEdge('B', 'D', 2)
    graph.insertEdge('C', 'D', 5)
    graph.insertEdge('C', 'E', 1)
    graph.insertEdge('D', 'E', 1)
    graph.insertEdge('E', 'F', 2)

    //���� ���
    console.log('���� ���')
    graph.printGraph()

    //���ͽ�Ʈ�� �˰��� ����!
    console.log('\nA�� �ּ� ��� ���')
    dijkstra('A', graph.getGraph())
  })()
  //���η����� �Լ��� ����� �ٷ� �����ϱ� ���ؼ� ()�� �������� ����

  process.exit()

