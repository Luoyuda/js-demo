/*
 * @Author: xiaohuolong
 * @Date: 2020-07-02 21:24:30
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-04-28 18:31:37
 * @FilePath: /js-demo/leetcode/常规题目/378.js
 */ 
/* 
378. 有序矩阵中第 K 小的元素
    给你一个 n x n 矩阵 matrix ，其中每行和每列元素均按升序排序，找到矩阵中第 k 小的元素。
    请注意，它是 排序后 的第 k 小元素，而不是第 k 个 不同 的元素。
示例 1：
    输入：matrix = [[1,5,9],[10,11,13],[12,13,15]], k = 8
    输出：13
    解释：矩阵中的元素为 [1,5,9,10,11,12,13,13,15]，第 8 小元素是 13
示例 2：
    输入：matrix = [[-5]], k = 1
    输出：-5
提示：
    n == matrix.length
    n == matrix[i].length
    1 <= n <= 300
    -109 <= matrix[i][j] <= 109
    题目数据 保证 matrix 中的所有行和列都按 非递减顺序 排列
    1 <= k <= n2
*/
var kthSmallest = function(matrix, k) {
    var len = matrix.length
    if(!len) return 0
    var left = matrix[0][0]
    var right = matrix[len-1][len-1]
    while(left < right){
        var mid = left + Math.floor((right-left)/2)
        console.log(`left = ${left} mid = ${mid} right = ${right}`)
        if(check(matrix, mid, k, len)){
            right = mid
        }else{
            left = mid + 1
        }
    }
    return left
};

var check = function(matrix, mid, k, len){
    let i = len - 1
    let j = 0
    let num = 0
    while(i >= 0 && j < len){
        console.log(`matrix[i][j] = ${matrix[i][j]} mid = ${mid}`)
        if(matrix[i][j] <= mid){
            num += i + 1
            j++
        }else{
            i--
        }
        console.log(` num = ${num}`)
    }
    return num >= k
}

matrix = [
    [1,5,9],
    [10,11,13],
    [12,13,15]
]
k = 8

console.log(kthSmallest(matrix, k))