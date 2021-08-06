/*
 * @Author: xiaohuolong
 * @Date: 2021-08-01 00:40:51
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-08-01 00:41:35
 * @FilePath: /js-demo/leetcode/常规题目/1337.js
 */
/*
1337. 矩阵中战斗力最弱的 K 行
    给你一个大小为 m * n 的矩阵 mat，矩阵由若干军人和平民组成，分别用 1 和 0 表示。
    请你返回矩阵中战斗力最弱的 k 行的索引，按从最弱到最强排序。
    如果第 i 行的军人数量少于第 j 行，或者两行军人数量相同但 i 小于 j，那么我们认为第 i 行的战斗力比第 j 行弱。
    军人 总是 排在一行中的靠前位置，也就是说 1 总是出现在 0 之前。
示例 1：
输入：mat = 
[[1,1,0,0,0],
 [1,1,1,1,0],
 [1,0,0,0,0],
 [1,1,0,0,0],
 [1,1,1,1,1]], 
k = 3
输出：[2,0,3]
解释：
每行中的军人数目：
行 0 -> 2 
行 1 -> 4 
行 2 -> 1 
行 3 -> 2 
行 4 -> 5 
从最弱到最强对这些行排序后得到 [2,0,3,1,4]
示例 2：
输入：mat = 
[[1,0,0,0],
 [1,1,1,1],
 [1,0,0,0],
 [1,0,0,0]], 
k = 2
输出：[0,2]
解释： 
每行中的军人数目：
行 0 -> 1 
行 1 -> 4 
行 2 -> 1 
行 3 -> 1 
从最弱到最强对这些行排序后得到 [0,2,3,1]
提示：
    m == mat.length
    n == mat[i].length
    2 <= n, m <= 100
    1 <= k <= m
    matrix[i][j] 不是 0 就是 1
*/
/**
 * @param {number[][]} mat
 * @param {number} k
 * @return {number[]}
 */
var kWeakestRows = function(mat, k) {
    let res = []
    mat.forEach((list, i) => {
        let j = search(list, 0)
        res.push([i, j])
    })
    res.sort((a, b) => a[1] - b[1])
    return res.slice(0, k).map(a => a[0])
};
/**
 * @param {number[][]} arr
 * @param {number} k
 * @return {number}
 */
var search = function(arr, target){
    let n = arr.length
    let l = 0
    let r = n
    while(l < r){
        let m = l + Math.floor((r - l) / 2)
        if(arr[m] === target) r = m
        else l = m + 1
    }
    return arr[l] !== target ? n : l
}