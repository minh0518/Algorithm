const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

const data = []

rl.on('line', (input) => {
  data.push(input)
}).on('close', () => {
  let [N, e, w, s, n] = data.shift().split(' ')
  let probs = [e / 100, w / 100, s / 100, n / 100]

  let [dx, dy] = [
    [0, 0, 1, -1],
    [1, -1, 0, 0],
  ]

  let visited = []

  let answer=0

  const dfs = (x, y, depth, prob) => {

    
    visited.push([x, y])
    //if�� ���� �ݵ�� �̸� push�� ����� �Ѵ�
    //visited�� �������� ������ �ǰ� �ְ�
    //�湮�迭�� �켱 ��ǥ�� ��� ���� 
    //if���� �ɷ��� ���ϵȴٸ� pop�� ���ִµ�
    //�׷��� ���⼭ �������� �湮��(=push��) �� ��ǥ�� pop���ִ� ���̴�


                  //N�� 2��� 2�������� �湮�� �ϰ� 3��°���� ��
                  //�� �������� ó�� ��ġ�� ���� ������ �Ŷ� �����Ƿ�
                  //������ 1�̴�
    if (depth === (Number(N)+1)) {
      answer += prob
      return
    }

    for (let i = 0; i < 4; i++) {
      let nx = x + dx[i]
      let ny = y + dy[i]

      if (!isVisited([nx, ny])) {
        
        dfs(nx, ny, depth + 1, prob * probs[i])
        
        visited.pop() 

      }
    }
  }

  const isVisited = (arr) => {
    let [x, y] = arr

    let result = false

    visited.map((i) => {
      if (i[0] === x && i[1] === y) {
        result = true
      }
    })
    return result
  }

  dfs(0, 0, 1, 1)
  //�� �������� ó�� ��ġ�� ���� ������ �Ŷ� �����Ƿ�
  //depth�� ������ 1�̴�
  console.log(answer)

  process.exit()
})
