const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const data = [];

rl.on('line', (input) => {
  data.push(input);
}).on('close', () => {

  const originTree = {};

  for (let i of data) {
    originTree[i] = [0, 0];
  }

  let root = Number(data[0]);
  let parent = root;

  //node가 28일때
  //'50': [ 30, 0 ]의 parent=30에서 재귀
  //'30': [ 24, 0 ]의 parent=24에서 재귀
  //'24': [ 5, 0 ] 에서 0에 28대입 >> '24': [ 5, 28 ]
  //'30': [ 24, 0 ]로 복귀 parent=24
  //'24': [ 5, 28 ]의 parent=5에서 재귀 >> 이래서   '5': [ 0, 28 ] 찍힘

  //'50': [ 30, 0 ]로 복귀 parent=24
  //parent를 바꿔야 함?
  const makeOriginTree = (node) => {
    if (parent > node) {
      if (originTree[parent][0] === 0) {
        originTree[parent][0] = node;
        return;
      } else {
        if (originTree[parent][0] !== 0) {
          parent = originTree[parent][0];
          makeOriginTree(node);
          parent = root;
          return;
        }
      }
    }

    // 24 28
    if (parent < node) {
      if (originTree[parent][1] === 0) {
        originTree[parent][1] = node;
        return;
      } else {
        if (originTree[parent][1] !== 0) {
          parent = originTree[parent][1];
          makeOriginTree(node);
          parent = root;
          return;
        }
      }
    }
  };

  for (let i = 1; i < data.length; i++) {
    makeOriginTree(Number(data[i]));
    parent = root;
  }

  let result='';
  const postOrder = (node) => {
    if (originTree[node][0]) {
      postOrder(originTree[node][0]);
    }
    if (originTree[node][1]) {
      postOrder(originTree[node][1]);
    }

    result+=`${node}\n`
  };
  postOrder(root);
  console.log(result.trim())


  process.exit();
});
