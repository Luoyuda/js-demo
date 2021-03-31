/*
 * @Author: xiaohuolong
 * @Date: 2021-03-30 00:04:47
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-03-30 00:23:56
 * @FilePath: /js-demo/leetcode/常规题目/74.js
 */
/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
74. 搜索二维矩阵
    编写一个高效的算法来判断 m x n 矩阵中，是否存在一个目标值。该矩阵具有如下特性：
    每行中的整数从左到右按升序排列。
    每行的第一个整数大于前一行的最后一个整数。
示例 1：
输入：matrix = [
    [1,3,5,7],
    [10,11,16,20],
    [23,30,34,60]
], target = 3
输出：true
示例 2：
输入：matrix = [
    [1,3,5,7],
    [10,11,16,20],
    [23,30,34,60]
], target = 13
输出：false
提示：
    m == matrix.length
    n == matrix[i].length
    1 <= m, n <= 100
    -104 <= matrix[i][j], target <= 104
 */
var searchMatrix = function(matrix, target) {
    let m = matrix.length
    let n = matrix[0].length
    let left = 0
    let right = m * n - 1
    while (left <= right){
        let mid = (left + right) >> 1
        let row = parseInt((mid) / n)
        let column = mid - row * n
        let temp = matrix[row][column]
        if(temp == target) return true
        else if(temp > target) right = mid - 1
        else if(temp < target) left = mid + 1
    }
    return false
};

console.log(searchMatrix([
    [1,3,5,7],
    [10,11,16,20],
    [23,30,34,60]
], 3))

console.log(searchMatrix([
    [1,3,5,7],
    [10,11,16,20],
    [23,30,34,60]
], 32))