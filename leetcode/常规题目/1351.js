/*
 * @Author: xiaohuolong
 * @Date: 2021-04-05 18:42:41
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-04-05 19:12:04
 * @FilePath: /js-demo/leetcode/常规题目/1351.js
 */
/**
 * @param {number[][]} grid
 * @return {number}
1351. 统计有序矩阵中的负数
    给你一个 m * n 的矩阵 grid，矩阵中的元素无论是按行还是按列，都以非递增顺序排列。 
    请你统计并返回 grid 中 负数 的数目。
示例 1：
    输入：grid = [[4,3,2,-1],[3,2,1,-1],[1,1,-1,-2],[-1,-1,-2,-3]]
    输出：8
    解释：矩阵中共有 8 个负数。
示例 2：
    输入：grid = [[3,2],[1,0]]
    输出：0
示例 3：
    输入：grid = [[1,-1],[-1,-1]]
    输出：3
示例 4：
    输入：grid = [[-1]]
    输出：1
提示：
    m == grid.length
    n == grid[i].length
    1 <= m, n <= 100
    -100 <= grid[i][j] <= 100
进阶：你可以设计一个时间复杂度为 O(n + m) 的解决方案吗？
 */
var countNegatives = function(grid) {
    let count = 0
    let m = grid.length
    let n = grid[0].length
    for (let i = 0; i < m; i++) {
        const array = grid[i];
        let l = 0
        let r = n - 1
        let pos = -1
        while (l <= r){
            let mid = l + ((r - l) >> 1)
            if(array[mid] < 0){
                pos = mid
                r = mid - 1
            }else{
                l = mid + 1
            }
        }
        if(pos >= 0) count += (n - pos)
    }
    return count
};
console.log(countNegatives([
    [4,3,2,-1],
    [3,2,1,-1],
    [1,1,-1,-2],
    [-1,-1,-2,-3]
]))