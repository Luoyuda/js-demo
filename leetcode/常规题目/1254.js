/*
 * @Author: xiaohuolong
 * @Date: 2021-05-17 17:27:08
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-05-20 20:49:21
 * @FilePath: /js-demo/leetcode/常规题目/1254.js
 */
/*
1254. 统计封闭岛屿的数目
    有一个二维矩阵 grid ，每个位置要么是陆地（记号为 0 ）要么是水域（记号为 1 ）。
    我们从一块陆地出发，每次可以往上下左右 4 个方向相邻区域走，能走到的所有陆地区域，我们将其称为一座「岛屿」。
    如果一座岛屿 完全 由水域包围，即陆地边缘上下左右所有相邻区域都是水域，那么我们将其称为 「封闭岛屿」。
    请返回封闭岛屿的数目。
示例 1：
    输入：grid = [[1,1,1,1,1,1,1,0],[1,0,0,0,0,1,1,0],[1,0,1,0,1,1,1,0],[1,0,0,0,0,1,0,1],[1,1,1,1,1,1,1,0]]
    输出：2
    解释：
    灰色区域的岛屿是封闭岛屿，因为这座岛屿完全被水域包围（即被 1 区域包围）。
示例 2：
    输入：grid = [[0,0,1,0,0],[0,1,0,1,0],[0,1,1,1,0]]
    输出：1
示例 3：
    输入：grid = [[1,1,1,1,1,1,1],
                [1,0,0,0,0,0,1],
                [1,0,1,1,1,0,1],
                [1,0,1,0,1,0,1],
                [1,0,1,1,1,0,1],
                [1,0,0,0,0,0,1],
                [1,1,1,1,1,1,1]]
    输出：2
提示：
    1 <= grid.length, grid[0].length <= 100
    0 <= grid[i][j] <=1
*/
/**
 * @param {number[][]} grid
 * @return {number}
 */
var closedIsland = function(grid) {
    let dx = [-1, 0, 1, 0]
    let dy = [0, -1, 0, 1]
    let m = grid.length
    let n = grid[0].length
    let count = 0
    let dfs = (x, y) => {
        grid[x][y] = 1
        for(let i = 0; i < 4; i++){
            let a = x + dx[i]
            let b = y + dy[i]
            if(a >= 0 && b >= 0 && a < m && b < n && grid[a][b] == 0){
                dfs(a, b)
            }
        }
    }
    for(let i = 0; i < m; i++){
        if(grid[i][0] == 0) dfs(i, 0)
        if(grid[i][n - 1] == 0) dfs(i, n - 1)
    }
    for(let i = 0; i < n; i++){
        if(grid[0][i] == 0) dfs(0, i)
        if(grid[m - 1][i] == 0) dfs(m - 1, i)
    }
    for(let i = 1; i < m - 1; i++){
        for(let j = 1; j < n - 1; j++){
            if(grid[i][j] == 0){
                dfs(i, j)
                count++
            }
        }
    }
    return count
};

/**
 * @param {number[][]} grid
 * @return {number}
 */
var closedIsland = function(grid) {
    let m = grid.length
    let n = grid[0].length
    let dx = [-1, 0, 1, 0]
    let dy = [0, -1, 0, 1]
    let inArea = (x, y) => x >= 0 && y >= 0 && x < m && y < n
    let bfs = (x, y, u, v) => {
        if(grid[x][y] != u) return
        let q = [[x, y]]
        grid[x][y] = v
        while(q.length){
            let [x, y] = q.shift()
            for(let i = 0; i < 4; i++){
                let a = x + dx[i]
                let b = y + dy[i]
                if(inArea(a, b) && grid[a][b] == u){
                    grid[a][b] = v
                    q.push([a, b])
                }
            }
        }
    }
    for(let i = 0; i < m; i++){
        bfs(i, 0, 0, 1)
        bfs(i, n - 1, 0, 1)
    }
    for(let i = 0; i < m; i++){
        bfs(0, i, 0, 1)
        bfs(m - 1, i, 0, 1)
    }
    let count = 0
    for(let i = 1; i < m - 1; i++){
        for(let j = 1; j < n - 1; j++){
            if(grid[i][j] == 0){
                count++
                bfs(i, j, 0, 1)
            }
        }
    }
    return count
};