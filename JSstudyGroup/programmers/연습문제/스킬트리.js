function solution(skill, skill_trees) {
  skill_trees = skill_trees.map((i) => i.split(''));

  let result = 0;
  for (let i of skill_trees) {
    const stack = [];
    for (let j of i) {
      if (!skill.includes(j)) continue;
      stack.push(j);
    }

    if (skill.startsWith(stack.join(''))) {
      result += 1;
    }
  }

  return result;
}
