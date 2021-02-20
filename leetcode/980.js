/*
 * @Author: xiaohuolong
 * @Date: 2021-02-19 15:36:02
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-02-19 17:32:26
 * @FilePath: /js-demo/leetcode/980.js
 */
/**
 * @param {number[][]} grid
 * @return {number}
    980. 不同路径 III
    在二维网格 grid 上，有 4 种类型的方格：
    1 表示起始方格。且只有一个起始方格。
    2 表示结束方格，且只有一个结束方格。
    0 表示我们可以走过的空方格。
    -1 表示我们无法跨越的障碍。
    返回在四个方向（上、下、左、右）上行走时，从起始方格到结束方格的不同路径的数目。
    每一个无障碍方格都要通过一次，但是一条路径中不能重复通过同一个方格。
    示例 1：
        输入：[
            [1,0,0,0],
            [0,0,0,0],
            [0,0,2,-1]
        ]
    输出：2
    解释：我们有以下两条路径：
        1. (0,0),(0,1),(0,2),(0,3),(1,3),(1,2),(1,1),(1,0),(2,0),(2,1),(2,2)
        2. (0,0),(1,0),(2,0),(2,1),(1,1),(0,1),(0,2),(0,3),(1,3),(1,2),(2,2)
    示例 2：
    输入：[
        [1,0,0,0],
        [0,0,0,0],
        [0,0,0,2]
    ]
    输出：4
    解释：我们有以下四条路径： 
    1. (0,0),(0,1),(0,2),(0,3),(1,3),(1,2),(1,1),(1,0),(2,0),(2,1),(2,2),(2,3)
    2. (0,0),(0,1),(1,1),(1,0),(2,0),(2,1),(2,2),(1,2),(0,2),(0,3),(1,3),(2,3)
    3. (0,0),(1,0),(2,0),(2,1),(2,2),(1,2),(1,1),(0,1),(0,2),(0,3),(1,3),(2,3)
    4. (0,0),(1,0),(2,0),(2,1),(1,1),(0,1),(0,2),(0,3),(1,3),(1,2),(2,2),(2,3)
    示例 3：
    输入：[
        [0,1],
        [2,0]
    ]
    输出：0
    解释：
    没有一条路能完全穿过每一个空的方格一次。
    请注意，起始和结束方格可以位于网格中的任意位置。
 */
var uniquePathsIII = function(grid) {
    let cnt = 1
    let sx = 0
    let sy = 0
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            const element = grid[i][j];
            if(element == 0){
                cnt++
            }else if(element == 1){
                sx = i
                sy = j
            }
        }
    }
    let check = (sx, sy, grid) => {
        if(sx < 0 || sx >= grid.length || sy < 0 || sy >= grid[0].length || grid[sx][sy] == -1 || grid[sx][sy] == -2) return false
        return true
    }
    let dfs = (sx, sy, cnt, grid) => {
        if(!check(sx, sy, grid)) return 0
        if(grid[sx][sy] === 2){ // 走到终点时，也要判断一下当前所有空格是否走完
            return cnt === 0 ? 1 : 0
        }
        let res = 0
        grid[sx][sy] = -2  //走过的空格进行标记，设置为障碍即可
        res += dfs(sx + 1, sy, cnt-1, grid)  // 四个方向进行搜索
        res += dfs(sx, sy+1, cnt-1, grid)
        res += dfs(sx-1 , sy, cnt-1, grid)
        res += dfs(sx, sy-1, cnt-1, grid)
        grid[sx][sy] = 0  // 回溯过程，不影响后续dfs
        return res
    }
    // console.log(cnt, sx, sy)
    return dfs(sx, sy, cnt, grid)
};

console.log(uniquePathsIII([
    [1,0,0,0],
    [0,0,0,0],
    [0,0,2,-1]
]))