
//����� ����� ������ ��Ÿ�� ������ �߻�
//�� ������ �ݵ�� ���� Ž���� �ʿ��ϴ�

function solution(info, query) {


    info=info.map(item=>item.split(' '))

    //console.log(info)

    let require=query.map(item1=>{
      return item1.split(' ').filter(item2=>{ 
																			//�̰� map���� ���鼭 splice�� 
                                          //�ϴ� �͵� �����ҵ�
        return item2!=='and' 
      })
    })
    //console.log(require)


    // let tmp=[]
    // for(let i=0; i<require.length; i++){
    //   for(let j=0; j<require[i].length; j++){
    //     //j�� �� ���� ������ �ǹ�

    //     if(require[i][j]!=='-'){

    //       info.map(item=>{
    //                                     //�ݵ�� �� ��ȯ ����� ��
    //         if(!isNaN(item[j]) && item[j]>=Number(require[i][j])){ //���ڶ��
    //           tmp.push(item[j])
    //         }
    //         else if(item[j]===require[i][j]){
    //           tmp.push(item[j])
    //         }
            
    //       })
    //     }
        

    //   }
    // }
    // console.log(tmp)


    let answer=[]
    
    for(let i=0; i<require.length; i++){ //�� ���� ��������

      let tmp=new Array(require.length).fill().map(()=>[]) 
			//�� �䱸���� (=require�� �� ��)���� ���ο� �迭�� ����
			//�� ����� �����

      for(let j=0; j<require[i].length; j++){ //���� ������ ��
        for(let k=0; k<info.length; k++){
									//������ �� �࿡�� ���ϴ� ���� �ε����� �����ϹǷ� 
                  //4��for������ �ʿ����� �ʴ�

            if(!isNaN(require[i][j])){
              if(require[i][j]<=Number(info[k][j])){
                tmp[k].push(info[k][j])  
              }
            }
            else if(require[i][j]!=='-'&&require[i][j]===info[k][j]){ 
              
              tmp[k].push(info[k][j])
            }
            
          }
        }
      
  
        let count=0
        for(let x=0; x<tmp.length; x++){
          if(tmp[x].length===(require[i].filter(item=>item!=='-')).length){
            count++
          }
        }
        answer.push(count)
        
      }
  
        
    
    

    //console.log(answer)


    
    return answer;
}


console.log(solution(["java backend junior pizza 150","python frontend senior chicken 210","python frontend senior chicken 150","cpp backend senior pizza 260","java backend junior chicken 80","python backend senior chicken 50"],["java and backend and junior and pizza 100","python and frontend and senior and chicken 200","cpp and - and senior and pizza 250","- and backend and senior and - 150","- and - and - and chicken 100","- and - and - and - 150"]))