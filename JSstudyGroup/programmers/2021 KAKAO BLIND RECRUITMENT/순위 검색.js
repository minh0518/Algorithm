function solution(info, query) {
    let answer = [];
    let map = {};
    
    function combination(infos, score, map, start){
        let key = infos.join("");  // Ű ������ ���� �����ֱ�
        let value = map[key];      // �� �ִ��� ������ Ȯ�����ֱ�
    
        if(value){ // ���� ������ push
            map[key].push(score);
        }else{ // ���� ������ ������Ƽ ������ֱ�
            map[key] = [score];
        }
        
        // -�� �̿��� ���� �����
        for(let i=start; i<infos.length; i++){
            let combiArr = [...infos]; // ����������
            combiArr[i] = '-';
            
            combination(combiArr, score, map, i+1);
        }
    }
    
    
    // �̺�Ž��
    function binarySearch(map2, key2, score2){
        let scoreArr = map2[key2];
       
        if(scoreArr){
       
            let start = 0;
            let end = scoreArr.length;
            
            while(start < end){
                let mid = Math.floor((start+end)/2);
                
                if(scoreArr[mid] >= score2){ // ���� ����Ű�� ������ ���� ã�� ����
                                            //��ȣ�� �־�� ���� ������ ������ ��
                    end = mid;
                }else if(scoreArr[mid] < score2){
                    start = mid + 1;
                }
            }
            
            return scoreArr.length - start; //���ۺκ��� �Ѱ���� �� �̻��� ������ �� ����� ��
                                            //�׸��� ��ü ���̿��� �����ε����� �� �༭
                                            //�� ������ ������ ��
        }
        else return 0
        
    }
    
    
    
    // 1. -�� ������ ��� ���� �����
    for(let i=0; i<info.length; i++){
        let infos = info[i].split(" ");
        let score = infos.pop();
        
        combination(infos, score, map, 0);
    }
    
    // 2. �̺�Ž���� ���� ����
    for(let key in map){
        map[key].sort((o1, o2) => o1 - o2);
    }
  
    //console.log(map)
    
    // 3. �̺�Ž�� ����
    for(let i=0; i<query.length; i++){
      // let querys = query[i].replace(/ and /g, "").split(" ");
      // let score = Number(querys.pop());
  
        let tmp=query[i].split(' ')
        let score=Number(tmp.pop())
        let querys=tmp.filter(item=>item!=='and').join('')
  
                                //Ű    ��    ã�����ϴ� ��
        answer.push(binarySearch(map, querys, score));
        //console.log(querys)
    }
    
    return answer;
  }
  
console.log(solution(["java backend junior pizza 150","python frontend senior chicken 210","python frontend senior chicken 150","cpp backend senior pizza 260","java backend junior chicken 80","python backend senior chicken 50"],["java and backend and junior and pizza 100","python and frontend and senior and chicken 200","cpp and - and senior and pizza 250","- and backend and senior and - 150","- and - and - and chicken 100","- and - and - and - 150"]))
  