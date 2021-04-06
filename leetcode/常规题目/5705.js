/*
 * @Author: xiaohuolong
 * @Date: 2021-04-04 13:39:52
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-04-04 13:50:04
 * @FilePath: /js-demo/leetcode/常规题目/5705.js
 */
/**
 * @param {string} coordinates
 * @return {boolean}
5705. 判断国际象棋棋盘中一个格子的颜色
    给你一个坐标 coordinates ，它是一个字符串，表示国际象棋棋盘中一个格子的坐标。下图是国际象棋棋盘示意图。
    如果所给格子的颜色是白色，请你返回 true，如果是黑色，请返回 false 。
    给定坐标一定代表国际象棋棋盘上一个存在的格子。坐标第一个字符是字母，第二个字符是数字。
示例 1：
    输入：coordinates = "a1"
    输出：false
    解释：如上图棋盘所示，"a1" 坐标的格子是黑色的，所以返回 false 。
示例 2：
    输入：coordinates = "h3"
    输出：true
    解释：如上图棋盘所示，"h3" 坐标的格子是白色的，所以返回 true 。
示例 3：
    输入：coordinates = "c7"
    输出：false
提示：
    coordinates.length == 2
    'a' <= coordinates[0] <= 'h'
    '1' <= coordinates[1] <= '8'
 */
var squareIsWhite = function(coordinates) {
    let a = coordinates[0].charCodeAt() - 'a'.charCodeAt()
    let b = coordinates[1]
    // console.log(a & 1, b & 1)
    return (a & 1) ? !!(b & 1) :!(b & 1)
};

console.log(squareIsWhite('a1'))
console.log(squareIsWhite('a2'))
console.log(squareIsWhite('b1'))
console.log(squareIsWhite('b2'))
console.log(squareIsWhite('c1'))
console.log(squareIsWhite('c2'))
console.log(squareIsWhite('d1'))
console.log(squareIsWhite('d2'))