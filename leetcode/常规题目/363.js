/*
 * @Author: xiaohuolong
 * @Date: 2021-04-22 08:15:58
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-04-22 08:25:26
 * @FilePath: /js-demo/leetcode/常规题目/363.js
 */
/*
363. 矩形区域不超过 K 的最大数值和
    给你一个 m x n 的矩阵 matrix 和一个整数 k ，找出并返回矩阵内部矩形区域的不超过 k 的最大数值和。
示例 1：
    输入：matrix = [[1,0,1],[0,-2,3]], k = 2
    输出：2
    解释：蓝色边框圈出来的矩形区域 [[0, 1], [-2, 3]] 的数值和是 2，且 2 是不超过 k 的最大数字（k = 2）。
示例 2：
    输入：matrix = [[2,2,-1]], k = 3
    输出：3
提示：
    m == matrix.length
    n == matrix[i].length
    1 <= m, n <= 100
    -100 <= matrix[i][j] <= 100
    -105 <= k <= 105
*/
/**
 * @param {number[][]} matrix
 * @param {number} k
 * @return {number}
 */
var maxSumSubmatrix = function(matrix, max) {
    let row = matrix.length // 行
    let column = matrix[0].length // 列
    let b = Array.from({length: column}, () => 0) // 存储每列之和
    let res = -Number.MAX_VALUE
    for(let i=0;i<row;i++) { // 遍历开始行
        for(let t=0;t<b.length;t++) b[t] = 0 // 开始行改变之后需要把每列之和置零
        for(let j=i;j<row;j++) {
            for(let k=0;k<column;k++) b[k] += matrix[j][k]
            // 把所有可能遍历出来
            for(let m=0;m<b.length;m++) {
                let sum = 0
                for(let n=m;n<b.length;n++){
                    sum += b[n]
                    if(sum <= max && sum > res) { // 只有小于max，且大于之前的值
                        res = sum
                    }
                }
            }
        }
    }
    return res
};

console.log(maxSumSubmatrix([
    [1,0,1],
    [0,-2,3]
], 2))