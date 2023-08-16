function solution(genres, plays) {
  // 장르 : [ [고유번호,재생횟수] ,[고유번호,재생횟수] ... ]
  // 형태로 전체 정보를 담고 있는 Map
  const map = new Map();

  // 각 장르의 총합을 담는 객체
  const genresSumObj = {};

  // Map 객체 완성
  for (let i = 0; i < genres.length; i++) {
    let exist = map.get(genres[i]);
    if (exist) {
      exist.push([i, plays[i]]);
      map.set(genres[i], exist);
    }
    if (!exist) {
      map.set(genres[i], [[i, plays[i]]]);
    }

    // 동시에 각 장르의 총합도 계속 더해준다
    genresSumObj[genres[i]] ? (genresSumObj[genres[i]] += plays[i]) : (genresSumObj[genres[i]] = plays[i]);
  }

  // Map객체의 value들에 대해 내림차순 정렬
  for (let i of map) {
    i[1].sort((a, b) => b[1] - a[1]);
  }

  // 각 장르의 합을 담고 있는 객체를 배열로 변환 및 내림차순 정렬
  const genresSumArr = Object.entries(genresSumObj).sort((a, b) => b[1] - a[1]);

  const result = [];
  for (let i of genresSumArr) {
    map
      .get(i[0])
      .slice(0, 2)
      .forEach((i) => result.push(i[0]));
  }

  return result;
}
