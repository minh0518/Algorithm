[n, m] = list(map(int, input().split(" ")))
board = [list(input()) for _ in range(n)]

[dx, dy] = [[-1, 1, 0, 0], [0, 0, -1, 1]]


def check(x, y):
    count = 0

    for i in range(4):
        nx = x + dx[i]
        ny = y + dy[i]

        if nx < 0 or nx > n - 1 or ny < 0 or ny > m - 1:
            count += 1
            continue
        if board[nx][ny] == ".":
            count += 1

    if count >= 3:
        return True
    return False


changeCord = []
landCord = []
for i in range(len(board)):
    for j in range(len(board[i])):
        value = board[i][j]
        if value == "X":
            landCord.append([i, j])
        if value == "X" and check(i, j):
            changeCord.append([i, j])


for i in changeCord:
    [x, y] = i
    board[x][y] = "."


leftCord = list(filter(lambda i: not i in changeCord, landCord))


startRow = sorted(leftCord, key=lambda x: (x[0]))[0][0]
startCol = sorted(leftCord, key=lambda x: (x[1]))[0][1]
endRow = sorted(leftCord, key=lambda x: (-x[0]))[0][0]
endCol = sorted(leftCord, key=lambda x: (-x[1]))[0][1]


result = []
for row in range(startRow, endRow + 1):
    result.append(board[row][startCol : endCol + 1])

print("\n".join(["".join((i)) for i in result]))
