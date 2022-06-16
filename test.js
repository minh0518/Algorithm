const { off } = require('process')
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
  function solution(lottos, win_nums) {
    let zeroCount = 0
    for (let i = 0; i < 6; i++) {
      if (lottos[i] === 0) zeroCount++
    }

    let same = 0
    for (let i = 0; i < 6; i++) {
      if (lottos.includes(win_nums[i])) same++
    }

    let best = zeroCount + same
    let worse = same

    const rank = [6, 6, 5, 4, 3, 2, 1]

    return [rank[best], rank[worse]]
  }

  console.log(solution([44, 1, 0, 0, 31, 25], [31, 10, 45, 1, 6, 19]))
  console.log(solution([0, 0, 0, 0, 1, 2], [7, 6, 33, 8, 4, 2]))
  console.log(solution([0, 0, 0, 0, 0, 1], [9, 43, 7, 5, 2, 8]))
  console.log(solution([0, 1, 6, 32, 5, 0], [1, 6, 2, 4, 17, 36]))
  

  process.exit()
})

//0�� 2��
//�ٸ��� 2�� , ������ 2��
// > 0�� ���� ���߰ų�, �ٸ��Ÿ� �״�� �ΰų�

// [0,0,0,0,1,2] , [7,6,33,8,4,2]
// 0�� 4��
// �ٸ��� 1�� , ������ 1��
// > 0�� ���� ���߰ų�, �ٸ��Ÿ� �״�� �ΰų�
// 5�� ���� or 1�� ����

//[0,1,6,32,5,0] , [1,6,2,4,17,36]
// 0�� 2��
// ������ 2��
// �ٸ��� 2��
// 4 or 2
// 3,5
