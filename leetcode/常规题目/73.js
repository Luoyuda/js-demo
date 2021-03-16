/*
 * @Author: xiaohuolong
 * @Date: 2021-02-18 11:22:06
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-02-18 11:49:17
 * @FilePath: /js-demo/leetcode/73.js
 */
/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
    给定一个 m x n 的矩阵，如果一个元素为 0，则将其所在行和列的所有元素都设为 0。请使用原地算法。
    示例 1:
    输入: 
    [
      [1,1,1],
      [1,0,1],
      [1,1,1]
    ]
    输出: 
    [
      [1,0,1],
      [0,0,0],
      [1,0,1]
    ]
    示例 2:
    输入: 
    [
      [0,1,2,0],
      [3,4,5,2],
      [1,3,1,5]
    ]
    输出: 
    [
      [0,0,0,0],
      [0,4,5,0],
      [0,3,1,0]
    ]
 */
var setZeroes = function(matrix) {
    let n = matrix.length
    if(!n) return matrix
    let m = matrix[0].length
    if(!m) return matrix
    let res = []
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < m; j++) {
            const element = matrix[i][j];
            if(element == 0){
                res.push([i, j])
            }
        }
    }
    while(res.length){
        const [x, y] = res.pop()
        for (let i = 0; i < n; i++) {
            matrix[i][y] = 0
        }
        for (let i = 0; i < m; i++) {
            matrix[x][i] = 0
        }
    }
    return matrix
};
var setZeroes = function(matrix) {
    for(let i=0;i<matrix.length;i++){
        for(let j=0;j<matrix[0].length;j++){
            if(matrix[i][j] === 0){
                // 对行进行操作
                for(let k=0;k<matrix.length;k++)
                    if(!(matrix[k][j] === 0) && k!==i) matrix[k][j] = '0'
                // 对列进行操作
                for(let k=0;k<matrix[0].length;k++)
                    if(!(matrix[i][k] === 0) && k!==j) matrix[i][k] = '0'
            }
        }
    }
    for(let i=0;i<matrix.length;i++){
        for(let j=0;j<matrix[0].length;j++){
            matrix[i][j] = parseInt(matrix[i][j])
        }
    }
    return matrix
};

console.log(
    setZeroes([
      [1,1,1],
      [1,0,1],
      [1,1,1]
    ])
)
console.log(
    setZeroes([
      [0,1,2,0],
      [3,4,5,2],
      [1,3,1,5]
    ])
)