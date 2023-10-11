import collections

[M, N] = list(map(int, input().split(" ")))
board = [list(map(int, input().split(" "))) for _ in range(N)]

[dx, dy] = [[-1, 1, 0, 0], [0, 0, -1, 1]]

queue = collections.deque()
for i in range(N):
    for j in range(M):
        value = board[i][j]
        if value == 1:
            queue.append([i, j, 0])

result = []

answer = 0


def bfs(queue):
    global answer
    global board
    while len(queue):
        [x, y, depth] = queue.popleft()
        for i in range(4):
            nx = x + dx[i]
            ny = y + dy[i]
            if nx < 0 or nx >= N or ny < 0 or ny >= M or board[nx][ny] != 0:
                continue
            board[nx][ny] = depth + 1
            answer = depth + 1
            queue.append([nx, ny, depth + 1])


bfs(queue)

for i in board:
    for j in i:
        if j == 0:
            answer = -1

print(answer)
