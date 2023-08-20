function solution(skill, skill_trees) {
  let result = 0;
  for (let i of skill_trees) {
    const copySkill = [...skill];

    let breakFlag = true;
    for (let j of i) {
      if (copySkill.length === 0) {
        breakFlag = false;
        result += 1;
        break;
      }
      if (skill.includes(j) && j !== copySkill[0]) {
        breakFlag = false;
        break;
      }
      if (j === copySkill[0]) {
        copySkill.shift();
      }
    }
    // AECB 같이 skill을 전부 배우지 않아도 순서만 맞으면 +1
    if (breakFlag) result += 1;
  }
  return result;
}
