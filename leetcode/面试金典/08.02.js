/*
 * @Author: xiaohuolong
 * @Date: 2021-04-01 23:27:12
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-04-02 08:07:33
 * @FilePath: /js-demo/leetcode/面试金典/08.02.js
 */
/**
 * @param {number[][]} obstacleGrid
 * @return {number[][]}
面试题 08.02. 迷路的机器人
设想有个机器人坐在一个网格的左上角，网格 r 行 c 列。机器人只能向下或向右移动，
但不能走到一些被禁止的网格（有障碍物）。设计一种算法，寻找机器人从左上角移动到右下角的路径。
网格中的障碍物和空位置分别用 1 和 0 来表示。
返回一条可行的路径，路径由经过的网格的行号和列号组成。左上角为 0 行 0 列。如果没有可行的路径，返回空数组。
示例 1:
输入:
    [
        [0,0,0],
        [0,1,0],
        [0,0,0]
    ]
输出: [
    [0,0],
    [0,1],
    [0,2],
    [1,2],
    [2,2]
]
解释: 
输入中标粗的位置即为输出表示的路径，即
0行0列（左上角） -> 0行1列 -> 0行2列 -> 1行2列 -> 2行2列（右下角）
说明：r 和 c 的值均不超过 100。
 */
var pathWithObstacles = function(obstacleGrid) {
    let m = obstacleGrid.length
    let n = obstacleGrid[0].length
    let res = []
    let dfs = (x, y) => {
        // console.log(x, y)
        if(x < 0 || y < 0 || x > m - 1 || y > n - 1 || obstacleGrid[x][y] == 1) return false
        obstacleGrid[x][y] = 1
        res.push([x, y])
        if(x == m - 1 && y == n - 1) return true
        if(dfs(x+1, y) || dfs(x, y+1)) return true
        res.pop()
        return false
    }
    dfs(0, 0)
    return res
};


console.log(pathWithObstacles([
    [0,0,0],
    [1,1,0],
    [0,0,0]
]))