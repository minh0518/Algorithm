//�ش� Ǯ�̴� ���� ����� ����� ������ �ð� �ʰ��� �ɸ��ϴ�


function solution(id_list, report, k) {
    let status = id_list.map((item) => item.split())
    
    let info = report.map((item) => item.split(' '))

   // console.log(info)

    for (let i = 0; i < id_list.length; i++) {
      status[i].push(0)
    } //�̸��� �Ű� Ƚ���� �ִ� 2���� �迭�� ����



    //�ߺ��Ű� ó��
    for(let i=0; i<info.length; i++){
      for(let j=i+1; j<info.length; j++){
        if(JSON.stringify(info[i])===JSON.stringify(info[j])){
         // console.log(info[i] , info[i])

          info.splice(j,1)
          j--

        }   
      }
    }

 // console.log(info)



    for (let i = 0; i < info.length; i++) {
      //�Ű����� ���鼭 �Ű� Ƚ���� �߰�
      if(info[i][0]===info[i][1]){ //�ڱ��ڽ� �Ű��� �� ����
        continue
      }
      for (let j = 0; j < status.length; j++) {
        if (info[i][1]===status[j][0]) {

          status[j][1]++
        }
      }
    }



    //console.log(status)



    let answer = new Array(id_list.length).fill(0)



    for (let i = 0; i < status.length; i++) {
      if (status[i][1] >= k) {
        //�Ű�Ƚ���� k�� �̻��̸�

        for (let j = 0; j < info.length; j++) {
          if (info[j][1] === status[i][0]) {
            //�Ű��Ͽ��� k�� �̻��� ����� �Ű���� ���

              //info[j][0]�� �Ű� �� ���
            for (let k = 0; k < status.length; k++) {
              if (status[k][0] === info[j][0]) {
                answer[k]++
                
              }
            }
          }
        }
      }
    }

    //console.log(answer)

    return answer
  }