/*
 * @Author: xiaohuolong
 * @Date: 2021-04-13 08:56:36
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-04-13 09:05:34
 * @FilePath: /js-demo/leetcode/常规题目/118.js
 */
/**
 * @param {number} numRows
 * @return {number[][]}
118. 杨辉三角
    给定一个非负整数 numRows，生成杨辉三角的前 numRows 行。
    在杨辉三角中，每个数是它左上方和右上方的数的和。
示例:
输入: 5
输出:
[
    [1],
    [1,1],
    [1,2,1],
    [1,3,3,1],
    [1,4,6,4,1]
]
 */
var generate = function(numRows) {
    let res = []
    for (let i = 0; i < numRows; i++) {
        let result = new Array(i + 1).fill(1)
        for (let j = 1; j < result.length - 1; j++) {
            result[j] = res[i - 1][j - 1] + res[i - 1][j]
        }
        res.push(result)
    }
    return res
};

console.log(generate(5))