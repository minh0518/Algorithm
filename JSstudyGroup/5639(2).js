const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const data = [];

rl.on('line', (input) => {
  data.push(input);
}).on('close', () => {
  const info = data.map(Number);
  const N = info.length;
  const tree = new Map();

  const getLeft = (arr, targetIndex, maxIndex) => {
    const target = arr[targetIndex];
    for (let i = targetIndex + 1; i <= maxIndex; i++) {
      if (arr[i] < target) return i;
    }
  };
  const getRight = (arr, targetIndex, maxIndex) => {
    const target = arr[targetIndex];
    for (let i = targetIndex + 1; i <= maxIndex; i++) {
      if (arr[i] > target) return i;
    }
  };

  const dfs = (index, maxIndex) => {
    const leftIndex = getLeft(info, index, maxIndex);
    const rightIndex = getRight(info, index, maxIndex);
    const leftValue = leftIndex ? info[leftIndex] : null;
    const rightValue = rightIndex ? info[rightIndex] : null;

    tree.set(
      info[index],
      tree.has(info[index]) ? [...tree.get(info[index]), leftValue, rightValue] : [leftValue, rightValue],
    );
    if (leftIndex) dfs(leftIndex, rightIndex ? rightIndex - 1 : maxIndex);
    if (rightIndex) dfs(rightIndex, maxIndex);
  };

  dfs(0, N - 1);

  const current = [];
  const postOrder = (node, current) => {
    const [left, right] = tree.get(node);
    if (left) postOrder(left, current);
    if (right) postOrder(right, current);
    current.push(node);
  };

  postOrder(info[0], current);
  console.log(current.join('\n'));

  process.exit();
});
