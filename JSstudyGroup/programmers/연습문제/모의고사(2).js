function solution(answers) {
    let answer = [];
    let a1 = [1, 2, 3, 4, 5];
    let a2 = [2, 1, 2, 3, 2, 4, 2, 5]
    let a3 = [ 3, 3, 1, 1, 2, 2, 4, 4, 5, 5];

    let a1c = answers.filter((a,i)=> a === a1[i%a1.length]).length;
    let a2c = answers.filter((a,i)=> a === a2[i%a2.length]).length;
    let a3c = answers.filter((a,i)=> a === a3[i%a3.length]).length;
    let max = Math.max(a1c,a2c,a3c);

    if (a1c === max) {answer.push(1)};
    if (a2c === max) {answer.push(2)};
    if (a3c === max) {answer.push(3)};


    return answer;
}