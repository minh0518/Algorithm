const solution = (book_time) => {
  book_time = book_time.map((i) => {
    return i.map((j) => {
      const [h, m] = j.split(':').map(Number);
      return h * 60 + m;
    });
  });

  // 시작 시간 기준으로 정렬
  book_time.sort((a, b) => {
    return a[0] - b[0];
  });

  // 끝나는 시간을 담는 배열.
  // 이 배열의 길이가 결국은 대실한 방의 갯수가 된다
  let endTimeArr = [];

  console.log(book_time);
  for (let [start, end] of book_time) {
    console.log(endTimeArr);

    // 기존에 대실한 방을 사용할 수 있는지 확인
    const possibleArr = endTimeArr.filter((i) => i + 10 <= start);

    // 기존 대실한 방을 사용할 수 없다면 새로운 방 대실
    if (possibleArr.length === 0) {
      endTimeArr.push(end);
    }
    // 기존 대실한 방을 사용할 수 있다면 가장 먼저 끝나는 대실을 사용
    if (possibleArr.length > 0) {
      let min = [...possibleArr].sort((a, b) => a - b)[0];
      endTimeArr.splice(endTimeArr.indexOf(min), 1, end);
    }
  }
  console.log(endTimeArr);
  return endTimeArr.length;
};
