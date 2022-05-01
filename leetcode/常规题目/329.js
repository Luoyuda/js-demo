/*
329. 矩阵中的最长递增路径
  给定一个 m x n 整数矩阵 matrix ，找出其中 最长递增路径 的长度。
  对于每个单元格，你可以往上，下，左，右四个方向移动。 你 不能 在 
  对角线 方向上移动或移动到 边界外（即不允许环绕）。
示例 1：
  输入：matrix = [[9,9,4],[6,6,8],[2,1,1]]
  输出：4 
  解释：最长递增路径为 [1, 2, 6, 9]。
示例 2：
  输入：matrix = [[3,4,5],[3,2,6],[2,2,1]]
  输出：4 
  解释：最长递增路径是 [3, 4, 5, 6]。注意不允许在对角线方向上移动。
示例 3：
  输入：matrix = [[1]]
  输出：1
提示：
  m == matrix.length
  n == matrix[i].length
  1 <= m, n <= 200
  0 <= matrix[i][j] <= 231 - 1
*/
/**
 * @param {number[][]} matrix
 * @return {number}
 */
var longestIncreasingPath = function (matrix) {
  const dir = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ]
  const m = matrix.length
  const n = matrix[0].length
  const memo = new Array(m).fill(0).map(() => new Array(n).fill(0))
  let ans = 0
  const dfs = (x, y) => {
    if (memo[x][y] !== 0) return memo[x][y]
    ++memo[x][y]
    for (let [a, b] of dir) {
      a += x
      b += y
      if (a >= 0 && b >= 0 && a < m && b < n && matrix[a][b] > matrix[x][y]) {
        memo[x][y] = Math.max(memo[x][y], dfs(a, b) + 1)
      }
    }
    return memo[x][y]
  }
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      ans = Math.max(ans, dfs(i, j))
    }
  }
  return ans
}
