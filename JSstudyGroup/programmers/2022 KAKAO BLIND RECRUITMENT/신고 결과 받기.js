function solution(id_list, report, k) {
  const reportedInfo = new Map();

  report.forEach((i) => {
    const [from, to] = i.split(' ');

    const existReportList = reportedInfo.get(to);
    if (existReportList) {
      existReportList.add(from);
      reportedInfo.set(to, existReportList);
    }
    if (!existReportList) {
      reportedInfo.set(to, new Set().add(from));
    }
  });

  const reporterInfo = new Map();
  for (let [reported, reporter] of reportedInfo) {
    if (reporter.size < k) continue;

    for (let name of reporter) {
      reporterInfo.set(name, reporterInfo.has(name) ? reporterInfo.get(name) + 1 : 1);
    }
  }
  // console.log(reportedInfo)
  // console.log(reporterInfo)

  const result = [];
  id_list.forEach((i) => {
    const reportCount = reporterInfo.get(i);
    if (reportCount) {
      result.push(reportCount);
    }
    if (!reportCount) {
      result.push(0);
    }
  });
  return result;
}
