function solution(id_list, report, k) {

    let status={}

    id_list.map(item=>status[item]=[])
  //{ muzi: [], frodo: [], apeach: [], neo: [] }
//Ű�� �Ű� ���� ����
//���� Ű�� �Ű��� ������

    report.map(item=>{
      let [user_id,report_id]=item.split(' ')
      if(!(status[report_id].includes(user_id))){
          //stataus���� �Ű���� ������ ���� ���� �Ű��� ����� �̸��� ������
          status[report_id].push(user_id)   
      } 
    })

   // console.log(status)


    let answer=new Array(id_list.length).fill(0)
    for(let i in status){
      if(status[i].length>=k){
        status[i].map(item=>{
          return answer[id_list.indexOf(item)]++
          //status�� ���鼭 k�� �̻� �Ű���� ����� 
          //�Ű��� ����� ���� ���̴�.
          //id_list���� �� ����� �ε����� ã�Ƽ� �Ȱ��� answer�� ����
          //(������� id_list�� �Է¹��� ������� ���� �ű�� ����)
        })
      }
    }

    return answer
  }