function solution(m, musicinfos) {
  m = m.replaceAll('C#', 'c').replaceAll('D#', 'd').replaceAll('F#', 'f').replaceAll('G#', 'g').replaceAll('A#', 'a').split('');

  musicinfos = musicinfos.map((i) => {
    let info = i.split(',');
    let [startM, startS] = info[0].split(':').map(Number);
    info[0] = startM * 60 + startS;
    let [endM, endS] = info[1].split(':').map(Number);
    info[1] = endM * 60 + endS;

    info[3] = info[3].replaceAll('C#', 'c').replaceAll('D#', 'd').replaceAll('F#', 'f').replaceAll('G#', 'g').replaceAll('A#', 'a').split('');

    return info;
  });

  let result = [];
  let maxPlaytime = 0;
  for (let i of musicinfos) {
    let [start, end, title, lyrics] = i;
    let playtime = end - start;

    // 재생 시간이 더 길다면 늘리기
    if (lyrics.length < playtime) {
      let plusLength = playtime - lyrics.length;
      let index = 0;
      while (index !== plusLength) {
        //lyrics += lyrics[index % plusLength];
        lyrics.push(lyrics[index % plusLength]);
        index += 1;
      }
      // console.log(lyrics);
    }
    // 재생 시간이 더 짧다면 줄이기
    else if (lyrics.length > playtime) {
      // lyrics = lyrics.split('').slice(0, playtime).join('');
      lyrics = lyrics.slice(0, playtime);
      // console.log(lyrics);
    }

    let startStr = m[0];

    for (let j = 0; j < lyrics.length; j++) {
      if (lyrics[j] === startStr) {
        if (lyrics.slice(j, j + m.length).join('') === m.join('')) {
          result.push(i);

          // 정답 중에서 최대 재생시간 갱신(나중에 정답 출력할 때 사용)
          if (playtime > maxPlaytime) {
            maxPlaytime = playtime;
          }
          break;
        }
      }
    }
  }

  if (result.length === 1) {
    return result[0][2];
  }
  if (!result.length) {
    return '(None)';
  }
  if (result.length > 1) {
    for (let j of result) {
      let [start, end, title, lyrics] = j;
      let playtime = end - start;
      if (playtime === maxPlaytime) {
        // 몇개가 되든 첫번째의 제목 리턴
        return title;
      }
    }
  }
}
solution('ABCDEFG', ['12:00,12:14,HELLO,CDEFGAB', '13:00,13:05,WORLD,ABCDEF']);
solution('CC#BCC#BCC#BCC#B', ['03:00,03:30,FOO,CC#B', '04:00,04:08,BAR,CC#BCC#BCC#B']);
solution('ABC', ['12:00,12:14,HELLO,C#DEFGAB', '13:00,13:05,WORLD,ABCDEF']);
