/*
 * @Author: xiaohuolong
 * @Date: 2021-04-27 14:21:59
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-04-27 14:51:55
 * @FilePath: /js-demo/leetcode/常规题目/240.js
 */
/*
搜索二维矩阵 II
    编写一个高效的算法来搜索 m x n 矩阵 matrix 中的一个目标值 target 。该矩阵具有以下特性：
    每行的元素从左到右升序排列。
    每列的元素从上到下升序排列。
示例 1：
    输入：matrix = [[1,4,7,11,15],[2,5,8,12,19],[3,6,9,16,22],[10,13,14,17,24],[18,21,23,26,30]], target = 5
    输出：true
示例 2：
    输入：matrix = [[1,4,7,11,15],[2,5,8,12,19],[3,6,9,16,22],[10,13,14,17,24],[18,21,23,26,30]], target = 20
    输出：false
提示：
    m == matrix.length
    n == matrix[i].length
    1 <= n, m <= 300
    -109 <= matix[i][j] <= 109
    每行的所有元素从左到右升序排列
    每列的所有元素从上到下升序排列
    -109 <= target <= 109
*/
/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
var searchMatrix = function(matrix, target) {
    let m = matrix.length
    let n = matrix[0].length
    let row = m - 1
    let col = 0
    while (row >= 0 && col < n) {
        if(matrix[row][col] == target) return true
        else if(matrix[row][col] > target){
            row--
        }else if(matrix[row][col] < target){
            col++
        }
    }
    return false
};
console.log(searchMatrix([
    [1,4,7,11,15],
    [2,5,8,12,19],
    [3,6,9,16,22],
    [10,13,14,17,24],
    [18,21,23,26,30]
],5))