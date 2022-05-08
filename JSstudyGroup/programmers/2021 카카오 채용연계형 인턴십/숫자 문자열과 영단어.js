function solution(s) {

    let words=['zero','one','two','three','four','five','six','seven','eight','nine']

    
    for(let i=0; i<words.length; i++){
      
      while(1){
          let idx=s.indexOf(words[i])
          if(idx===-1){
            break
          }
          s=s.replace(words[i],i)  
      }

    }
    
    return Number(s)
}


  solution("one4seveneight")
  solution("23four5six7")
  solution("2three45sixseven")
  solution("123")
  solution("oneone4seveneight")