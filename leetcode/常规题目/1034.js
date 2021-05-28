/*
 * @Author: xiaohuolong
 * @Date: 2021-05-17 21:03:32
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-05-17 21:04:12
 * @FilePath: /js-demo/leetcode/常规题目/1034.js
 */
/*
1034. 边框着色
    给出一个二维整数网格 grid，网格中的每个值表示该位置处的网格块的颜色。
    只有当两个网格块的颜色相同，而且在四个方向中任意一个方向上相邻时，它们属于同一连通分量。
    连通分量的边界是指连通分量中的所有与不在分量中的正方形相邻（四个方向上）的所有正方形，或者在网格的边界上（第一行/列或最后一行/列）的所有正方形。
    给出位于 (r0, c0) 的网格块和颜色 color，使用指定颜色 color 为所给网格块的连通分量的边界进行着色，并返回最终的网格 grid 。
示例 1：
    输入：grid = [[1,1],[1,2]], r0 = 0, c0 = 0, color = 3
    输出：[[3, 3], [3, 2]]
示例 2：
    输入：grid = [[1,2,2],[2,3,2]], r0 = 0, c0 = 1, color = 3
    输出：[[1, 3, 3], [2, 3, 3]]
示例 3：
    输入：grid = [[1,1,1],[1,1,1],[1,1,1]], r0 = 1, c0 = 1, color = 2
    输出：[[2, 2, 2], [2, 1, 2], [2, 2, 2]]
提示：
    1 <= grid.length <= 50
    1 <= grid[0].length <= 50
    1 <= grid[i][j] <= 1000
    0 <= r0 < grid.length
    0 <= c0 < grid[0].length
    1 <= color <= 1000
*/
/**
 * @param {number[][]} grid
 * @param {number} r0
 * @param {number} c0
 * @param {number} color
 * @return {number[][]}
 */
var colorBorder = function(grid, r0, c0, color) {
    let m = grid.length
    let n = grid[0].length
    let dx = [-1, 0, 1, 0]
    let dy = [0, -1, 0, 1]
    let oColor = grid[r0][c0]
    if(oColor == color) return grid
    let visited = {}
    let dfs = (x, y) => {
        for(let i = 0; i < 4; i++){
            let a = x + dx[i]
            let b = y + dy[i]
            if(a >= 0 && b >= 0 && a < m && b < n){
                let key = `${a}-${b}`
                if(visited[key]) continue
                if(grid[a][b] == oColor){
                    visited[key] = true
                    dfs(a,b)
                }else{
                    grid[x][y] = color
                }
            }else{
                grid[x][y] = color
            }
        }
    }
    dfs(r0, c0)
    return grid
};