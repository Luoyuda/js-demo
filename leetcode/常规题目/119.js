/*
 * @Author: xiaohuolong
 * @Date: 2021-05-03 14:52:38
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-05-05 12:05:59
 * @FilePath: /js-demo/leetcode/常规题目/119.js
 */
/*
119. 杨辉三角 II
    给定一个非负索引 k，其中 k ≤ 33，返回杨辉三角的第 k 行。
    在杨辉三角中，每个数是它左上方和右上方的数的和。
示例:
    输入: 3
    输出: [1,3,3,1]
进阶：
    你可以优化你的算法到 O(k) 空间复杂度吗？
*/
/**
 * @param {number} rowIndex
 * @return {number[]}
 */

var getRow = function(rowIndex) {
    let getRows = (row, res) => {
        if(row > rowIndex) return res
        let rows = new Array(row + 1).fill(1)
        for (let i = 1; i < row; i++) {
            rows[i] = res[i - 1] + res[i]
        }
        res = rows
        return getRows(row + 1, res)
    }
    return getRows(0, [])
}

var getRow = function(rowIndex) {
    const row = new Array(rowIndex + 1).fill(0);
    row[0] = 1;
    for (let i = 1; i <= rowIndex; ++i) {
        row[i] = row[i - 1] * (rowIndex - i + 1) / i;
    }
    return row;
};

console.log(getRow(3))