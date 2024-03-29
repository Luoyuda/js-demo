/*
 * @Author: xiaohuolong
 * @Date: 2021-04-12 08:45:05
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-05-17 16:09:41
 * @FilePath: /js-demo/leetcode/常规题目/695.js
 */
/**
 * @param {number[][]} grid
 * @return {number}
695. 岛屿的最大面积
    给定一个包含了一些 0 和 1 的非空二维数组 grid 。
    一个 岛屿 是由一些相邻的 1 (代表土地) 构成的组合，这里的「相邻」要求两个 1 必须在水平或者竖直方向上相邻。你可以假设 grid 的四个边缘都被 0（代表水）包围着。
    找到给定的二维数组中最大的岛屿面积。(如果没有岛屿，则返回面积为 0 。)
示例 1:
[
    [0,0,1,0,0,0,0,1,0,0,0,0,0],
    [0,0,0,0,0,0,0,1,1,1,0,0,0],
    [0,1,1,0,1,0,0,0,0,0,0,0,0],
    [0,1,0,0,1,1,0,0,1,0,1,0,0],
    [0,1,0,0,1,1,0,0,1,1,1,0,0],
    [0,0,0,0,0,0,0,0,0,0,1,0,0],
    [0,0,0,0,0,0,0,1,1,1,0,0,0],
    [0,0,0,0,0,0,0,1,1,0,0,0,0]
]
对于上面这个给定矩阵应返回 6。注意答案不应该是 11 ，因为岛屿只能包含水平或垂直的四个方向的 1 。
示例 2:
    [[0,0,0,0,0,0,0,0]]
    对于上面这个给定的矩阵, 返回 0。
注意: 给定的矩阵grid 的长度和宽度都不超过 50。
 */
var maxAreaOfIsland = function (grid) {
  let m = grid.length
  if (!m) return 0
  let n = grid[0].length
  if (!n) return 0
  let dfs = (x, y) => {
    if (x < 0 || y < 0 || x >= m || y >= n || grid[x][y] == 0) return 0
    // console.log(x, y)
    grid[x][y] = 0
    return dfs(x + 1, y) + dfs(x, y + 1) + dfs(x - 1, y) + dfs(x, y - 1) + 1
  }
  let max = 0
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (grid[i][j] == 1) {
        max = Math.max(max, dfs(i, j))
      }
    }
  }
  return max
}

/**
 * @param {number[][]} grid
 * @return {number}
 */
var maxAreaOfIsland = function (grid) {
  let dx = [-1, 0, 1, 0]
  let dy = [0, 1, 0, -1]
  let m = grid.length
  let n = grid[0].length
  let ans = 0
  let dfs = (x, y) => {
    grid[x][y] = 0
    let res = 1
    for (let i = 0; i < 4; i++) {
      let a = x + dx[i]
      let b = y + dy[i]
      if (a >= 0 && b >= 0 && a < m && b < n && grid[a][b] == 1) {
        res += dfs(a, b)
      }
    }
    return res
  }
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (grid[i][j] == 1) {
        ans = Math.max(ans, dfs(i, j))
      }
    }
  }
  return ans
}

console.log(
  maxAreaOfIsland([
    [0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
    [0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 0, 0, 1, 1, 0, 0, 1, 0, 1, 0, 0],
    [0, 1, 0, 0, 1, 1, 0, 0, 1, 1, 1, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
  ])
)
console.log(
  maxAreaOfIsland([
    [1, 1, 0, 0, 0],
    [1, 1, 0, 0, 0],
    [0, 0, 0, 1, 1],
    [0, 0, 0, 1, 1],
  ])
)
