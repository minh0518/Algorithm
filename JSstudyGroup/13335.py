import collections

[n, w, l] = list(map(int, input().split(" ")))
trucks = list(map(int, input().split(" ")))
bridge = collections.deque()
currentIndex = 0


count = 0
while currentIndex != n:
    next = trucks[currentIndex]

    if len(bridge) == w:
        bridge.popleft()
        if sum(bridge) + next > l:
            bridge.append(0)
        if sum(bridge) + next <= l:
            bridge.append(next)
            currentIndex += 1
        count += 1
        continue

    if sum(bridge) + next > l:
        bridge.append(0)
        count += 1
    if sum(bridge) + next <= l:
        bridge.append(next)
        currentIndex += 1
        count += 1


print(count + w)
