import json

T = int(input())

result = []
while T:
    T -= 1

    command = list(input())
    length = int(input())
    arr = json.loads(input())

    firstIndex = -1
    lastIndex = length
    isReverse = False

    errorFlag = False
    for i in command:
        if i == "R":
            isReverse = not isReverse
            continue

        if (
            firstIndex == length - 1
            or lastIndex == 0
            or abs(lastIndex - firstIndex) == 1
        ):
            errorFlag = True
            result.append("error")
            break

        if not isReverse:
            firstIndex += 1
        if isReverse:
            lastIndex -= 1

    if errorFlag:
        continue

    answer = arr[firstIndex + 1 : lastIndex]
    if isReverse:
        result.append("[" + ",".join(map(str, answer[::-1])) + "]")
        continue
    result.append("[" + ",".join(map(str, answer)) + "]")

print("\n".join(result))
