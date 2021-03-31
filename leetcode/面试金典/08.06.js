/*
 * @Author: xiaohuolong
 * @Date: 2021-03-29 23:15:05
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-03-29 23:25:23
 * @FilePath: /js-demo/leetcode/面试金典/08.06.js
 */
/**
 * @param {number[]} A
 * @param {number[]} B
 * @param {number[]} C
 * @return {void} Do not return anything, modify C in-place instead.
面试题 08.06. 汉诺塔问题
在经典汉诺塔问题中，有 3 根柱子及 N 个不同大小的穿孔圆盘，
盘子可以滑入任意一根柱子。一开始，所有盘子自上而下按升序依次套在第一根柱子上(即每一个盘子只能放在更大的盘子上面)。
移动圆盘时受到以下限制:
(1) 每次只能移动一个盘子;
(2) 盘子只能从柱子顶端滑出移到下一根柱子;
(3) 盘子只能叠在比它大的盘子上。
示例1:
    输入：A = [2, 1, 0], B = [], C = []
    输出：C = [2, 1, 0]
示例2:
    输入：A = [1, 0], B = [], C = []
    输出：C = [1, 0]
提示:
    A中盘子的数目不大于14个。
 */
var hanota = function(A, B, C) {
    move(A.length, A, B, C)
    return C
};
var move = function(n, A, B, C) {
    if(n === 1){
        C.push(A.pop())
        return
    }
    move(n-1, A, C, B)
    C.push(A.pop())
    move(n-1, B, A, C)
}

console.log(hanota([2, 1, 0], [], []))
console.log(hanota([ 1, 0], [], []))