// 24.4.13
function solution(edges) {
  let maxNodeValue = 0;
  for (let [from, to] of edges) {
    const bigNumber = Math.max(from, to);
    if (bigNumber > maxNodeValue) maxNodeValue = bigNumber;
  }

  // 각 노드로부터 come,out 간선의 갯수를 저장하는 Map 사용
  const nodeLinkInfo = new Map();
  for (let [from, to] of edges) {
    nodeLinkInfo.set(
      from,
      nodeLinkInfo.has(from) ? { ...nodeLinkInfo.get(from), out: nodeLinkInfo.get(from).out + 1 } : { out: 1, come: 0 },
    );
    nodeLinkInfo.set(
      to,
      nodeLinkInfo.has(to) ? { ...nodeLinkInfo.get(to), come: nodeLinkInfo.get(to).come + 1 } : { out: 0, come: 1 },
    );
  }

  let center;
  let line = 0;
  let eight = 0;

  // 간선 정보를 바탕으로 그래프 계산
  for (let [key, value] of nodeLinkInfo) {
    const { come, out } = value;

    if (come === 0 && out >= 2) center = key;
    if (come >= 2 && out === 2) eight += 1;
    else if (out === 0) line += 1;
  }
  let donut = nodeLinkInfo.get(center).out - (line + eight);

  return [center, donut, line, eight];
}
