/*
221. 最大正方形
  在一个由 '0' 和 '1' 组成的二维矩阵内，找到只包含 '1' 的最大正方形，并返回其面积。
示例 1：
  输入：matrix = [
    ["1","0","1","0","0"],
    ["1","0","1","1","1"],
    ["1","1","1","1","1"],
    ["1","0","0","1","0"]
  ]
  输出：4
示例 2：
  输入：matrix = [["0","1"],["1","0"]]
  输出：1
示例 3：
  输入：matrix = [["0"]]
  输出：0
提示：
  m == matrix.length
  n == matrix[i].length
  1 <= m, n <= 300
  matrix[i][j] 为 '0' 或 '1'
*/
/**
 * @param {character[][]} matrix
 * @return {number}
 */
var maximalSquare = function (matrix) {
  const m = matrix.length
  const n = matrix[0].length
  const dp = new Array(m).fill(0).map(() => new Array(n).fill(0))
  let max = 0
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (matrix[i][j] === '1') {
        if (i === 0 || j === 0) {
          dp[i][j] = 1
        } else {
          dp[i][j] = Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]) + 1
        }
      }
      max = Math.max(dp[i][j], max)
    }
  }
  return max * max
}
