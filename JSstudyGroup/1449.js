const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

const data = []

rl.on('line', (input) => {
  data.push(input)
}).on('close', () => {
  let [N, L] = data.shift().split(' ').map(Number)
  let location = data
    .shift()
    .split(' ')
    .map(Number)
    .sort((a, b) => a - b)

  location = location.map((i) => [i - 0.5, i + 0.5])

  let count = 0

  //console.log(location)

  for (let i = 0; i < N; i++) {
    if (i === N - 1) {
      count++
      break
    }
    let reachable = location[i][0] + L

    for (let j = i + 1; j < N; j++) {
      if (reachable < location[j][1]) {
        count++
        i = j - 1
        break
      }

      if (reachable === location[j][1]) {
        i = j //j ��������
        count++
        break
      } 
      else if (reachable > location[j][1]) { //reachable�� ũ��
                                              //����� ��

        if (j + 1 < N) {
          //��Ÿ�� ���� ������ ���� �ε��� ���
          //(���� �ε����� ���� ��)

          if (reachable < location[j + 1][1]) {
              count++
             i = j
             break
            }

          //reachable�� ū�� ���� ��ġ�� ���� �����Ƿ�
          //ex) 4.5���� ���ް����ѵ� location[j + 1][1]�� 3.5���� ���
          //���� j�� ���� for������ �Ѿ
         } 
          else {
           i = N - 2 //i++���
                    //������ �� ������ i�� N-1�Ǹ� count++�� �ǹǷ�
                    //���⼱ count++ �� ����
           break
        }
      }
    }
  }

  console.log(count)

  process.exit()
})

//���� 3
// 0.5 1.5
// 1.5 2.5
// 4.5 5.5
// 6.5 7.5

//���� 4 (0.5���� 4.5�ε� reachable > location[j][1]�� ���)
// 0.5 1.5
// 1.5 2.5
// 2.5 3.5
// 4.5 5.5
// 6.5 7.5

//����2
//0.5 1.5
//1.5 2.5
//99.5 100.5
//100.5 101.5

//���� 3
// 0.5 1.5
// 1.5 2.5
// 2.5 3.5
// 3.5 4.5
// 6.5 7.5

//���� 3 
//4 3
// 0.5 1.5
// 1.5 2.5
// 2.5 3.5
// 3.5 4.5
// 4.5 5.5

//���� 1
// 0.5 1.5
// 1.5 2.5
// 2.5 3.5