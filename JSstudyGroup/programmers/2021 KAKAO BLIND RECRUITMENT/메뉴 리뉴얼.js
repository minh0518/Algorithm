// 24.1.8
function solution(orders, course) {
  const answer = [];
  let info = new Map();

  // order에서 길이가 menuLength인 조합 생성
  const dfs = (index, current, order, menuLength) => {
    if (current.length === menuLength) {
      // info Map객체 갱신
      const sortedCurrent = [...current].sort(); // CA === AC
      info.set(sortedCurrent.join(''), info.has(sortedCurrent.join('')) ? info.get(sortedCurrent.join('')) + 1 : 1);
      return;
    }

    for (let i = index; i < order.length; i++) {
      current.push(order[i]);
      dfs(i + 1, current, order, menuLength);
      current.pop();
    }
  };

  const getInfo = (menuLength) => {
    for (let i of orders) {
      dfs(0, [], i.split(''), menuLength);
    }
  };

  // 메인 로직
  for (let i of course) {
    // 각 course에 따른 로직 진행
    getInfo(i);

    // 현재 course에 대한 info를 기반으로 정답 추가
    const sortedInfo = [...info]
      .filter((i) => i[1] >= 2) // 2번 이상 주문한 경우에만
      .sort((a, b) => {
        return b[1] - a[1];
      });
    if (!sortedInfo.length) continue;

    const maxValue = sortedInfo[0][1];

    for (let menu of sortedInfo) {
      const [name, count] = menu;
      if (count !== maxValue) break;
      answer.push(name);
    }

    console.log(info);
    // info Map객체 초기화
    info = new Map();
  }

  return answer.sort();
}
