/*
 * @Author: xiaohuolong
 * @Date: 2021-05-19 20:26:01
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-05-19 20:26:04
 * @FilePath: /js-demo/leetcode/常规题目/223.js
 */
/*
223. 矩形面积
    给你 二维 平面上两个 由直线构成的 矩形，请你计算并返回两个矩形覆盖的总面积。
    每个矩形由其 左下 顶点和 右上 顶点坐标表示：
    第一个矩形由其左下顶点 (ax1, ay1) 和右上顶点 (ax2, ay2) 定义。
    第二个矩形由其左下顶点 (bx1, by1) 和右上顶点 (bx2, by2) 定义。
示例 1：
    输入：ax1 = -3, ay1 = 0, ax2 = 3, ay2 = 4, bx1 = 0, by1 = -1, bx2 = 9, by2 = 2
    输出：45
示例 2：
    输入：ax1 = -2, ay1 = -2, ax2 = 2, ay2 = 2, bx1 = -2, by1 = -2, bx2 = 2, by2 = 2
    输出：16
提示：
    -104 <= ax1, ay1, ax2, ay2, bx1, by1, bx2, by2 <= 104
*/
/**
 * @param {number} ax1
 * @param {number} ay1
 * @param {number} ax2
 * @param {number} ay2
 * @param {number} bx1
 * @param {number} by1
 * @param {number} bx2
 * @param {number} by2
 * @return {number}
 */
var computeArea = function(ax1, ay1, ax2, ay2, bx1, by1, bx2, by2) {
    let x = Math.max(0, Math.min(bx2, ax2) - Math.max(ax1, bx1))
    let y = Math.max(0, Math.min(ay2, by2) - Math.max(ay1, by1))
    return ((ax2 - ax1) * (ay2 - ay1) + (bx2 - bx1) * (by2 - by1)) - (x * y)
};