const solution = (players, callings) => {
  let info = {}; // indexOf를 사용하지 않고 빠르게 인덱스를 조회할 수 있기 위해 객체 사용

  for (let i = 0; i < players.length; i++) {
    info[players[i]] = i;
  }

  for (let name of callings) {
    let index = info[name];
    let nextIndex = index - 1;

    info[name] = nextIndex;
    info[players[nextIndex]] = index;

    [players[index], players[nextIndex]] = [players[nextIndex], players[index]];
  }

  return players;
};
solution(['mumu', 'soe', 'poe', 'kai', 'mine'], ['kai', 'kai', 'mine', 'mine']);
