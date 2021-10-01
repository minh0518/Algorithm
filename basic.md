# 기본 문법

주석은 //가 아니라 #이다

---

JS와 달리 NOT연산자는 !가 아니라 not을 그대로 쓰면 된다

```python
print(not true) #false
```

또한 % 연산자는 나눗셈 후 나머지를 구하고

 //는 나눗셈 후 몫을 구한다

```python
5%2
>>1

5//2
>> 2
```

몫과 나머지를 함께 구하려면 divmod를 사용하면 됩니다.

```python
> divmod(5, 2)
(2, 1)   #파이썬에서 값을 괄호로 묶은 형태를 튜플(tuple)
				 #이라고 하며 값 여러 개를 모아서 표현할 때 사용합니다.
```

---

강제 int형변환

```python
>>> int(3.3)
3
>>> int(5 / 2)
2
>>> int('10')
10
```

강제 float형변환

```python
>>> float(5)
5.0
>>> float(1 + 2)
3.0
>>> float('5.3')
5.3
```

float에 문자열을 넣어도 실수로 만들 수 있습니다. 단, 실수 또는 정수로 된 문자열 이어야 합니다.

```python
>>> 4.2 + 5
9.2
```

실수와 정수를 함께 계산하면 표현 범위가 넓은 실수로 계산됩니다(실수가 정수보다 표현 범위가 넓습니다).

![Untitled](%E1%84%80%E1%85%B5%E1%84%87%E1%85%A9%E1%86%AB%20%E1%84%86%E1%85%AE%E1%86%AB%E1%84%87%E1%85%A5%E1%86%B8%20a24fe49f96f4434bb7aeb2c1b4914fe3/Untitled.png)

---

스크립트 파일에서 1 + 1처럼 계산식만 넣으면 결과가 출력되지 않습니다.
스크립트 파일에서 계산 결과를 출력하려면 print 함수를 사용해야 합니다.
ex) print(1+1)

**물론 주피터 노트북 환경에서는 Out[n] 형식으로 출력이 되긴 합니다**

---

JS의 typeof는 여기서 type이다

```python
>>> type(10)
<class 'int'>    #클래스로 나오는 것에 주의!
```

<class 'int'>는 정수(int) 클래스라는 뜻입니다. 

파이썬에서는 숫자도 `객체(object)`이며, 객체는 `클래스(class)`로 표현합니다.

---

if문은

```python
if a == 10:
      print('10')
      print('입니다.')
```

이런 식으로 조건에 : 를 달아주고 ( )가 없다

또한 { } 도 없어서 무조건 해당 조건문에 맞게 들여쓰기를 통일해야 한다

![Untitled](%E1%84%80%E1%85%B5%E1%84%87%E1%85%A9%E1%86%AB%20%E1%84%86%E1%85%AE%E1%86%AB%E1%84%87%E1%85%A5%E1%86%B8%20a24fe49f96f4434bb7aeb2c1b4914fe3/Untitled%201.png)

그리고 파이썬에선 else if 가 아닌 elif를 쓴다

```python
button = int(input())
 
if button == 1:
    print('콜라')
elif button == 2:
    print('사이다')
elif button == 3:
    print('환타')
else:
    print('제공하지 않는 메뉴')
```

---

## 변수

파이썬에서는 다른 언어와 달리 자료형이 존재는 하지만 그걸 명시해주지는 않는다

```python
>>> x = 10
>>> y = 'Hello, world!'

#이렇게 변수에다가 바로 값을 넣야주면 알아서 변수형이 정해지게 된다. 

>>> type(x)
<class 'int'>
>>> type(y)
<class 'str'>
```

다양한 방법들

```python
>>> x, y, z = 10, 20, 30
>>> x
10
>>> y
20
>>> z
30

>>> x = y = z = 10
>>> x
10
>>> y
10
>>> z
10

>>> x, y = 10, 20
>>> x, y = y, x
>>> x
20
>>> y
10

```

변수를 만들 때 x = 10과 같이 할당할 값을 지정해주었습니다. 그럼 값이 들어있지 않는 변수는 만들 수 없을까요? `값이 들어있지 않은 빈 변수`를 만들때는 None을 할당해주면 됩니다.

```python
>>> x = None
>>> print(x)
None
>>> x
>>> (아무것도 출력되지 않음)
```

다른 언어에서는 null과 마찬가지이고 JS에서는 undefined와 마찬가지이다

변수를 `삭제`할 때는 del 변수 형식으로 삭제합니다.

```python
>> x = 10
>>> del x
```

---

## input 함수

변수에 입력받은 값을 넣을 수 있다

```python
>>> x = input('문자열을 입력하세요')
Hello, world! (입력)
>>> print(x)
'Hello, world!'
```

input으로 입력받은 값은 무조건 '문자열'입니다

이렇게 입력받은 값을 숫자로 형변환 시킬 수도 있습니다

```python
a = int(input('첫 번째 숫자를 입력하세요: '))    
# int를 사용하여 입력 값을 정수로 변환
b = int(input('두 번째 숫자를 입력하세요: '))    
# int를 사용하여 입력 값을 정수로 변환
 
print(a + b)
```

## split()

JS에서처럼 문자열을 기준으로 나누는 것이다

```python
a, b = input('문자열 두 개를 입력하세요: ').split() 
# 괄호 안에 아무것도 없으므로 공백을 기준으로 분리

```

## map()

split의 결과로 숫자 연산을 해야 할 경우, 매번 숫자로 변환해주려니 귀찮습니다. 이때는 map을 함께 사용하면 됩니다.

```python
a, b = map(int, input('숫자 두 개를 입력하세요: ').split())
 
print(a + b)

#바꾸고자 하는 자료형을 **map의 첫번째 매개변수**로 넣어주면 됩니다
```

---

## 출력 방법들

JS처럼 print(1+'번') 이렇게 문자열과 숫자를  합치는 것은 불가능하다.
물론 print('1'+'번') 이렇게 문자열끼리는 가능

문자열과 숫자를 합치려면 
`print("FPS : %f Delay : %d ms"%(fps,delay))`
이런 식으로 c언어처럼 해야 합니다. 대신 변수 이름을 적어줄 때 , 대신 %를 붙여줍니다

print는 기본적으로 출력하는 값 끝에 \n을 붙입니다.

```python
print(1)
print(2)
print(3)

1
2
3
```

print에는 변수나 값 여러 개를 ,(콤마)로 구분하여 넣을 수 있습니다.

```python
>>> print(1, 2, 3)
1 2 3
>>> print('Hello', 'Python')
Hello Python
```

## sep

값 사이에 공백이 아닌 다른 문자를 넣고 싶을 때, sep에 문자 또는 문자열을 지정해주면 됩니다.

```python
>>> print(1, 2, 3, sep=', ')    # sep에 **콤마**와 **공백**을 지정
1, 2, 3
>>> print(4, 5, 6, sep=',')    # sep에 콤마만 지정
4,5,6
>>> print('Hello', 'Python', sep='')    # sep에 빈 문자열을 지정
HelloPython
>>> print(1920, 1080, sep='x')    # sep에 x를 지정
1920x1080
>>> print(1, 2, 3, sep='\n')
1
2
3
```

## end

end는 현재 print가 끝난 뒤 그 다음에 오는 print 함수에 영향을 줍니다.

```python
print(1, end='') # 다음 번 출력이 바로 뒤에 오게 됨
print(2, end='')
print(3)

123

print(1, end=' ')    # end에 공백 한 칸 지정
print(2, end=' ')
print(3)

1 2 3
```

---

문자열은 비교할 때 대소문자를 구분합니다.

```python
>>> 'Python' == 'python'
False
>>> 'Python' != 'python'
True
```

`==`, `!=`는 값 자체를 비교하고, `is`, `is not`은 `객체(object)`를 비교합니다.

```python
>>> 1 == 1.0
True
>>> 1 is 1.0   
False        # int객체와 float객체
>>> 1 is not 1.0
True
```

`정수 객체`와 `실수 객체`가 서로 다른지 확인하려면 `id 함수`를 사용하면 됩니다. `id`는 객체의 고유한 값(`메모리 주소`)을 구합니다.
(이 값은 파이썬을 실행하는 동안에는 계속 유지되며 다시 실행하면 달라집니다)

```python
>>> id(1)
1714767504
>>> id(1.0)
55320032
```

여기에 나오는 객체의 고유한 값(메모리 주소)에 대해서는 신경 쓸 필요 없습니다. `==, !=와 is, is not의 동작 방식이 다르다는 정도`만 알아 두면 됩니다.

값을 비교할 때는 `is`를 사용하면 안 됩니다.

```python
>>> a = -5
>>> a is -5
True
>>> a = -6
>>> a is -6
False  #True가 나와야 한다
```

---

## 불리언

정수, 실수, 문자열을 불로 만들 때는 bool을 사용하면 됩니다.

다만 JS처럼 `0` , `0.0` , `빈 문자열` 같은 것들은 false가 되고 나머지는 다 true가 됩니다.

```python
>>> bool(1)
True
>>> bool(0)
False
>>> bool(1.5)
True
>>> bool('False')
True
```

## 단락 평가

단락 평가는 첫 번째 값만으로 결과가 확실할 때 두 번째 값은 확인(평가)하지 않는 방법을 말합니다.

```python
# 첫 번째 값이 거짓이므로 두 번째 값은 확인하지 않고 거짓으로 결정
print(False and True)     # False
print(False and False)    # False
```

```python
>>> True and 'Python'
'Python'
```

문자열 'Python'도 불로 따지면 True라서 True and True가 되어 True가 나올 것 같지만 'Python'이 나왔습니다. 왜냐하면 파이썬에서 논리 연산자는 마지막으로 단락 평가를 실시한 값을 그대로 반환하기 때문입니다. 따라서 `논리 연산자는 무조건 불을 반환하지 않습니다.`

물론 , 마지막으로 단락 평가를 실시한 값이 불이면 불을 반환하게 됩니다.

```python
>>> 'Python' and True
True
>>> 'Python' and False
False
```

여기서는 문자열 'Python'을 True로 쳐서 and 연산자가 두 번째 값까지 확인하므로 두 번째 값이 반환됩니다.

and 연산자 앞에 False나 False로 치는 값이 와서 첫 번째 값 만으로 결과가 결정나는 경우에는 첫 번째 값이 반환됩니다.

```python
>>> False and 'Python'
False
>>> 0 and 'Python' # 0은 False이므로 and 연산자는 두 번째 값을 
									 #평가하지 않음
0

```

**문자열에 따옴표를 포함하는** 방법이 있습니다. 다음과 같이 작은따옴표 앞에 \(역슬래시)를 붙이면 됩니다.

```python
'Python isn\'t difficult'
```

문자열을 표시할 때 ,  따옴표3 개를 사용( ''' , """  )하면 작성한 대로 출력이 된다

```python
>>> hello = '''Hello, world!
안녕하세요.
Python입니다.'''
>>> print(hello)
Hello, world!
안녕하세요.
Python입니다.
```