/*
 * @Author: xiaohuolong
 * @Date: 2021-04-03 17:02:49
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-04-03 17:06:06
 * @FilePath: /js-demo/leetcode/常规题目/1281.js
 */
/**
 * @param {number} n
 * @return {number}
 * 1281. 整数的各位积和之差
    给你一个整数 n，请你帮忙计算并返回该整数「各位数字之积」与「各位数字之和」的差。
示例 1：
    输入：n = 234
    输出：15 
解释：
    各位数之积 = 2 * 3 * 4 = 24 
    各位数之和 = 2 + 3 + 4 = 9 
    结果 = 24 - 9 = 15
示例 2：
    输入：n = 4421
    输出：21
    解释： 
    各位数之积 = 4 * 4 * 2 * 1 = 32 
    各位数之和 = 4 + 4 + 2 + 1 = 11 
    结果 = 32 - 11 = 21
提示：
    1 <= n <= 10^5
 */
var subtractProductAndSum = function(n) {
    let multi = 1
    let sum = 0
    while (n){
        let num = n % 10
        multi *= num
        sum += num
        n = parseInt(n / 10)
    }
    return multi - sum
};

console.log(subtractProductAndSum(234))
console.log(subtractProductAndSum(4421))