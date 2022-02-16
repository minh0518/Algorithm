const { off } = require('process')
const readline = require('readline')
const { fileURLToPath } = require('url')

const rl = readline.createInterface({
   input: process.stdin,
   output: process.stdout,
})

const data = []

rl.on('line', (input) => {
   data.push(input)
}).on('close', () => {
    
   // // �η�Ʈ ������ ��� ã�� ������ ���� ���ư��� Ž��

   //    let num=data.shift()
   //    let page=1
   //    let find=1000
   //    while(1){
   //       if(num>=find&&num<=(find+99)){
   //          break
   //       }
   //       find+=100
   //       page++
   //    }

   //    console.log(`${num}�� ������ ${page}�������� �ֽ��ϴ�`)

   // Ž������ ���� ������ ������ ���� �˻�
   let num = data.shift()

   let page = parseInt(num / 100) - 9

   console.log(`${num}�� ������ ${page}�������� �ֽ��ϴ�`)

   process.exit()
})
