/*
 * @Author: xiaohuolong
 * @Date: 2021-04-26 09:00:23
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-04-26 09:05:11
 * @FilePath: /js-demo/leetcode/常规题目/201.js
 */
/*
201. 数字范围按位与
    给你两个整数 left 和 right ，表示区间 [left, right] ，
    返回此区间内所有数字 按位与 的结果（包含 left 、right 端点）。
示例 1：
    输入：left = 5, right = 7
    输出：4
示例 2：
    输入：left = 0, right = 0
    输出：0
示例 3：
    输入：left = 1, right = 2147483647
    输出：0
提示：
    0 <= left <= right <= 231 - 1
*/
/**
 * @param {number} left
 * @param {number} right
 * @return {number}
 */
var rangeBitwiseAnd = function(left, right) {
    let ans = 0
    while(left < right){
        left >>= 1
        right >>= 1
        ans++
    }
    return left << ans
};
console.log(rangeBitwiseAnd(5, 7))
console.log(rangeBitwiseAnd(1, 2147483647))