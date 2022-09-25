function solution(today, terms, privacies) {
  const calc = (term, privacy) => {
    let detail = privacy.split('.').map(Number)
    //console.log(detail)

    if (term > 12) {
      //�Ⱓ�� 12���� Ŭ ��

      let year = parseInt(term / 12)
      let month = parseInt(term % 12)

      //������ ������ ������ �Ѿ

      if (detail[2] === 1) {
        //������ �Ѿ�� �����ڸ��� 1�϶�

        //������ �Ѿ�� �����ڸ��� 1�϶�Ư�� ���̽�
        if (detail[1] + month === 13) {
          //30,'2022.07.01' > 2024.12.28 ���
          detail[2] = 28
          detail[1] = 12
          detail[0] = detail[0] + year
        } else {
          //������ �Ѿ�� �����ڸ��� 1�϶�
          if (detail[1] + month > 12) {
            //������ �Ѿ�� �����ڸ��� 1�ε� ������������ �⵵�� �� �ö󰥶�
            //45 2022 9 1 >> 2026 5 28
            detail[2] = 28
            detail[1] = month + detail[1] - 12 - 1
            detail[0] = detail[0] + year + 1
          } else {
            //������ �Ѿ�� �����ڸ��� 1
            detail[2] = 28
            detail[1] = month + detail[1] - 1
            detail[0] = detail[0] + year
          }
        }
      } else {
        //������ �Ѿ�� �����ڸ��� 1�� �ƴѰ��
        if (detail[1] + month > 12) {
          //������ �Ѿ�� �����ڸ��� 1�� �ƴѵ� ������ ������ ������ �ö� ��
          //42 2022 8 28 >> 2026 2 27
          detail[2] = detail[2] - 1
          detail[1] = month + detail[1] - 12
          detail[0] = detail[0] + year + 1
        } else {
          //������ �Ѿ�� �����ڸ��� 1�� �ƴ� ���
          detail[2] = detail[2] - 1
          detail[1] = month + detail[1]
          detail[0] = detail[0] + year
        }
      }
    } else {
      //�Ⱓ�� 12�����϶�

      let addMonth = detail[1] + term

      if (addMonth > 12) {
        //������ �Ѿ��

        if (detail[2] === 1) {
          //������ �Ѿ�� �����ڸ��� 1�϶�

          //������ �Ѿ�� �����ڸ��� 1�϶�Ư�� ���̽�
          if (addMonth === 13) {
            //6,'2021.07.01' ���
            detail[2] = 28
            detail[1] = 12
          } else {
            //������ �Ѿ�� �����ڸ��� 1�϶� �Ϲ����� ���
            detail[2] = 28
            detail[1] = term + detail[1] - 12 - 1
            detail[0] = detail[0] + 1
          }
        } else {
          //������ �Ѿ�� �����ڸ��� 1�� �ƴ�, �Ϲ����� ���
          detail[2] = detail[2] - 1
          detail[1] = term + detail[1] - 12
          detail[0] = detail[0] + 1
        }
      } else {
        //������ �Ѿ�� ���� ��
        if (detail[2] === 1) {
          //������ �Ѿ�� �ʰ� �����ڸ��� 1�� ���
          detail[2] = 28
          detail[1] = detail[1] + term - 1
        } else {
          //������ �Ѿ�� �ʰ� �����ڸ��� 1�� �ƴ� �Ϲ�����  ���
          detail[2] = detail[2] - 1
          detail[1] = detail[1] + term
        }
      }
    }

    return detail.join('.')
  }

  terms = terms.map((i) => {
    return i.split(' ')
  })

  // console.log(terms)

  privacies = privacies.map((i) => {
    return i.split(' ')
  })

  // console.log(privacies)

  let validate = new Array(privacies.length).fill(0)

  for (let i = 0; i < privacies.length; i++) {
    for (let j = 0; j < terms.length; j++) {
      if (terms[j][0] === privacies[i][1]) {
        validate[i] = calc(Number(terms[j][1]), privacies[i][0])
      }
    }
  }
  //console.log(validate)

  let result = []

  validate.map((i, index) => {
    if (new Date(i) < new Date(today)) {
      result.push(index + 1)
    }
  })

  console.log(result)

  return result
}

solution('2024.11.01', ['Z 27'], ['2022.8.1 Z', '2022.10.21 Z'])
