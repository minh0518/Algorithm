
  function solution(new_id) {


    //1�ܰ�
    new_id=new_id.toLowerCase()


    //2�ܰ�
    let tmp2=[]
    for(let i of new_id){ //2022 �Ű��񽺹������� ó�� �ǽð����� �ش� ���� �迭�� ���� ����� ������ε� �����ҵ�
      if(i.charCodeAt(0) >= 97 && i.charCodeAt(0) <=122  || !(isNaN(i))  || i==='-' || i==='.' || i==='_'){
        tmp2.push(i)
      }
    }


    //3�ܰ� (2�� ��� �� ����)
    let tmp3=[]
    // for(let i=0; i<tmp2.length; i++){
    //   if(tmp2[i]==='.'){

    //     for(let j=i; j<tmp2.length; j++){
    //       if (tmp2[j]!=='.'){
    //         tmp3.push('.')
    //         i=j-1
    //         break
    //       }
    //     }

    //   }
    //   else{
    //     tmp3.push(tmp2[i])
    //   }
    // }
    for(let i=0; i<tmp2.length; i++){
      if(tmp2[i]==='.'){
        if(tmp3[tmp3.length-1]!=='.'){
          tmp3.push('.')
        }
      }
      else{
        tmp3.push(tmp2[i])
      }
    }


    //4�ܰ� (3�ܰ� ù��° ����� ȥ���ؼ� �ѹ��� ����������?)
    if(tmp3[0]==='.' ){
      tmp3.splice(0,1)
    }

    if(tmp3[tmp3.length-1]==='.'){
      tmp3.splice(tmp3.length-1,1)
    }


    //5�ܰ�
    let tmp4=[]
    if(tmp3.length===0){
      tmp4.push('a')
    }
    else{
      tmp4=tmp3
    }


    //6�ܰ�
    if(tmp4.length>=16){
      tmp4.splice(15)
    }
    if(tmp4[tmp4.length-1]==='.'){
      tmp4.splice(tmp4.length-1,1)
    }


    //7�ܰ�
    if(tmp4.length<=2){
      let lastword=tmp4[tmp4.length-1]
      while(tmp4.length<3){
        tmp4.push(lastword)
      }
    }


    // console.log(new_id)
    // console.log(tmp2.join(''))
    // console.log(tmp3.join(''))
    // console.log(tmp4.join(''))

    let answer = tmp4.join('')
    return answer

}
  

  //solution('...!@BaT#*..y.abcdefghijklm')
  solution('123_.def')