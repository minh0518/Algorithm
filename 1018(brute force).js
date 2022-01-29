const { off } = require('process');
const readline = require('readline');
const { callbackify } = require('util');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const data = [];

rl.on('line', (input) => {
  data.push(input);
}).on('close', () => {
  let [N, M] = data.shift().split(' ').map(Number); //rols,cols

  let white = [ //ù ü���� ������ white�� ��� 
    'WBWBWBWB',
    'BWBWBWBW',
    'WBWBWBWB',
    'BWBWBWBW',
    'WBWBWBWB',
    'BWBWBWBW',
    'WBWBWBWB',
    'BWBWBWBW',
  ];
  let black = [ //ù ü���� ������ black�� ��� 
    'BWBWBWBW',
    'WBWBWBWB',
    'BWBWBWBW',
    'WBWBWBWB',
    'BWBWBWBW',
    'WBWBWBWB',
    'BWBWBWBW',
    'WBWBWBWB',
  ];

  let board=data
  let answer=64


  for(let i=0; i<=N-8; i++){//10 13�̸�  0���� 2����
    for(let j=0; j<=M-8; j++){ //10 13�̸�  0���� 5����
      check(i,j)
    }
  }


  function check(a,b){ //�̰� const������ �Լ� �����ϸ� ȣ�̽��� �ȵż� ����
  
    let checkWhite=0
    let checkBlack=0
    for(let i=a; i<a+8; i++){
      for(let j=b; j<b+8; j++){

        if(board[i][j] !== white[i-a][j-b]){
          checkWhite++
        }
        if(board[i][j] !== black[i-a][j-b]){
          checkBlack++
        }
      }
    }
    let result=(checkWhite<checkBlack)?checkWhite:checkBlack

    answer=(answer>result)?result:answer
  }
  
  

  console.log(answer)
  
  process.exit();
});