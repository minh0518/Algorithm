const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

const data = []

rl.on('line', (input) => {
  data.push(input)
}).on('close', () => {


  let N = +data.shift() // N*N ũ��
  let result = 0 // ����� ���� ���� ����(���� ������ ��)
  let board = [] // ü���� �迭

  function hasConflict(x) {
    for (let i = 0; i < x; i++) {// ���� ���� ���� �� �� ���� ������ üũ
																//i���� ���� �ǹ��մϴ�

      if (board[i] === board[x]) {
        // ���� ������ üũ
        return true
      }
      if (Math.abs(board[x] - board[i]) === x - i) {
        // ������ �� ������ �밢���� ��ġ�ϴ��� üũ (x�� i���� Ŭ �� �ۿ� ���� ������ ���밪 ó�������� �ʾƵ���)
        return true
      }
    }
    return false
  }

  function findNQueen(row) {
    if (row === N) {
      //������ ����� ����ƴٴ°� ����� ���� ã�Ҵٴ� �ǹ��̹Ƿ� 
			//result���� ����
      result++
      return
    }
    for (let col = 0; col < N; col++) {
      board[row] = col
      if (!hasConflict(row)) {
        // �浹���� �ʴ´ٸ�
        findNQueen(row + 1)
      }
    }
  }


  findNQueen(0) // ù��° ���� �ְ� ó������ findNQueen �Լ��� ����
  console.log(result)

  process.exit()
})