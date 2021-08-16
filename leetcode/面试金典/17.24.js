/*
 * @Author: xiaohuolong
 * @Date: 2021-08-16 15:03:45
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-08-16 15:04:45
 * @FilePath: /js-demo/leetcode/面试金典/17.24.js
 */
/*
面试题 17.24. 最大子矩阵
    给定一个正整数、负整数和 0 组成的 N × M 矩阵，编写代码找出元素总和最大的子矩阵。
    返回一个数组 [r1, c1, r2, c2]，其中 r1, c1 分别代表子矩阵左上角的行号和列号，r2, c2 分别代表右下角的行号和列号。若有多个满足条件的子矩阵，返回任意一个均可。
    注意：本题相对书上原题稍作改动
示例：
    输入：
        [
            [-1,0],
            [0,-1]
        ]
    输出：[0,1,0,1]
    解释：输入中标粗的元素即为输出所表示的矩阵
说明：
    1 <= matrix.length, matrix[0].length <= 200
*/
/**
 * @param {number[][]} matrix
 * @return {number[]}
 */
var getMaxMatrix = function(matrix) {
    let m = matrix.length
    let n = matrix[0].length
    let preSum = new Array(m).fill(0).map(() => new Array(n).fill(0))
    for(let i = 0; i < n; i++){
        preSum[0][i] = matrix[0][i]
        for(let j = 1; j < m ;j++){
            preSum[j][i] = preSum[j - 1][i] + matrix[j][i]
        }
    }
    let res = new Array(4)
    let max = -Infinity
    for(let i = m - 1; i >= 0; i--){
        for(let j = 0; j <= i; j++){
            let begin = 0
            let temp = 0
            let sum = 0
            //开始最大子序和的dp求解
            for(let k = 0; k < n; k++){
                temp = preSum[i][k] - (j > 0 ? preSum[j - 1][k] : 0)
                if(sum > 0){
                    sum += temp
                }else{
                    sum = temp
                    begin = k
                }
                if(sum > max){
                    max = sum
                    res[0] = j
                    res[1] = begin
                    res[2] = i
                    res[3] = k
                }
            }
        }
    }
    return res
};