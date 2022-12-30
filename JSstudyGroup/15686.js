const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const data = [];

rl.on('line', (input) => {
  data.push(input);
}).on('close', () => {
  let [N, M] = data.shift().split(' ').map(Number);

  let map = data.map((i) => i.split(' ').map(Number));

  const getDistance = (home, market) => {
    let [homeX, homeY] = home;
    let [marketX, marketY] = market;

    let result = Math.abs(homeX - marketX) + Math.abs(homeY - marketY);

    return result;
  };

  // 집의 거리와 치킨매장의 거리를 구하는 함수
  const getMarketLocation = (map) => {
    let result = [];
    for (let i = 0; i < N; i++) {
      for (let j = 0; j < N; j++) {
        if (map[i][j] === 2) {
          result.push([i, j]);
        }
      }
    }
    return result;
  };

  // 조합
  const getCombinations = (arr, selectNumber) => {
    const results = [];
    if (selectNumber === 1) return arr.map((el) => [el]);

    arr.forEach((fixed, index, origin) => {
      const rest = origin.slice(index + 1);
      const combinations = getCombinations(rest, selectNumber - 1);

      const attached = combinations.map((el) => [fixed, ...el]);
      results.push(...attached);
    });

    return results;
  };

  let marketLocations = getMarketLocation(map);
  let combinationsOfMarket = getCombinations(marketLocations, M);

  // 매장의 위치들을 인자로 받으면
  // 모든 집들의 거리를 기반으로 각 매장들까지의 최단거리를 구하고
  // 최단거리들의 합을 통해 도시거리를 리턴함
  const calc = (marketLocations) => {
    let results = [];
    for (let i = 0; i < N; i++) {
      for (let j = 0; j < N; j++) {
        // 집 좌표를 찾음
        if (map[i][j] !== 1) continue;

        let tmpForShortDistance = [];

        // 조합을 통한 모든 매장 위치들을 기반으로
        // 집 좌표로부터 최단거리를 찾아서 리턴하게 됨
        for (let location of marketLocations) {
          tmpForShortDistance.push(getDistance([i, j], location));
        }
        results.push(Math.min(...tmpForShortDistance));
      }
    }

    // 최단거리들의 합이 도시거리가 됨
    return results.reduce((a, b) => a + b, 0);
  };

  let answer = [];
  for (let i = 0; i < combinationsOfMarket.length; i++) {
    let locations = combinationsOfMarket[i]; //2차원 배열

    answer.push(calc(locations));
  }

  //도시거리들 중에서 최소값이 정답
  console.log(Math.min(...answer));

  process.exit();
});
