function solution(tickets) {
  const map = new Map();

  // 항공권을 바탕으로 그래프 생성
  for (let i = 0; i < tickets.length; i++) {
    let [from, to] = tickets[i];

    if (map.has(from)) {
      let existCourse = map.get(from);
      existCourse.push(to);
      map.set(from, existCourse);
      continue;
    }
    if (!map.has(from)) {
      let newCourse = [to];
      map.set(from, newCourse);
    }
  }

  // 알파벳 순서대로 탐색하기 위해 sort 진행
  map.forEach((i) => {
    // 배열은 참조값이므로 원본의 값을 바꿔버리면 map의 값도 바뀌게 된다 (=굳이 map.set()해줄 필요 x)
    i.sort();
  });

  let result;
  const dfs = (place, current) => {
    if (current.length === tickets.length + 1) {
      result = current;
      return true; // 최초로 모든 구간을 순회 하면 바로 종료
    }

    let nextCourses = map.get(place);

    if (!nextCourses) return false;

    for (let i = 0; i < nextCourses.length; i++) {
      let nextPlace = nextCourses[i];

      if (nextPlace === 'x') continue;

      nextCourses[i] = 'x';
      //map.set(place, nextCourses); // 배열은 참조값이므로 원본의 값을 바꿔버리면 map의 값도 바뀌게 된다 (=굳이 map.set()해줄 필요 x)
      current.push(nextPlace);

      if (dfs(nextPlace, current)) return true;

      // 백트래킹을 위한 원상복구
      nextCourses[i] = nextPlace;
      //map.set(place, nextCourses);
      current.pop();
    }
  };

  dfs('ICN', ['ICN']);

  return result;
}
