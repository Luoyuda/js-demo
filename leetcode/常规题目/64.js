/*
 * @Author: xiaohuolong
 * @Date: 2021-04-13 22:59:41
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-04-14 07:34:47
 * @FilePath: /js-demo/leetcode/常规题目/64.js
 */
/**
 * @param {number[][]} grid
 * @return {number}
64. 最小路径和
    给定一个包含非负整数的 m x n 网格 grid ，请找出一条从左上角到右下角的路径，使得路径上的数字总和为最小。
    说明：每次只能向下或者向右移动一步。
示例 1：
    输入：grid = [[1,3,1],[1,5,1],[4,2,1]]
    输出：7
    解释：因为路径 1→3→1→1→1 的总和最小。
示例 2：
    输入：grid = [[1,2,3],[4,5,6]]
    输出：12
提示：
    m == grid.length
    n == grid[i].length
    1 <= m, n <= 200
    0 <= grid[i][j] <= 100
 */
var minPathSum = function (grid) {
  let min = Infinity
  let m = grid.length
  let n = grid[0].length
  let dfs = (x, y, sum) => {
    if (x == m - 1 && y == n - 1) {
      min = Math.min(sum + grid[x][y], min)
      return
    }
    if (x > m - 1 || y > n - 1) return
    dfs(x + 1, y, sum + grid[x][y])
    dfs(x, y + 1, sum + grid[x][y])
  }
  dfs(0, 0, 0)
  return min
}

var minPathSum = function (grid) {
  let m = grid.length
  let n = grid[0].length
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (i == 0 && j == 0) continue
      else if (i == 0) grid[i][j] = grid[i][j] + grid[i][j - 1]
      else if (j == 0) grid[i][j] = grid[i][j] + grid[i - 1][j]
      else grid[i][j] = grid[i][j] + Math.min(grid[i - 1][j], grid[i][j - 1])
    }
  }
  return grid[m - 1][n - 1]
}
/**
 * @param {number[][]} grid
 * @return {number}
 */
var minPathSum = function (grid) {
  const m = grid.length
  const n = grid[0].length
  for (let i = 1; i < m; i++) {
    grid[i][0] = grid[i - 1][0] + grid[i][0]
  }
  for (let i = 1; i < n; i++) {
    grid[0][i] = grid[0][i - 1] + grid[0][i]
  }
  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      grid[i][j] = Math.min(grid[i - 1][j], grid[i][j - 1]) + grid[i][j]
    }
  }
  return grid[m - 1][n - 1]
}
var grid = [
  [1, 3, 1],
  [1, 5, 1],
  [4, 2, 1],
]
grid = [
  [3, 8, 6, 0, 5, 9, 9, 6, 3, 4, 0, 5, 7, 3, 9, 3],
  [0, 9, 2, 5, 5, 4, 9, 1, 4, 6, 9, 5, 6, 7, 3, 2],
  [8, 2, 2, 3, 3, 3, 1, 6, 9, 1, 1, 6, 6, 2, 1, 9],
  [1, 3, 6, 9, 9, 5, 0, 3, 4, 9, 1, 0, 9, 6, 2, 7],
  [8, 6, 2, 2, 1, 3, 0, 0, 7, 2, 7, 5, 4, 8, 4, 8],
  [4, 1, 9, 5, 8, 9, 9, 2, 0, 2, 5, 1, 8, 7, 0, 9],
  [6, 2, 1, 7, 8, 1, 8, 5, 5, 7, 0, 2, 5, 7, 2, 1],
  [8, 1, 7, 6, 2, 8, 1, 2, 2, 6, 4, 0, 5, 4, 1, 3],
  [9, 2, 1, 7, 6, 1, 4, 3, 8, 6, 5, 5, 3, 9, 7, 3],
  [0, 6, 0, 2, 4, 3, 7, 6, 1, 3, 8, 6, 9, 0, 0, 8],
  [4, 3, 7, 2, 4, 3, 6, 4, 0, 3, 9, 5, 3, 6, 9, 3],
  [2, 1, 8, 8, 4, 5, 6, 5, 8, 7, 3, 7, 7, 5, 8, 3],
  [0, 7, 6, 6, 1, 2, 0, 3, 5, 0, 8, 0, 8, 7, 4, 3],
  [0, 4, 3, 4, 9, 0, 1, 9, 7, 7, 8, 6, 4, 6, 9, 5],
  [6, 5, 1, 9, 9, 2, 2, 7, 4, 2, 7, 2, 2, 3, 7, 2],
  [7, 1, 9, 6, 1, 2, 7, 0, 9, 6, 6, 4, 4, 5, 1, 0],
  [3, 4, 9, 2, 8, 3, 1, 2, 6, 9, 7, 0, 2, 4, 2, 0],
  [5, 1, 8, 8, 4, 6, 8, 5, 2, 4, 1, 6, 2, 2, 9, 7],
]
console.log(minPathSum(grid))
