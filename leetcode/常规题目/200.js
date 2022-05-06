/*
 * @Author: xiaohuolong
 * @Date: 2021-04-21 21:39:31
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-08-02 12:26:07
 * @FilePath: /js-demo/leetcode/常规题目/200.js
 */
/*
200. 岛屿数量
    给你一个由 '1'（陆地）和 '0'（水）组成的的二维网格，请你计算网格中岛屿的数量。
    岛屿总是被水包围，并且每座岛屿只能由水平方向和/或竖直方向上相邻的陆地连接形成。
    此外，你可以假设该网格的四条边均被水包围。
示例 1：
    输入：grid = [
        ["1","1","1","1","0"],
        ["1","1","0","1","0"],
        ["1","1","0","0","0"],
        ["0","0","0","0","0"]
    ]
    输出：1
示例 2：
    输入：grid = [
        ["1","1","0","0","0"],
        ["1","1","0","0","0"],
        ["0","0","1","0","0"],
        ["0","0","0","1","1"]
    ]
    输出：3
提示：
    m == grid.length
    n == grid[i].length
    1 <= m, n <= 300
    grid[i][j] 的值为 '0' 或 '1'
*/
/**
 * @param {character[][]} grid
 * @return {number}
 */
var numIslands = function (grid) {
  let m = grid.length
  let n = grid[0].length
  let bfs = (x, y) => {
    if (x < 0 || y < 0 || x >= m || y >= n || grid[x][y] == 0) return
    grid[x][y] = 0
    bfs(x + 1, y)
    bfs(x - 1, y)
    bfs(x, y + 1)
    bfs(x, y - 1)
  }
  let ans = 0
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (grid[i][j] == 1) {
        ans += 1
        bfs(i, j)
      }
    }
  }
  return ans
}
let dx = [-1, 0, 1, 0]
let dy = [0, -1, 0, 1]
let dfs = (grid, x, y) => {
  grid[x][y] = 0
  for (let i = 0; i < 4; i++) {
    let a = x + dx[i]
    let b = y + dy[i]
    if (
      a >= 0 &&
      b >= 0 &&
      a < grid.length &&
      b < grid[0].length &&
      grid[a][b] == 1
    ) {
      dfs(grid, a, b)
    }
  }
}
var numIslands = function (grid) {
  let m = grid.length
  let n = grid[0].length
  let ans = 0
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (grid[i][j] == 1) {
        ans += 1
        dfs(grid, i, j)
      }
    }
  }
  return ans
}
/**
 * @param {character[][]} grid
 * @return {number}
 */
var numIslands = function (grid) {
  let m = grid.length
  let n = grid[0].length
  let count = 0
  let dx = [-1, 0, 1, 0]
  let dy = [0, -1, 0, 1]
  let bfs = (x, y) => {
    grid[x][y] = 0
    let q = [[x, y]]
    while (q.length) {
      let [x, y] = q.shift()
      for (let i = 0; i < 4; i++) {
        let a = x + dx[i]
        let b = y + dy[i]
        if (a >= 0 && b >= 0 && a < m && b < n && grid[a][b] == 1) {
          grid[a][b] = 0
          q.push([a, b])
        }
      }
    }
  }
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (grid[i][j] == 1) {
        bfs(i, j)
        count++
      }
    }
  }
  return count
}
/**
 * @param {character[][]} grid
 * @return {number}
 */
var numIslands = function (grid) {
  let m = grid.length
  let n = grid[0].length
  let uf = new UnionFind(grid)
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (grid[i][j] == '1') {
        grid[i][j] = '0'
        for (let z = 0; z < 4; z++) {
          let x = dx[z] + i
          let y = dy[z] + j
          if (x >= 0 && x < m && y >= 0 && y < n && grid[x][y] == '1') {
            uf.union(i * n + j, x * n + y)
          }
        }
      }
    }
  }
  return uf.count
}
class UnionFind {
  constructor(grid) {
    this.count = 0
    let m = grid.length
    let n = grid[0].length
    let size = m * n
    this.root = new Array(size).fill(0)
    this.rank = new Array(size).fill(0)
    for (let i = 0; i < m; i++) {
      for (let j = 0; j < n; j++) {
        if (grid[i][j] == '1') {
          let z = i * n + j
          this.root[z] = z
          this.count++
        }
      }
    }
  }
  find(x) {
    if (x === this.root[x]) return x
    return (this.root[x] = this.find(this.root[x]))
  }
  union(x, y) {
    let rootX = this.find(x)
    let rootY = this.find(y)
    if (rootX !== rootY) {
      let rankX = this.rank[rootX]
      let rankY = this.rank[rootY]
      if (rankX > rankY) {
        this.root[rootY] = rootX
      } else if (rankX < rankY) {
        this.root[rootX] = rootY
      } else {
        this.root[rootY] = rootX
        this.rank[rootX]++
      }
      this.count--
    }
  }
}
/**
 * @param {character[][]} grid
 * @return {number}
 */
var numIslands = function (grid) {
  const dir = [
    [-1, 0],
    [0, -1],
    [1, 0],
    [0, 1],
  ]
  const m = grid.length
  const n = grid[0].length
  let ans = 0
  const dfs = (x, y) => {
    grid[x][y] = 1
    for (const [dx, dy] of dir) {
      const a = x + dx
      const b = y + dy
      if (a >= 0 && b >= 0 && a < m && b < n) {
        if (grid[a][b] === '1') {
          dfs(a, b)
        }
      }
    }
  }
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (grid[i][j] === '1') {
        ans++
        dfs(i, j)
      }
    }
  }
  return ans
}
console.log(
  numIslands([
    ['1', '1', '0', '0', '0'],
    ['1', '1', '0', '0', '0'],
    ['0', '0', '1', '0', '0'],
    ['0', '0', '0', '1', '1'],
  ])
)
console.log(
  numIslands([
    ['1', '1', '1', '1', '0'],
    ['1', '1', '0', '1', '0'],
    ['1', '1', '0', '0', '0'],
    ['0', '0', '0', '0', '0'],
  ])
)
console.log(
  numIslands([
    ['1', '1', '1'],
    ['0', '1', '0'],
    ['1', '1', '1'],
  ])
)
