function solution(cacheSize, cities) {
  if (cacheSize === 0) return cities.length * 5;
  const info = new Map();
  let result = 0;
  for (let city of cities) {
    city = city.toUpperCase();
    if (info.has(city)) {
      info.delete(city);
      info.set(city, city);
      result += 1;
    }
    if (!info.has(city)) {
      if (info.size === cacheSize) {
        // info.delete(info.get([...info.keys()][0]));
        info.delete(info.keys().next().value);
      }
      info.set(city, city);

      result += 5;
    }
  }
  return result;
}
