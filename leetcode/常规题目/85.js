/*
85. 最大矩形
  给定一个仅包含 0 和 1 、大小为 rows x cols 的二维二进制矩阵，
  找出只包含 1 的最大矩形，并返回其面积。
示例 1：
  输入：matrix = [["1","0","1","0","0"],["1","0","1","1","1"],["1","1","1","1","1"],["1","0","0","1","0"]]
  输出：6
  解释：最大矩形如上图所示。
示例 2：
  输入：matrix = []
  输出：0
示例 3：
  输入：matrix = [["0"]]
  输出：0
示例 4：
  输入：matrix = [["1"]]
  输出：1
示例 5：
  输入：matrix = [["0","0"]]
  输出：0
提示：
  rows == matrix.length
  cols == matrix[0].length
  1 <= row, cols <= 200
  matrix[i][j] 为 '0' 或 '1'
*/
/**
 * @param {character[][]} matrix
 * @return {number}
 */
var maximalRectangle = function (matrix) {
  const m = matrix.length
  const n = matrix[0].length
  const left = new Array(m).fill(0).map(() => new Array(n).fill(0))
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (matrix[i][j] === '1') {
        left[i][j] = (j === 0 ? 0 : left[i][j - 1]) + 1
      }
    }
  }
  let res = 0
  for (let j = 0; j < n; j++) {
    const up = new Array(m).fill(0)
    const down = new Array(m).fill(0)
    let stack = []
    for (let i = 0; i < m; i++) {
      while (stack.length && left[stack[stack.length - 1]][j] >= left[i][j]) {
        stack.pop()
      }
      up[i] = stack.length === 0 ? -1 : stack[stack.length - 1]
      stack.push(i)
    }
    stack = []
    for (let i = m - 1; i >= 0; i--) {
      while (stack.length && left[stack[stack.length - 1]][j] >= left[i][j]) {
        stack.pop()
      }
      down[i] = stack.length === 0 ? m : stack[stack.length - 1]
      stack.push(i)
    }
    for (let i = 0; i < m; i++) {
      const height = down[i] - up[i] - 1
      const area = height * left[i][j]
      res = Math.max(area, res)
    }
  }
  return res
}
