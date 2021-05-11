/*
 * @Author: xiaohuolong
 * @Date: 2021-05-08 08:11:20
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-05-08 08:35:56
 * @FilePath: /js-demo/leetcode/常规题目/498.js
 */
/* 
498. 对角线遍历
    给定一个含有 M x N 个元素的矩阵（M 行，N 列），
    请以对角线遍历的顺序返回这个矩阵中的所有元素，对角线遍历如下图所示。
示例:
输入:
    [
        [ 1, 2, 3 ],
        [ 4, 5, 6 ],
        [ 7, 8, 9 ]
    ]
输出:  [1,2,4,7,5,3,6,8,9]
说明:
    给定矩阵中的元素总数不会超过 100000 。
*/
/**
 * @param {number[][]} mat
 * @return {number[]}
 */
var findDiagonalOrder = function(mat) {
    let n = mat.length
    if(!n) return []
    let m = mat[0].length
    if(!m) return []
    let row = 0
    let column = 0
    let direction = true
    let result = new Array(n * m)
    let r = 0
    while(row < n && column < m){
        result[r++] = mat[row][column]
        let newRow = row + (direction ? -1 : 1)
        let newColumn = column + (direction ? 1 : -1)
        if(newRow < 0 || newRow == n || newColumn < 0 || newColumn == m){
            if(direction){
                row += (column == m - 1 ? 1 : 0)
                column += (column < m - 1 ? 1 : 0)
            }else{
                column += (row == n - 1 ? 1 : 0)
                row += (row < n - 1 ? 1 : 0)
            }
            direction = !direction
        }else{
            row = newRow
            column = newColumn
        }
    }
    return result
};

console.log(findDiagonalOrder([
    [ 1, 2, 3 ],
    [ 4, 5, 6 ],
    [ 7, 8, 9 ]
]))