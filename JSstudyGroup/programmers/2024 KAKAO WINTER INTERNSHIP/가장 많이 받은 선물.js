function solution(friends, gifts) {
  const giftInfo = new Map();
  const result = new Map();

  const calc = (one, two) => {
    const oneInfo = giftInfo.get(one);
    const twoInfo = giftInfo.get(two);

    // 선물한 갯수
    const onePostCount = oneInfo.post.filter((i) => i === two).length;
    const twoPostCount = twoInfo.post.filter((i) => i === one).length;

    // 서로 선물한 적이 없거나, 서로 선물한 횟수가 같다면
    if ((!oneInfo.post.includes(two) && !twoInfo.post.includes(one)) || onePostCount === twoPostCount) {
      if (oneInfo.score > twoInfo.score) {
        result.set(one, result.has(one) ? result.get(one) + 1 : 1);
      }
      if (oneInfo.score < twoInfo.score) {
        result.set(two, result.has(two) ? result.get(two) + 1 : 1);
      }
    }
    // 서로 선물한 횟수가 다를 경우
    else {
      if (onePostCount > twoPostCount) {
        result.set(one, result.has(one) ? result.get(one) + 1 : 1);
      }
      if (onePostCount < twoPostCount) {
        result.set(two, result.has(two) ? result.get(two) + 1 : 1);
      }
    }
  };

  const dfs = (current, index) => {
    if (current.length === 2) {
      calc(current[0], current[1]);
      return;
    }

    for (let i = index; i < friends.length; i++) {
      current.push(friends[i]);
      dfs(current, i + 1);
      current.pop();
    }
  };

  // 모든 friends에 대한 초기값을 미리 전부 세팅
  for (let friend of friends) {
    giftInfo.set(friend, { post: [], score: 0 });
  }

  // 누구에게 보냈냐는것, 선물 지수
  // 2가지 정보를 담은 Map객체 생성
  for (let info of gifts) {
    const [from, to] = info.split(' ');

    // 보낸 대상 배열에 추가, 보냈으니 점수+1
    const existFromValue = giftInfo.get(from);
    existFromValue.post.push(to);
    giftInfo.set(from, { ...existFromValue, score: existFromValue.score + 1 });

    // 받았으니 점수 -1
    const existToValue = giftInfo.get(to);
    giftInfo.set(to, { ...existToValue, score: existToValue.score - 1 });
  }

  dfs([], 0);

  const resultArr = [...result];
  resultArr.sort((a, b) => {
    return b[1] - a[1];
  });

  if (resultArr.length) return resultArr[0][1];
  return 0;
}
