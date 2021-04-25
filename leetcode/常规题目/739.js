/*
 * @Author: xiaohuolong
 * @Date: 2021-02-23 16:44:41
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-04-22 12:58:08
 * @FilePath: /js-demo/leetcode/常规题目/739.js
 */
/**
 * @param {number[]} T
 * @return {number[]}
    739. 每日温度
        请根据每日 气温 列表，重新生成一个列表。对应位置的输出为：要想观测到更高的气温，
        至少需要等待的天数。如果气温在这之后都不会升高，请在该位置用 0 来代替。
    例如，
        给定一个列表 temperatures = [73, 74, 75, 71, 69, 72, 76, 73]
        你的输出应该是 [1, 1, 4, 2, 1, 1, 0, 0]。
    提示：
        气温 列表长度的范围是 [1, 30000]。
        每个气温的值的均为华氏度，都是在 [30, 100] 范围内的整数。
    */
var dailyTemperatures = function(T) {
    let stack = []
    let res = new Array(T.length).fill(0)
    for (let i = 0; i < T.length; i++) {
        while (stack.length && T[i] > T[stack[stack.length - 1]]){
            let idx = stack.pop()
            res[idx] = i - idx
        }
        stack.push(i)
    }
    return res
};

console.log(dailyTemperatures([73, 74, 75, 71, 69, 72, 76, 73]))