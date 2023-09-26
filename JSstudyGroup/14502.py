import copy
import collections

[N, M] = list(map(int, input().split(" ")))
board = [list(map(int, input().split(" "))) for _ in range(N)]
wallLocations = []
virus = []
zeroCount = []


[dx, dy] = [[-1, 1, 0, 0], [0, 0, -1, 1]]

for i in range(N):
    for j in range(M):
        value = board[i][j]
        if value == 2:
            virus.append([i, j])
        if board[i][j] == 0:
            zeroCount.append([i, j])


def bfs(board):
    copyBoard = copy.deepcopy(board)

    queue = collections.deque(virus)
    while len(queue):
        [x, y] = queue.popleft()
        for i in range(4):
            nx = x + dx[i]
            ny = y + dy[i]
            if nx < 0 or nx >= N or ny < 0 or ny >= M or copyBoard[nx][ny] != 0:
                continue
            copyBoard[nx][ny] = 2
            queue.append([nx, ny])

    count = 0
    for i in copyBoard:
        for j in i:
            if j == 0:
                count += 1

    return count


result = []


def dfs(board, x, y, currentWall):
    if len(currentWall) == 3:
        result.append(bfs(board))
        return

    for i in range(x, N):
        # 다음 행 부터는 0열부터 탐색해야 함
        if i != N:
            y = 0
        for j in range(y, M):
            value = board[i][j]
            if value == 0:
                board[i][j] = 1
                currentWall.append([i, j])
                # 다음 좌표부터 탐색해야 하므로
                dfs(board, i, j, currentWall)
                board[i][j] = 0
                currentWall.pop()


dfs(board, 0, 0, [])

print(max(result))
