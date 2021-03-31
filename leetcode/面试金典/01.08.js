/*
 * @Author: xiaohuolong
 * @Date: 2021-03-31 22:40:55
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-03-31 22:49:44
 * @FilePath: /js-demo/leetcode/面试金典/01.08.js
 */
/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
面试题 01.08. 零矩阵
    编写一种算法，若M × N矩阵中某个元素为0，则将其所在的行与列清零。
示例 1：
输入：
    [
        [1,1,1],
        [1,0,1],
        [1,1,1]
    ]
输出：
    [
        [1,0,1],
        [0,0,0],
        [1,0,1]
    ]
示例 2：
输入：
    [
        [0,1,2,0],
        [3,4,5,2],
        [1,3,1,5]
    ]
输出：
    [
        [0,0,0,0],
        [0,4,5,0],
        [0,3,1,0]
    ]
 */
var setZeroes = function(matrix) {
    if(matrix.length == 0 || matrix[0].length == 0) return
    let m = matrix.length
    let n = matrix[0].length
    for(let i=0;i<m;i++){
        for(let j=0;j<n;j++){
            if(matrix[i][j] === 0){
                // 对行进行操作
                for(let k=0;k<m;k++)
                    if(!(matrix[k][j] === 0) && k!==i) matrix[k][j] = '0'
                // 对列进行操作
                for(let k=0;k<n;k++)
                    if(!(matrix[i][k] === 0) && k!==j) matrix[i][k] = '0'
            }
        }
    }
    for(let i=0;i<m;i++){
        for(let j=0;j<n;j++){
            matrix[i][j] = parseInt(matrix[i][j])
        }
    }
    return matrix
};

console.log(setZeroes([
    [0,1,2,0],
    [3,4,5,2],
    [1,3,1,5]
]))