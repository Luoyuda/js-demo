/*
 * @Author: xiaohuolong
 * @Date: 2021-02-23 18:38:18
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-02-23 18:47:24
 * @FilePath: /js-demo/leetcode/1052.js
 */
/**
 * @param {number[]} customers
 * @param {number[]} grumpy
 * @param {number} X
 * @return {number}
    1052. 爱生气的书店老板
        今天，书店老板有一家店打算试营业 customers.length 分钟。
        每分钟都有一些顾客（customers[i]）会进入书店，所有这些顾客都会在那一分钟结束后离开。
        在某些时候，书店老板会生气。 如果书店老板在第 i 分钟生气，
        那么 grumpy[i] = 1，否则 grumpy[i] = 0。
        当书店老板生气时，那一分钟的顾客就会不满意，不生气则他们是满意的。
        书店老板知道一个秘密技巧，能抑制自己的情绪，可以让自己连续 X 分钟不生气，但却只能使用一次。
        请你返回这一天营业下来，最多有多少客户能够感到满意的数量。
    示例：
        输入：customers = [1,0,1,2,1,1,7,5], grumpy = [0,1,0,1,0,1,0,1], X = 3
        输出：16
    解释：
        书店老板在最后 3 分钟保持冷静。
        感到满意的最大客户数量 = 1 + 1 + 1 + 1 + 7 + 5 = 16.
    提示：
        1 <= X <= customers.length == grumpy.length <= 20000
        0 <= customers[i] <= 1000
        0 <= grumpy[i] <= 1
 */
var maxSatisfied = function(customers, grumpy, X) {
    let total = 0
    let n = customers.length
    // 计算出如果不使用技能的情况下的客人数量
    for (let i = 0; i < n; i++) {
        if(grumpy[i] == 0){
            total += customers[i]
        }
    }
    // console.log(total)
    let incr = 0;
    // 计算出前面三个
    for (let i = 0; i < X; i++) {
        incr += customers[i] * grumpy[i];
    }
    let max = incr;
    for (let i = X; i < n; i++) {
        // 滑动
        incr = incr - (customers[i - X] * grumpy[i - X]) + (customers[i] * grumpy[i])
        max = Math.max(max, incr)
    }
    // console.log(max)
    return total + max
};

console.log(maxSatisfied([1,0,1,2,1,1,7,5], [0,1,0,1,0,1,0,1], 3))