/*
 * @Author: xiaohuolong
 * @Date: 2021-05-17 16:56:29
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-05-17 16:57:33
 * @FilePath: /js-demo/leetcode/常规题目/1020.js
 */
/*
1020. 飞地的数量
    给出一个二维数组 A，每个单元格为 0（代表海）或 1（代表陆地）。
    移动是指在陆地上从一个地方走到另一个地方（朝四个方向之一）或离开网格的边界。
    返回网格中无法在任意次数的移动中离开网格边界的陆地单元格的数量。
示例 1：
    输入：[[0,0,0,0],[1,0,1,0],[0,1,1,0],[0,0,0,0]]
    输出：3
解释： 
    有三个 1 被 0 包围。一个 1 没有被包围，因为它在边界上。
示例 2：
    输入：[[0,1,1,0],[0,0,1,0],[0,0,1,0],[0,0,0,0]]
    输出：0
解释：
    所有 1 都在边界上或可以到达边界。
提示：
    1 <= A.length <= 500
    1 <= A[i].length <= 500
    0 <= A[i][j] <= 1
    所有行的大小都相同
*/
/**
 * @param {number[][]} grid
 * @return {number}
 */
var numEnclaves = function(grid) {
    let count = 0
    let m = grid.length
    let n = grid[0].length
    let dx = [-1, 0, 1, 0]
    let dy = [0, -1, 0, 1]
    let dfs = (x, y) => {
        let res = 1
        grid[x][y] = 0
        for(let i = 0; i < 4; i++){
            let a = x + dx[i]
            let b = y + dy[i]
            if(a >= 0 && b >= 0 && a < m && b < n && grid[a][b] == 1){
                res += dfs(a, b)
            }
        }
        return res
    }
    // 处理边缘的 1
    for(let i = 0; i < m; i++){
        if(grid[i][0] == 1) dfs(i, 0)
        if(grid[i][n - 1] == 1) dfs(i, n - 1)
    }
    // 处理边缘的 1
    for(let i = 0; i < n; i++){
        if(grid[0][i] == 1) dfs(0, i)
        if(grid[m - 1][i] == 1) dfs(m - 1, i)
    }
    for(let i = 1; i < m; i++){
        for(let j = 1; j < n; j++){
            if(grid[i][j] == 1){
                count += dfs(i, j)
            }
        }
    }
    return count
};