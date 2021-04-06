/*
 * @Author: xiaohuolong
 * @Date: 2021-04-03 23:02:38
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-04-04 00:04:13
 * @FilePath: /js-demo/leetcode/常规题目/1572.js
 */
/**
 * @param {number[][]} mat
 * @return {number}
1572. 矩阵对角线元素的和
    给你一个正方形矩阵 mat，请你返回矩阵对角线元素的和。
    请你返回在矩阵主对角线上的元素和副对角线上且不在主对角线上元素的和。
示例  1：
    输入：mat = [
        [1,2,3],
        [4,5,6],
        [7,8,9]
    ]
    输出：25
    解释：对角线的和为：1 + 5 + 9 + 3 + 7 = 25
    请注意，元素 mat[1][1] = 5 只会被计算一次。
示例  2：
    输入：mat = [
        [1,1,1,1],
        [1,1,1,1],
        [1,1,1,1],
        [1,1,1,1]
    ]
    输出：8
示例 3：
    输入：mat = [[5]]
    输出：5
 */
var diagonalSum = function(mat) {
    let m = mat.length
    let n = mat[0].length
    let mMid = m >> 1
    let sum = 0
    let j = 0
    for (let i = 0; i <= mMid; i++) {
        let z = n - j - 1
        let y = m - i - 1
        // console.log(j, z)
        // console.log(`(${i}, ${j}) (${i},${z})`)
        // console.log(`(${y}, ${j}) (${y},${z})`)
        // console.log(`y = ${y} i = ${i}`)
        // console.log(mat[i][j], mat[i][z])
        if(y < i) break
        if(z == j) sum += mat[i][j]
        else sum += mat[i][j] + mat[i][z]
        if(y != i && y > i){
            // console.log(mat[y][j], mat[y][z])
            sum += mat[y][j] + mat[y][z]
        }
        j++
        // sum = sum + mat[i][j] + mat[i][n-j-1]
        // sum = sum + mat[i][j] + mat[i][n-j-1]
    }
    return sum
};

console.log(diagonalSum([
    [1,1,1,1],
    [1,1,1,1],
    [1,1,1,1],
    [1,1,1,1]
]))
console.log(diagonalSum([
    [5]
]))
console.log(diagonalSum([
    [1,2,3],
    [4,5,6],
    [7,8,9]
]))