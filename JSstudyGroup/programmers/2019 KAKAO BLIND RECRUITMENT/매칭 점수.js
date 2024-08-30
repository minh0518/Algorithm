function solution(word, pages) {
  word = word.toLowerCase();
  pages = pages.map((page) => page.toLowerCase());

  // 주어진 페이지들의 정보를 추출하는 함수들
  const getPageInfo = {
    // 기본 점수
    getBasicScore: (page, target) => {
      let count = 0;
      const startStr = target[0];
      const targetLength = target.length;
      for (let i = 0; i <= page.length - targetLength; i++) {
        if (page[i] !== startStr || page.slice(i, i + targetLength).join('') !== target) continue;

        // 태그내의 값은 구분할 필요가 없나?
        const before = page[i - 1].charCodeAt();
        const after = page[i + targetLength].charCodeAt();
        if ((before >= 97 && before <= 122) || (after >= 97 && before <= 122)) continue;
        count += 1;
      }
      return count;
    },

    // 페이지 이름
    getPageName: (page) => {
      const pageInfoStart = page.split('<meta property="og:url" content="https://')[1];
      const pageInfo = pageInfoStart.split('"/>')[0];
      return pageInfo;
    },

    // 외부 링크
    getOuterLink: (page) => {
      const anchorTagStart = page.split('<a href="https://').slice(1);
      const anchorTagContent = anchorTagStart.map((content) => {
        return content.split('">')[0];
      });
      return anchorTagContent;
    },
  };

  // 메인로직
  const pageInfoMap = new Map();

  /** 각 페이지 이름, 기본점수 갱신 */
  for (let page of pages) {
    // 현재 페이지 이름
    const pageName = getPageInfo.getPageName(page);
    pageInfoMap.set(pageName, { basic: 0, outer: [], inner: [], index: pageInfoMap.size });

    // 기본점수
    const basicScore = getPageInfo.getBasicScore(page.split(''), word);
    pageInfoMap.set(pageName, { ...pageInfoMap.get(pageName), basic: basicScore });
  }

  /** 각 페이지의 외부링크 추가,
   *  연결된 외부링크 페이지들의 inner(다른 페이지에서 외부링크로 자신을 참조)갱신 */
  for (let i = 0; i < pages.length; i++) {
    const page = pages[i];
    const pageName = [...pageInfoMap][i][0];

    // 외부 링크
    const outerLink = getPageInfo.getOuterLink(page);

    // 연결된 외부링크들의 페이지의 inner프로퍼티 갱신
    for (let link of outerLink) {
      if (!pageInfoMap.has(link)) continue;
      pageInfoMap.set(link, { ...pageInfoMap.get(link), inner: [...pageInfoMap.get(link).inner, pageName] });
    }

    // 현재 페이지의 외부링크 갱신
    pageInfoMap.set(pageName, { ...pageInfoMap.get(pageName), outer: [...outerLink] });
  }

  /** 최종적으로 각 페이지의 링크점수 계산 및 매칭점수 계산 */
  for (let [page, info] of pageInfoMap) {
    let linkScore = 0;
    const innerLinks = info.inner;

    // 링크점수 계산
    for (const innerLink of innerLinks) {
      // 해당 웹페이지로 링크가 걸린 다른 웹페이지의 기본점수 ÷ 외부 링크 수
      const targetPage = pageInfoMap.get(innerLink);
      linkScore += targetPage.basic / targetPage.outer.length;
    }

    // 매칭점수 계산
    const currentPageInfo = pageInfoMap.get(page);
    pageInfoMap.set(page, { ...currentPageInfo, matchScore: linkScore + currentPageInfo.basic });
  }

  // 결과 출력
  return [...pageInfoMap].sort((a, b) => {
    if (b[1].matchScore === a[1].matchScore) return a[1].index - b[1].index;
    return b[1].matchScore - a[1].matchScore;
  })[0][1].index;
}
