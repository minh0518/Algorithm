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

  let N=Number(data.shift())
  let half=N/2
  let point=data.map(item=>item.split(' ').map(Number))
  let visited=new Array(N).fill(0)

  let min = Infinity
  const start = []
  let link = []


  function dfs(index) {
 
    
    if (index === half) {
      let startSum = 0;
      let linkSum = 0;
    
      // start������ �̹� 5���� �����Ƿ� ������ ���� �ο�����
      // link�����ٰ� ����
      for (let i = 1; i <= N; i++) {
        if (start.indexOf(i) === -1) {
          link.push(i);
        }
      }
    
      // ��ŸƮ�� ��ũ ���� ���� ���Ѵ�.
      for (let j = 0; j < half - 1; j++) {
        for (let k = j + 1; k < half; k++) {
          startSum +=
            point[start[j] - 1][start[k] - 1] + point[start[k] - 1][start[j] - 1];
          linkSum +=
            point[link[j] - 1][link[k] - 1] + point[link[k] - 1][link[j] - 1];
        }
      }
   
      let diff = Math.abs(linkSum - startSum);
   
      if (min > diff) {
        min = diff;
      }
   
      link = []; //link �� ���
                //�� ������ start�� ���� �ְ� �������� link���ٰ� �ְ� �����Ƿ�
      return;
    
    }
    
    // ������ ����� ���� ��Ʈ��ŷ
    for (let i = 0; i < N; i++) {
      if (visited[i] === 1) continue;
   
      visited[i] = 1;
      start.push(i + 1);
      dfs(index + 1);
      //���� �ε����� ��� ȣ��
			//�̰� i�� �ƴ϶� index�̴�
			//�ᱹ �ش� ��� �������� ���� ������ index���� ������ �ִ�
   
      start.pop();
      visited[i] = 0;
      //���������� �湮�ߴ� ���� �湮���� ���� ������ �ٲ�
      //��, ������ �湮���� ���� ������ �ϰ�, �� ���� ��츦 �����ڴٴ� ���̴�
    }
  }

  dfs(0)

  console.log(min)
  

  process.exit()
})