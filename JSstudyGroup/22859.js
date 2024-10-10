const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const data = [];

rl.on('line', (input) => {
  data.push(input);
}).on('close', () => {
  const str = data.shift();

  const titles = [];
  const contents = [];

  // 여러 공백 -> 1개의 공백으로 변환
  const getremovedDoubleBlankStr = (str) => {
    str = str.split('');
    const stack = [];
    for (let i = 0; i < str.length; i++) {
      const currentStr = str[i];
      const lastStackValue = stack[stack.length - 1];
      if (stack.length === 0) {
        stack.push(currentStr);
        continue;
      }
      if (currentStr === ' ' && lastStackValue === ' ') continue;
      if ((currentStr === ' ' && lastStackValue !== ' ') || currentStr !== ' ') stack.push(currentStr);
    }
    return stack.join('');
  };

  // p태그 내부에도 div가 있을 수 있어서 '<div title=' 로 나눠야 함
  const nextEachDiv = str.split('<div title=').slice(1);

  // title
  for (const innerStr of nextEachDiv) {
    const title = innerStr.split('>')[0];
    titles.push(title.split('"').join(''));
  }

  // 내부 문장
  for (const innerStr of nextEachDiv) {
    contents.push([]);
    const pStr = innerStr.split('<p>').slice(1);

    // 각각의 p 태그에서, p태그를 제외하고 내부 컨텐츠 추출
    for (const singleP of pStr) {
      const innerContent = singleP.split('</p>')[0];

      // 태그 제거
      const removedTag = innerContent.split('<').map((eachStr) => {
        if (eachStr.includes('>')) {
          return eachStr.split('>')[1];
        }
        return eachStr;
      });

      // 양 끝 공백 제거
      const removedSideBlank = removedTag.join('').trim();

      // 중간에 연속된 공백 1개로 변환
      const removedDoubleBlank = getremovedDoubleBlankStr(removedSideBlank);
      contents[contents.length - 1].push(removedDoubleBlank);
    }
  }

  let result = '';

  for (let i = 0; i < titles.length; i++) {
    let str = '';
    str += `title : ${titles[i]}\n`;
    for (const content of contents[i]) {
      str += `${content}\n`;
    }

    result += str;
  }
  console.log(result.split('\n').slice(0, -1).join('\n'));

  process.exit();
});
