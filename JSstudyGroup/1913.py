import math

N = int(input())
taregt = int(input())
[dx, dy] = [[1, 0, -1, 0], [0, 1, 0, -1]]
dirIndex = 3
[x, y] = [-1, 0]
length = N
board = [[0 for _ in range(length)] for j in range(length)]

answer = []
for i in range(N**2, 0, -1):
    nx = x + dx[dirIndex]
    ny = y + dy[dirIndex]
    if nx >= length or nx < 0 or ny >= length or ny < 0 or board[nx][ny] != 0:
        dirIndex = (dirIndex + 1) % 4
        nx = x + dx[dirIndex]
        ny = y + dy[dirIndex]
    board[nx][ny] = i
    if i == taregt:
        answer.extend([nx + 1, ny + 1])
    x = nx
    y = ny

print("\n".join([" ".join(map(str, row)) for row in board]))
print(" ".join(map(str, answer)))
