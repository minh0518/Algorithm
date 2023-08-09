function solution(cacheSize, cities) {
  if (cacheSize === 0) return cities.length * 5;

  cities = cities.map((i) => i.toUpperCase());

  const cache = [];

  let totalTime = 0;
  for (let i of cities) {
    console.log(cache);

    const currentQueueLength = cache.filter((i) => i).length;
    let index = cache.indexOf(i);

    // cache hit
    if (index !== -1) {
      cache.splice(index, 1);
      cache.unshift(i);
      totalTime += 1;
      continue;
    }

    // cache miss
    if (index === -1) {
      totalTime += 5;

      // 캐시가 전부 찼을 때
      if (currentQueueLength >= cacheSize) {
        cache.pop();
        cache.unshift(i);
        continue;
      }

      // 캐시에 공간이 남아 있을 때
      if (currentQueueLength < cacheSize) {
        cache.unshift(i);
        continue;
      }
    }
  }

  return totalTime;
}
