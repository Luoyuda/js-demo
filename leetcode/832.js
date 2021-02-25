/*
 * @Author: xiaohuolong
 * @Date: 2021-02-24 07:59:35
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-02-24 08:14:13
 * @FilePath: /js-demo/leetcode/832.js
 */
/**
 * @param {number[][]} A
 * @return {number[][]}
    832. 翻转图像
        给定一个二进制矩阵 A，我们想先水平翻转图像，然后反转图像并返回结果。
        水平翻转图片就是将图片的每一行都进行翻转，即逆序。例如，水平翻转 [1, 1, 0] 的结果是 [0, 1, 1]。
        反转图片的意思是图片中的 0 全部被 1 替换， 1 全部被 0 替换。例如，反转 [0, 1, 1] 的结果是 [1, 0, 0]。
    示例 1:
        输入: [
            [1,1,0],
            [1,0,1],
            [0,0,0]
        ]
        输出: [
            [1,0,0],
            [0,1,0],
            [1,1,1]
        ]
        解释: 
        首先翻转每一行: [
            [0,1,1],
            [1,0,1],
            [0,0,0]
        ]；
        然后反转图片: [
            [1,0,0],
            [0,1,0],
            [1,1,1]
        ]
    示例 2:
        输入: [[1,1,0,0],[1,0,0,1],[0,1,1,1],[1,0,1,0]]
        输出: [[1,1,0,0],[0,1,1,0],[0,0,0,1],[1,0,1,0]]
        解释: 首先翻转每一行: [[0,0,1,1],[1,0,0,1],[1,1,1,0],[0,1,0,1]]；
            然后反转图片: [[1,1,0,0],[0,1,1,0],[0,0,0,1],[1,0,1,0]]
    说明:
        1 <= A.length = A[0].length <= 20
        0 <= A[i][j] <= 1
    */
var flipAndInvertImage = function(A) {
    let n = A.length
    let m = A[0].length
    for (let i = 0; i < n; i++) {
        let left = 0
        let right = m - 1
        while(left < right){
            if (A[i][left] === A[i][right]) {
                A[i][left] ^= 1;
                A[i][right] ^= 1;
            }
            left++
            right--
        }
        if(left == right){
            A[i][left] ^= 1;
        }
    }
    return A
};

console.log(flipAndInvertImage([
    [1,1,0],
    [1,0,1],
    [0,0,0]
]))
console.log(flipAndInvertImage([[1,1,0,0],[1,0,0,1],[0,1,1,1],[1,0,1,0]]))