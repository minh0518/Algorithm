function solution(picks, minerals) {
  // 피로도 계산을 위한 객체 선언
  // picks의 각 인덱스로 접근한 다음 , 각 광물들에 대한 피로도를 사용한다
  const fatigue = {
    0: {
      diamond: 1,
      iron: 1,
      stone: 1,
    },
    1: {
      diamond: 5,
      iron: 1,
      stone: 1,
    },
    2: {
      diamond: 25,
      iron: 5,
      stone: 1,
    },
  };

  let result = [];

  // 광물을 5개씩 끊어가는 인덱스 , picks배열 , 피로도 누적 값
  const dfs = (index, picks, current) => {
    // 인덱스가 inerals의 길이를 초과했거나 , picks의 값이 남아있지 않는 경우
    if (index >= minerals.length || !picks.filter((i) => i !== 0).length) {
      result.push(current);
      return;
    }

    // pick를 순회하며 각 도구로 5개씩 광물을 캤을 경우에 대해 재귀를 호출해야 한다
    for (let i = 0; i < 3; i++) {
      if (!picks[i]) continue;

      let arr;
      // 현재 인덱스 포함 5개가 minerals의 길이를 초과한다면 그냥 끝까지 다 담음
      if (index + 4 >= minerals.length) {
        arr = minerals.slice(index);
      }
      // 현재 인덱스 포함 5개의 광물을 담음
      if (index + 4 < minerals.length) {
        arr = minerals.slice(index, index + 5);
      }

      // 현재 선택된 도구를 기반으로 피로도 계산
      let sum = 0;
      arr.forEach((item) => (sum += fatigue[i][item]));

      // 피로도 누적 및 곡괭이 갯수차감 반영
      current += sum;
      picks[i] -= 1;

      // 재귀
      dfs(index + 5, picks, current);

      // 백트래킹을 위한 원상복구
      current -= sum;
      picks[i] += 1;
    }
  };

  dfs(0, picks, 0);

  console.log(result);
  return Math.min(...result);
}
